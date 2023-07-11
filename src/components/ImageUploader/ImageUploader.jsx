import styles from "./image_uploader.module.scss";import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ImageUploader = ({ fileToUpload, setFileToUpload }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    previewFile(fileToUpload);
  }, [fileToUpload]);

  function previewFile(selectedFile) {
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    reader.onload = (readerEvent) => {
      setAvatarPreview(readerEvent.target.result);
    };
  }

  return (
    <>
      <div>
        <label htmlFor="avatar">upload avatar (optional)</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={(e) => setFileToUpload(e.target.files[0])}
        />
      </div>
      {fileToUpload && (
        <div className={styles.image_container}>       
        <button className={styles.trash_button} onClick={() => {setFileToUpload(null); setAvatarPreview(null)}}>
        <FontAwesomeIcon
          icon={faTrashCan}        
         />
      </button><img
          src={avatarPreview}
          alt=""
        />
      </div>)}
    </>
  );
};

export default ImageUploader;
