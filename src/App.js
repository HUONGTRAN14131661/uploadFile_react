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
      formData.append('File', selectedFile)
      console.log(1)
      console.log(selectedFile)
      fetch(
        'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
