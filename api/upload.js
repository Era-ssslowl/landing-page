import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: false, // receive raw file stream
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const fileKey = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
        Body: buffer,
      })
    );

    res.status(200).json({
      success: true,
      fileKey,
    });
  } catch (error) {
    console.error("upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
