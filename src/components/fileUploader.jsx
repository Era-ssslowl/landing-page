import { useState } from "react";

export default function FileUploader() {
  const [status, setStatus] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Requesting upload URL...");

    // 1. Ask API for upload URL
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    const { url, uploadUrl } = await res.json();

    setStatus("Uploading to Vercel Blob...");

    // 2. Upload directly to Vercel Blob
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    setStatus("Upload complete!");
    setUploadedUrl(url);
  }

  return (
    <div className="mt-12 w-full max-w-lg mx-auto border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload a File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm mb-4 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:bg-black file:text-white 
                   file:cursor-pointer file:hover:bg-gray-800"
      />

      <p className="text-gray-600 text-sm text-center">{status}</p>

      {uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-800 font-medium">Uploaded File URL:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            className="text-blue-600 underline break-all"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
