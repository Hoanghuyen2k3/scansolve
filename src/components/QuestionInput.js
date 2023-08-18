import React, { useState } from 'react';

const QuestionInput = ({ onQuestionSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    onQuestionSubmit(question);
  };

  return (
    <div>
      <input type="text" value={question} onChange={handleQuestionChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionInput;
