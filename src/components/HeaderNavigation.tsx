import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderNavigation.scss';

export function HeaderNavigation() {
    return (
        <nav className='HeaderNavigation'>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/roadmap'>What's to come?</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
        </nav>
    );
}