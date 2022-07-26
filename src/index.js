import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import init from './init';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const config = init();
root.render(<App config={config} />);
