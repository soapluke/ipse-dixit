import React from 'react';
import ReactDOM from 'react-dom';
import '../src/client/styles/index.css'
import App from '../client/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
