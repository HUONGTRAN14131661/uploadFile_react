import React from "react";
import { useState } from "react"
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (e) => {
    console.log(e.target.files[0]);
      const a = setSelectedFile(e.target.files[0]);
      console.log('a', a);
      setIsFilePicked(true);
  }
  const handleSubmission = () => {
      const formData = new FormData()
    
      const path = selectedFile.file.name.substring(0, selectedFile.file.name.lastIndexOf('/'))
    formData.append('parent_folders', `/abc-backend${path}/`)
    formData.append('need_transcode', 'true')
    formData.append('name', 'upload')
    formData.append('shared_id', '2811270996997413898_441ff609-0a21-404d-af88-e72ccda60bcb')
    formData.append('upload', selectedFile)
    
      console.log(1)
      console.log(selectedFile)
      fetch(
        '<change your upload file url here>',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer <change your token here>` 
          },
          body:formData,
        }
      )
      .then((Response)=>Response.json())
      .then((result)=> {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="container">
      <div className="row-upload">
        <input className="custom-file-input" type="file" name="file" onChange = {changeHandler}/>
      </div>
     
      {isFilePicked ? (
        <div className="content-has">
        <p>FileName: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
        <p>
          lastModifiedDate:{' '}
          {selectedFile.lastModifiedDate.toLocaleDateString()}
        </p>
      </div>
      ) : (
        <p className="content-none">Select a file to show details</p>
      )
      }
      <div>
        <button className="btn-submit" onClick={handleSubmission}>Submit</button>
      </div>
  </div>
  );
}

export default App;
