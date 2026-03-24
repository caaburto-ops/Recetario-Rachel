import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';

try {
  console.log("Rendering App...");
  renderToString(<App />);
  console.log("Rendered successfully!");
} catch (e) {
  console.error("Error rendering App:", e);
}
