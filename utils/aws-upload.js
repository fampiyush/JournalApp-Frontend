import { S3 } from 'aws-sdk'

const s3 = new S3({
    accessKeyId: process.env.EXPO_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.EXPO_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
})

export const uploadImage = async (uri, id, type, itemId) => {
    const blob = await uriToBlob(uri)
    let params;
    if(type == 'profilepicture'){
        params = {
            Bucket: process.env.EXPO_PUBLIC_S3_BUCKET_NAME,
            Key: `${id}/profilepicture.jpg`,
            Body: blob,
        }
    }else {
        params = {
            Bucket: process.env.EXPO_PUBLIC_S3_BUCKET_NAME,
            Key: `${id}/${itemId}.jpg`,
            Body: blob,
        }
    }

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}


const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest()
       xhr.onload = function () {
         // return the blob
         resolve(xhr.response)
       }
       xhr.onerror = function () {
         reject(new Error('uriToBlob failed'))
       }
       xhr.responseType = 'blob'
       xhr.open('GET', uri, true)
   
       xhr.send(null)})
}


