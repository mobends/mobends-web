import React from 'react';
import './HomePage.scss';

import banner from '../../assets/banner.svg';
import { PlayerCounter } from '../PlayerCounter';
import { SupportCard } from '../SupportCard';
import { DiscordCard } from '../DiscordCard';

export function HomePage() {
    return (
        <div className="HomePage">
            <div className="HomePage__banner" style={{
                backgroundImage: `url(${banner})`,
            }}>
                <PlayerCounter />
            </div>
            <div className="HomePage__cards">
                <DiscordCard />
                <SupportCard />
            </div>
        </div>
    );
}