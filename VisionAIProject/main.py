import base64
import json
import os

from google.cloud import vision
from google.cloud import storage
import io

INPUT_BUCKET_NAME = 'receiptimages'
OUTPUT_BUCKET_NAME = 'receipttext'

'''os.environ['GOOGLE_APPLICATION_CREDENTIALS'] =\
    'D:/OneDrive - University of Florida/Documents/Github Repositories/' \
    'SwampHacks2020_SnapScan/VisionAIProject/SwampHacks2020-69e38361e428.json'
'''
vision_client = vision.ImageAnnotatorClient()
storage_client = storage.Client()


def get_receipt_data(file, context):
    bucket = file.get('bucket')
    name = file.get('name')

    response = vision_client.text_detection({
        'source': {'image_uri': f'gs://{bucket}/{name}'}
    })
    texts = response.text_annotations

    prices = []

    # Find all prices
    for text in texts:
        if text.description[:-3].isdigit() and text.description[-3] == '.' and text.description[-2:].isdigit():
            price = {'price': float(text.description),
                     'avg_x': (text.bounding_poly.vertices[0].x + text.bounding_poly.vertices[1].x) / 2,
                     'avg_y': (text.bounding_poly.vertices[0].y + text.bounding_poly.vertices[2].y) / 2,
                     'text_objects': [],
                     'final_text': ''}
            prices.append(price)

    # Store total price
    total_price = max(price['price'] for price in prices)

    # Find associated text for each price
    ignore_words = ['total', 'tax']
    to_remove = []
    for price in prices:
        for text in texts:
            if text.bounding_poly.vertices[1].x < price['avg_x'] and text.bounding_poly.vertices[0].y < price['avg_y'] < text.bounding_poly.vertices[2].y:
                price['text_objects'].append(text)
        price['text_objects'].sort(key=lambda txt: txt.bounding_poly.vertices[0].x)
        price['final_text'] = ' '.join(text.description for text in price['text_objects'])
        if any(word in price['final_text'].lower() for word in ignore_words) or price['price'] == total_price or price['price'] == 0:
            to_remove.append(price)

    # Remove irrelevant price data
    for price in to_remove:
        prices.remove(price)

    # Print Data
    print('-------------------------------')
    print('Data')
    print('-------------------------------')
    for price in prices:
        print(f'{price["final_text"]:<20} ${price["price"]:.2f}')
    print(f"\n{'Total Price:':<20} ${total_price}")
    print('-------------------------------')

    # Save Data to Output Bucket
    data = ''
    data += f'{len(prices)}\n'
    for price in prices:
        data += f'{price["final_text"]}\n'
        data += f'{price["price"]:.2f}\n'
    data += f'{total_price:.2f}\n'

    output_bucket = storage_client.get_bucket(OUTPUT_BUCKET_NAME)
    blob = output_bucket.blob(f'{name[:name.find(".")]}-data.txt')
    blob.upload_from_string(data)


'''
def detect_text(path):
    with io.open(path, 'rb') as img:
        content = img.read()

    img = vision.types.Image(content=content)

    response = vision_client.text_detection(image=img)
    texts = response.text_annotations

    prices = []

    # Find all prices
    for text in texts:
        if text.description[:-3].isdigit() and text.description[-3] == '.' and text.description[-2:].isdigit():
            price = {'price': float(text.description),
                     'avg_x': (text.bounding_poly.vertices[0].x + text.bounding_poly.vertices[1].x) / 2,
                     'avg_y': (text.bounding_poly.vertices[0].y + text.bounding_poly.vertices[2].y) / 2,
                     'text_objects': [],
                     'final_text': ''}
            prices.append(price)

    # Store total price
    total_price = max(price['price'] for price in prices)

    # Find associated text for each price
    ignore_words = ['total', 'tax']
    to_remove = []
    for price in prices:
        for text in texts:
            if text.bounding_poly.vertices[1].x < price['avg_x'] and text.bounding_poly.vertices[0].y < price['avg_y'] < text.bounding_poly.vertices[2].y:
                price['text_objects'].append(text)
        price['text_objects'].sort(key=lambda txt: txt.bounding_poly.vertices[0].x)
        price['final_text'] = ' '.join(text.description for text in price['text_objects'])
        if any(word in price['final_text'].lower() for word in ignore_words) or price['price'] == total_price or price['price'] == 0:
            to_remove.append(price)

    # Remove irrelevant price data
    for price in to_remove:
        prices.remove(price)

    # Print Data
    print('-------------------------------')
    print('Data')
    print('-------------------------------')
    for price in prices:
        print(f'{price["final_text"]:<20} ${price["price"]:.2f}')
    print(f"\n{'Total Price:':<20} ${total_price}")
    print('-------------------------------')

    # Save Data to Output Bucket
    data = ''
    data += f'{len(prices)}\n'
    for price in prices:
        data += f'{price["final_text"]}\n'
        data += f'{price["price"]:.2f}\n'
    data += f'{total_price:.2f}\n'

    print(data)

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


detect_text('imgs/publix-1.jpg')
'''