import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    if (!file) {
      setStatus("Please choose a file first.");
      return;
    }

    setStatus("Uploading...");

    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: file, // raw data stream
      });

      const json = await result.json();

      if (json.success) {
        setStatus("Uploaded successfully!");
      } else {
        setStatus("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error uploading file.");
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-3 text-center">Upload a File</h2>

      <input
        type="file"
        onChange={handleChange}
        className="mb-4 block w-full text-sm file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 file:bg-black file:text-white 
                  file:hover:bg-gray-800 file:cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Upload
      </button>

      {status && (
        <p className="mt-3 text-center text-gray-600 text-sm">{status}</p>
      )}
    </div>
  );
}
