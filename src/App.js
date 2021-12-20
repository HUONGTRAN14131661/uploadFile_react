// import React from "react";
import { useState } from "react"
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import React from 'react';
import {useDropzone} from 'react-dropzone';
// import { useDropzone } from 'react-dropzone'

function App(props) {

  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
      <ul key={file.path}> <strong>Detail:</strong>
        <li>File name: {file.name}</li>
        <li>File path: {file.path}</li>
        <li>File type: {file.type}</li>
        <li>Size in bytes: {file.size}</li>
        <li>
          Last modified date:{' '}
          {file.lastModifiedDate.toLocaleDateString()}
        </li>
      </ul>
  ));
  console.log(1, getRootProps)
  console.log(2, getInputProps)
  console.log(3, open)
  console.log(4, acceptedFiles.map(file => ( file.name) ))

  const handleSubmission = () => {
      const formData = new FormData()
    
      const path = acceptedFiles.map(file => (
        file.name.substring(0,file.name.lastIndexOf('/'))
       
      ))
      console.log(path)

      // const path = selectedFile.file.name.substring(0, selectedFile.file.name.lastIndexOf('/'))
      formData.append('parent_folders', `/abc-backend${path}/`)
      formData.append('need_transcode', 'true')
      formData.append('name', 'upload')
      formData.append('shared_id', '2811270996997413898_441ff609-0a21-404d-af88-e72ccda60bcb')
      formData.append('upload', acceptedFiles)
    
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
      <div className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
        <aside>
          <div>{files}</div>
        </aside>
      </div>
 
      <div className="container-btn">
        <button className="btn-submit" onClick={handleSubmission}>Submit</button>
      </div>
  </div>
  );
}

export default App;
