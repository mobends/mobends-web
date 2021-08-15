import React from 'react';
import classNames from 'classnames';
import { StylableProps } from '../commons';
import './Loader.scss';


export interface LoaderProps extends StylableProps {}

export function Loader({ className, style }: LoaderProps) {
    const delay = 0.06;

    return (
        <div className={classNames('Loader', className)} style={style}>
            <span className="Loader__dot" style={{ animationDelay: `${delay * 0}s` }}></span>
            <span className="Loader__dot" style={{ animationDelay: `${delay * 1}s` }}></span>
            <span className="Loader__dot" style={{ animationDelay: `${delay * 2}s` }}></span>
        </div>
    );
}