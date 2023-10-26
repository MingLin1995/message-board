// fileService.js

const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

module.exports = {
  // 上傳檔案到 AWS S3 存儲桶
  uploadFile: (image, callback) => {
    // 讀取上傳的檔案並上傳到 AWS S3
    fs.readFile(image.path, (err, data) => {
      if (err) {
        console.error("讀取上傳的檔案時出現錯誤: " + err);
        callback(err, null);
      } else {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: `${Date.now()}_${image.originalname}`,
          Body: data,
          ContentType: image.mimetype,
        };

        s3.upload(params, (err, s3Data) => {
          if (err) {
            console.error("將圖片上傳至 AWS S3 時出現錯誤: " + err);
            callback(err, null);
          } else {
            const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN; // 轉換CloudFront
            const s3Url = s3Data.Location;
            const modifiedS3Url = s3Url.replace(
              "minglin-aws-bucket.s3.ap-northeast-1.amazonaws.com", //有換區域就要更改，可以看s3圖片網址
              cloudFrontDomain
            );

            callback(null, modifiedS3Url);
          }
        });
      }
    });
  },
};
