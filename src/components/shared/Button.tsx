import React from 'react';
import './Button.scss';

export interface ButtonProps {
    children?: React.ReactChild
}

export function Button({ children }: ButtonProps) {
    return (
        <button className="Button">{ children }</button>
    );
}