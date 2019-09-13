import React from 'react';
import './Header.scss';

import { HeaderNavigation } from './HeaderNavigation';
import logo from '../logo.svg';
import title from '../title.svg';

export function Header() {
    return (
        <header className="Header">
            <img className="Header_logo" alt="Logo" src={logo}></img>
            
            <HeaderNavigation />
        </header>
    );
}