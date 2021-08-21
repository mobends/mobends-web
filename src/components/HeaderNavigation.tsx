import React from 'react';
import { Link } from './router/Link';

import './HeaderNavigation.scss';


export function HeaderNavigation() {
    return (
        <nav className='HeaderNavigation'>
            <Link to={null}>Home</Link>
            <Link to='roadmap'>What's to come?</Link>
        </nav>
    );
}