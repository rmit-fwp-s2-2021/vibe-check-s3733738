import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import { initUsers } from './data/repository';
import { initPosts } from './data/posts';



ReactDOM.render(
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
