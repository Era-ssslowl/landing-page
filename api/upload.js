import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Disable body parsing so we can receive raw file stream
export const config = {
  api: {
    bodyParser: false,
  },
};

// S3 client (works in Vercel functions)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Collect file bytes from stream
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // Upload to S3
    const fileKey = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
        Body: fileBuffer,
      })
    );

    return res.status(200).json({
      success: true,
      fileKey,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
