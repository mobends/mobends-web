import React from 'react';
import './HomePage.scss';

import { PlayerCounter } from './PlayerCounter';
import banner from '../banner.svg';

export function HomePage() {
    return (
        <div className="HomePage">
            <img className="HomePage_banner" alt="Banner" src={banner} />
            <PlayerCounter />
        </div>
    );
}