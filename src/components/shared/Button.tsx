import React from 'react';
import './Button.scss';

export interface ButtonProps {
    children?: React.ReactChild;
    link?: string;
    openInNewTab?: boolean;
    onClick?: React.MouseEventHandler;
}

export function Button({ children, link, openInNewTab, onClick }: ButtonProps) {
    if (link) {
        return <a
                    className="Button"
                    href={link}
                    {...(openInNewTab ? {
                        target: '_blank',
                        rel: 'noreferrer'
                    } : {})}
                >
                        {children}
                </a>;
    }
    else {
        return <button className="Button" onClick={onClick}>{children}</button>;
    }
}