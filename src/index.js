import React from 'react';
import ReactDOM from 'react-dom';
import Context from './supabase/context';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Context />
  </React.StrictMode>,
  document.getElementById('root')
);