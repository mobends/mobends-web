import React from 'react';
import './Header.scss';

import { HeaderNavigation } from './HeaderNavigation';
import logo from '../logo.svg';
import title from '../title.svg';

export function Header() {
    return (
        <header className="Header">
            <img className="Header_logo" src={logo}></img>
            <img className="Header_title" src={title}></img>
            
            <HeaderNavigation />
        </header>
    );
}