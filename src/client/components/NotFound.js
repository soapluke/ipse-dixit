import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="content-container-l">
        <h2>404</h2>
        <p>There's nothing to see here. <Link to="/dashboard">Go home.</Link></p>
    </div>
);

export default NotFound;