import React from 'react';
import ReactDOM from 'react-dom';
import '../src/client/styles/index.css';
import * as serviceWorker from './serviceWorker';

const App = () => {
    return (
        <div className="App">
            Hej
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
