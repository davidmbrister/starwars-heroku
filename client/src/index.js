import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  {CardProvider}  from './hooks/useCard';

ReactDOM.render(
  <CardProvider>
    <App />
  </CardProvider>,
  document.getElementById('root')
);


