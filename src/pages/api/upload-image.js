import busboy from "busboy";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";

export const config = {
    api: {
        bodyParser: false,
    },
};

const s3 = new S3Client({ region: process.env.IMAGE_REGION });

const uploadFile = (req, res) => {
    const bb = busboy({ headers: req.headers });

    bb.on("file", async (_, file, info) => {
        const fileName = info.filename;
        const mimeType = info.mimeType;

        // Create a readable stream from the file stream
        const fileStream = new Readable().wrap(file);

        // Get content type from request headers
        // const contentType = req.headers['content-type'];

        const fileKey = `${Math.random().toString(26).substring(2)}-${fileName}`;

        try {
            const paralleUploads = new Upload({
                client: s3,
                queueSize: 4,
                partSize: 1024 * 1024 * 5,
                leavePartsOnError: false,
                params: {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: fileKey,
                    Body: fileStream,
                    ContentType: mimeType,
                    ContentDisposition: "inline",
                },
            });

            await paralleUploads.done();

            const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.IMAGE_REGION}.amazonaws.com/${fileKey}`;

            res.status(200).json({ imageUrl: imageUrl });
        } catch (e) {
            console.error(e);
            res.status(500).send("Error uploading file");
        }
    });

    bb.on("error", (err) => {
        console.error("Error uploading file:", err);
        res.status(500).send("Error uploading file");
    });

    req.pipe(bb);
    return;
};

export default async function handler(req, res) {
    const method = req.method;

    switch (method) {
        case "POST":
            return uploadFile(req, res);
    }
}

