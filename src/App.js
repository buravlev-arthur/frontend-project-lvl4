import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const handleClick = async (e) => {
    const data = await axios.post('/api/v1/login', { username: 'admin', password: 'admin' });
    console.log('handleClick: ');
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={handleClick}>Send request</button>
    </div>
  );
}

export default App;
