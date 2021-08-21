import React from 'react';
import { Button } from './shared/Button';
import { CrossCard } from './shared/CrossCard';

export function DiscordCard() {
    return (
        <CrossCard className="DiscordCard" theme={{
            contentColor: '#fff',
            shadowColor: '#0467a0',
            bgColor: '#169cb4',
        }}>
            <h1>COMMUNITY</h1>
            <ul>
                <li>Weekly livestreams</li>
                <li>Chat with fellow players</li>
                <li>Suggest </li>
            </ul>
            <Button link="https://discord.gg/Epf7atm" openInNewTab>Join the Discord</Button>
        </CrossCard>
    );
}
