import React from 'react';

const ResultDisplay = ({ results }) => {
  return (
    <div>
      <h2>Results:</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultDisplay;
