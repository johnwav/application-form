import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "./UploadArea.css";
import { setCoverImage } from "../../data/dataSlice";
import Box from "../Box/Box";
import CloseIcon from "../../assets/icons/CloseIcon";

const UploadArea = () => {
  const dispatch = useDispatch();
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
        dispatch(setCoverImage(cdnImageUrl));
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
        <div className="img-area box">
          <img
            style={{ objectFit: "cover", width: "100%", height: "320px" }}
            src={URL.createObjectURL(image)}
            alt="image"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "auto",
              padding: "26px",
              color: "var(--red)",
            }}
            onClick={() => setImage(null)}
          >
            <CloseIcon /> <strong>Delete & reupload</strong>
          </div>
        </div>
      ) : (
        <Box title={"Upload cover image"}>
          <div
            style={{
              paddingInline: "40px",
              paddingTop: "60px",
              paddingBottom: "56px",
            }}
          >
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
          </div>
        </Box>
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
