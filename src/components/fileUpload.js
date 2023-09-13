import React, { useState, useRef } from "react";
import "./styles/fileUpload.css";
import Button from "@mui/material/Button";
import UploadIcon from "../assets/file-upload.svg";

function FileUpload() {
  const [files, setFiles] = useState(null);

  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files) {
      const files = e.dataTransfer.files;
      const fileListAsArray = Array.from(files);
      console.log(fileListAsArray, "Drop");
      setFiles(fileListAsArray);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files) {
      const files = e.target.files;
      const fileListAsArray = Array.from(files);
      console.log(fileListAsArray, "Change");
      setFiles(fileListAsArray);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleOnSubmit = async (e) => {
    let bibArr = [];
    e.preventDefault();
    if (files) {
      const fileListAsArray = Array.from(files).map(async (file) => {
        let reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsText(file);
        });
      });
      let res = await Promise.all(fileListAsArray);
      console.log(res);
      const response = await fetch(
        `http://localhost:5000/api/publications/files`,
        {
          method: "POST",
          body: JSON.stringify({
            bibs: res,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        console.log("Success");
      } else {
        console.log("Err");
      }
    }
  };

  return (
    <div>
      <form
        className="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={handleOnSubmit}
      >
        <input
          ref={inputRef}
          type="file"
          className="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label htmlFor="input-file-upload" className="label-file-upload">
          <div className="drag-area-wrapper">
            {/* <p className="heading-file-upload">Add Publications</p> */}
            {/* <p className="sub-heading-file-upload">Only accepts .bib Files</p> */}
            <button
              className="upload-button sub-heading-file-upload"
              onClick={onButtonClick}
            >
              <div>
                <img src={UploadIcon} alt="" width={90} height={75} />
              </div>
              <p>Drag and drop or browse to choose a file</p>
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            className="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        {files && (
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        )}
        <div className="imagesWrapper">
          <div className="imagesDiv">
            {files && (
              <div className="inputImage">
                {files.map((file) => (
                  <p>{file.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FileUpload;
