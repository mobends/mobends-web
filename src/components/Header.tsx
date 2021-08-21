import React from 'react';
import './Header.scss';

import { HeaderNavigation } from './HeaderNavigation';
import logo from '../assets/logo.svg';
import logoTitle from '../assets/logo-title.svg';
import { Link } from './router/Link';

export function Header() {
    return (
        <header className="Header">
            <div className="Header__left">
                <Link className="Header__logo" to={null}>
                    <span style={{ backgroundImage: `url(${logo})` }}></span>
                    <img alt='Logo' src={logo}></img>
                </Link>
                <Link className="Header__logo-title" to={null}>
                    <img alt="Mo' Bends" src={logoTitle}></img>
                </Link>
            </div>
            <div className="Header__right">
                <HeaderNavigation />
            </div>
        </header>
    );
}