import React from 'react';
import './Button.scss';

export interface ButtonProps {
    children?: React.ReactChild
    link?: string,
}

export function Button({ children, link }: ButtonProps) {
    if (link) {
        return <a className="Button" href={link}>{ children }</a>;
    } else {
        return <button className="Button">{ children }</button>;
    }
}