import React, { useState, useRef } from "react";
import "./styles/fileUpload.css";
import Button from "@mui/material/Button";
import UploadIcon from "../assets/file-upload.svg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";

function FileUpload() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

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
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}api/publications/files`,
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
      let result = await response.json();
      console.log(result);
      if ((result.error = "" || result.keys.length > 0)) {
        setToast({
          open: true,
          message: "Files uploaded successfully",
          severity: "success",
        });
      } else {
        setToast({
          open: true,
          message:
            "An error has occured with one or more of the files. Please try uploading all files again.",
          severity: "error",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper">
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
              <button
                className="upload-button sub-heading-file-upload"
                onClick={onButtonClick}
              >
                <div>
                  <img src={UploadIcon} alt="" width={90} height={75} />
                </div>
                <p>Drag and drop or browse to choose files</p>
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
        </form>
        <div className="filesWrapper">
          <div className="filesDiv">
            Files Uploaded:
            {files && (
              <div className="inputImage">
                {files.map((file) => (
                  <p>{file.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={toast.open}
          autoHideDuration={6000}
          key={"topcenter"}
        >
          <Alert
            onClose={() => {
              setToast({ open: false, message: "", severity: "" });
            }}
            severity={toast.severity}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
}

export default FileUpload;
