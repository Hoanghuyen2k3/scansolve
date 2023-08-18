import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [answer, setAnswer] = useState('');

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
      const response = await axios.post('http://localhost:3003/upload', formData);

      if (response.status === 200) {
        setExtractedText(response.data.extractedText);
      } else {
        alert('Error uploading and processing the PDF.');
      }
    } catch (error) {
      alert('An error occurred.');
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = async () => {
    if (!extractedText) {
      alert('Please upload and extract text from a PDF first.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/answer', {
        question: question,
        context: extractedText
      });

      console.log(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const [question, setQuestion] = useState('');

  return (
    <div>
      <button onClick={handleQuestionSubmit}>Submit</button>
      <div>
        <input type="text" value={question} onChange={handleQuestionChange} />
      </div>
      <div>
        <h2>Answer:</h2>
        <p>{answer}</p>
      </div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Extract Text</button>
      {extractedText && <div>{extractedText}</div>}
    </div>
  );
};

export default App;



