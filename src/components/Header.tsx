import React from 'react';
import './Header.scss';

import { HeaderNavigation } from './HeaderNavigation';
import logo from '../logo.svg';
import { Link } from './router/Link';

export function Header() {
    return (
        <header className="Header">
            <Link className="Header__logo" to={null}>
                <span style={{ backgroundImage: `url(${logo})` }}></span>
                <img alt='Logo' src={logo}></img>
            </Link>
            
            <HeaderNavigation />
        </header>
    );
}