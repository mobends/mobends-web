import React from 'react';
import './HeaderNavigation.scss';
import { Link } from './router/Link';

export function HeaderNavigation() {
    return (
        <nav className='HeaderNavigation'>
            <Link to={null}>Home</Link>
            <Link to='packs'>Get Packs</Link>
        </nav>
    );
}