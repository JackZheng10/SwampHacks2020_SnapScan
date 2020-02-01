import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  take = async () => {
    console.log("trying taking picture");
    //Camera.takePictureAsync({
    //  quality: 1,
    //  base64: true,
    //}).then((uri)=>{console.log(uri)});
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          
        </View>
        <TouchableOpacity style={styles.takeButton} onPressout={()=>{console.log("test");}}>
            <Text>Take</Text>
          </TouchableOpacity>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  takeButton: {
    width: 100,
    alignSelf: "center",
    marginBottom: 20
  }
});
