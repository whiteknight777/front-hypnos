import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './main.scss';
import App from './app/App';
import 'antd/dist/antd.min.css';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(<App />);
