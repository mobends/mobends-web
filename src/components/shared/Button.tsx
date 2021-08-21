import React from 'react';
import './Button.scss';

export interface ButtonProps {
    children?: React.ReactChild;
    link?: string;
    openInNewTab?: boolean;
}

export function Button({ children, link, openInNewTab }: ButtonProps) {
    if (link) {
        return <a className="Button" href={link} target={openInNewTab ? '_blank' : undefined}>{children}</a>;
    } else {
        return <button className="Button">{children}</button>;
    }
}