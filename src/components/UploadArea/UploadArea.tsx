import { ChangeEvent, useState } from "react";
import "./UploadArea.css";

const UploadArea = () => {
  const [image, setImage] = useState<File | null>();
  const [, setCdnUrl] = useState<string | null>(null);

  const selectFile = () => {
    const input = document.getElementById("input");
    if (input) {
      input.click();
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setImage(selectedFile);
    if (selectedFile) {
      try {
        // Simulate uploading the image to a CDN (replace with your CDN upload logic)
        const cdnResponse = await uploadImageToCDN(selectedFile);
        const cdnImageUrl = cdnResponse.url;

        // Set the CDN URL in state
        setCdnUrl(cdnImageUrl);

        console.log("Uploaded to CDN:", cdnImageUrl);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  // Render the uploaded image if available

  return (
    <>
      {image ? (
        <div className="img-area" style={{ position: "relative" }}>
          <img
            style={{ objectFit: "contain", width: "100%", height: "" }}
            src={URL.createObjectURL(image)}
            alt="image"
          />
          <div
            style={{ position: "absolute", top: "-45px", right: "0" }}
            onClick={() => setImage(null)}
          >
            Delete
          </div>
        </div>
      ) : (
        <div
          className="input-area"
          onClick={selectFile}
          style={{ borderRadius: "5px", border: "1px dashed #000" }}
        >
          <img src="/images/upload.png" alt="" />
          <span className="cta">Upload cover image</span>
          <span className="subtext">
            16:9 ratio is recommended. Max image size 1mb
          </span>
          <input
            type="file"
            accept="image/*"
            name=""
            id="input"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </div>
      )}
    </>
  );
};

// Simulate uploading to a CDN (replace with actual CDN upload logic)
const uploadImageToCDN = async (
  file: File
): Promise<{ file: File; url: string }> => {
  // Simulate an API request to your CDN endpoint
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  return { file: file, url: "https://example.com/cdn/image.jpg" }; // Replace with actual CDN URL
};

export default UploadArea;
