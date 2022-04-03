import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './main.scss';
import App from './app/App';
import 'antd/dist/antd.min.css';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(<App basename={PUBLIC_URL} />);
