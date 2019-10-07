import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../src/client/routers/AppRouter';
import '../src/client/styles/styles.scss';
import * as serviceWorker from './serviceWorker';

const App = () => {
    return (
        <AppRouter />
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
