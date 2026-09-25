import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// CSS is loaded by the bundler; TypeScript has no module declaration for it.
// @ts-expect-error -- intentional side-effect import of a stylesheet
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}