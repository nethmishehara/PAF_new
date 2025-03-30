// testing.js

import React, { useState } from 'react';

function Testing() {
  const [message, setMessage] = useState('Hello, welcome to React testing!');

  const changeMessage = () => {
    setMessage('Message has been changed!');
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={changeMessage}>Change Message button</button>
    </div>
  );
}

export default Testing;
