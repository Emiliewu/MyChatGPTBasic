import './App.css';
import React, {useState} from 'react';

// create a react component that inputs a textarea and fetch the result from port 8080 and display below
function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea name="querymessage" id="querymessage" cols="30" rows="10"
        value = {message}
        onChange = {(e) => setMessage(e.target.value)}
        >
        </textarea>
        <button type = "submit">Submmit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;
