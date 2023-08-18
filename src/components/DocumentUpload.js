import React, { useState } from 'react';
import axios from 'axios'; // Import the axios library

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3003/upload', formData); // Use axios for the POST request

      if (response.status === 200) {
        console.log(response);
        setExtractedText(response.data.extractedText);
      } else {
        alert('Error uploading and processing the PDF.');
      }
    } catch (error) {
    //   console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Extract Text</button>
      {extractedText && <div>{extractedText}</div>}
    </div>
  );
};

export default DocumentUpload;
