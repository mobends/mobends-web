import React from 'react';
import './Loader.scss';

export function Loader() {
    const delay = 0.06;

    return (
        <div className="Loader">
            <span className="Loader_dot" style={{ animationDelay: `${delay * 0}s` }}></span>
            <span className="Loader_dot" style={{ animationDelay: `${delay * 1}s` }}></span>
            <span className="Loader_dot" style={{ animationDelay: `${delay * 2}s` }}></span>
        </div>
    );
}