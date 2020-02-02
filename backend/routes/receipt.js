const stateToHTML =require('draft-js-export-html');
const convertFromRaw =  require( 'draft-js');
const express = require("express");
const router = express.Router();
const {PythonShell} = require('python-shell');
//User-defined (database) models
const blog = require("../models/blog.model");
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const base64ToImage = require('base64-to-image');
const waitUntil = require('async-wait-until')

router.post("/", (req, res) => {
    const content = req.body.body;

    var base64Str =req.body;
    let filename = "img"+Date.now();
    console.log(
        "initial filename is ",filename
    );
    fs.writeFile('C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\'+filename+".txt", base64Str.base64, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('base64 saved!');
    });

    // Creates a client

    const storage = new Storage();
    const bucket = storage.bucket('receipttext');


    async function uploadFile() {
        // Uploads a local file to the bucket
        await storage.bucket("receiptimages").upload('C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\'+filename+".txt", {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });
        console.log(
            "upload filename is ",filename
        );
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt
            destination: "C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\"+filename+ '-data.json',
        };

        async function checkExist() {
            const [files] = await storage.bucket("receipttext").getFiles();

            files.forEach(file => {
                if (file.name == filename + '-data.json'){
                    console.log('Found File: ' + file.name)
                    return true;
                }else{
                    console.log('Other File: ' + file.name)
                }
            });
            return false;
        }



        async function download(){
            console.log(
                "download filename is ",filename
            );
            //Download File
            await storage.bucket('receipttext').file(filename+ '-data.json').download(options);
            console.log(
                "download filename is ",filename
            );
            console.log('step3!');
            let obj = JSON.parse(fs.readFileSync('C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\'+filename+ '-data.json', 'utf8'));
            console.log(obj,"here");

            res.json({response: obj});
        }

        let delay = 15000;

        setTimeout(function() {
            download().catch((error) => {
                console.log('You good done fucked up: ', error);
            });
        }, delay);
    }
    uploadFile().catch(console.error);
    console.log("successUpload");

   /* var package_name = 'google-cloud';
    var package_name2 = 'google-cloud-storage';
    let options = {
        args : [package_name,package_name2]
    }
    PythonShell.run('C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\routes\\hello.py', options, function (err) {
        if (err) throw err;
        console.log('finished');
    });*/

        /*async function checkFileAndDownload(destination) {
            if(!fs.existsSync(destination)) {
                setTimeout(function () {
                    checkFile(destination)
                }, 2000);
            }
            else {
                await storage
                    .bucket("receipttext")
                    .file(filename+ '-data.json')
                    .download(options).catch(function(error){
                        console.log(2);
                    });
            }
        }*/

        /*async function downloadFile() {
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt
            destination: "C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\"+filename+ '-data.json',
        };

        // Downloads the filel
            let ifExist = await bucket.exists(function(err, exists) {});
            while(!ifExist) {
                ifExist =  await bucket.exists(function(err, exists) {});
            }
            await storage
                .bucket("receipttext")
                .file(filename+ '-data.json')
                .download(options).catch(function(error){
                    console.log(2);
                });
          /* while(!fs.existsSync(options.destination)) {
                setTimeout(()=>console.log(1),2000);
                await storage
                    .bucket("receipttext")
                    .file(filename+ '-data.json')
                    .download(options).catch(function(error){
                        console.log(2);
                    });
            }


        console.log(
            `gs:// downloaded .`
        );
        let obj = JSON.parse(fs.readFileSync('C:\\Users\\Heran\\Documents\\myBlog\\6d\\backend\\'+filename+ '-data.json', 'utf8'));
            console.log(obj);

            res.json({response: "ok"});

    }*/
    /*
   let ifSuccess = false;
        while(!ifSuccess) {
            setTimeout(()=>console.log("time"),3000);
            downloadFile().then(()=>ifSuccess=true).catch(function(error) {
                ifSuccess = false;
            })
        }*/
   /* async function wait() {
        let ifComplete = false;
        while(!ifComplete) {
            ifComplete = true;
            setTimeout(()=>console.log(ifComplete),2000);
            await downloadFile().catch(function (error) {
                ifComplete = false;
            });
        }

    }*/
    /*downloadFile().catch(function (error) {
        console.log(error);
    });*/

});

router.get("/view", (req, res) => {
    console.log("okay:)! ");
    blog.findOne({title:'final5'}, function (err, data) {
        if(err){
            console.log(err);
        }
        else {

            const result = data.body;
            console.log('transfer here?',typeof result,result);
            res.json(result);

        }
    })

});
module.exports = router;