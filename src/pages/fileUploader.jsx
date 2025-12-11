import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    if (!file) return;

    const response = await fetch("/api/upload", {
      method: "POST",
      body: file, // raw upload
    });

    const data = await response.json();
    console.log("Uploaded:", data);
  }

  return (
    <div className="p-6 bg-white border rounded-lg">
      <input
        type="file"
        onChange={handleFileChange}
        className="block mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Upload
      </button>
    </div>
  );
}
