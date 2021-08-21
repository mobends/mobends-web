import React from 'react';
import { Button } from './shared/Button';
import { CrossCard } from './shared/CrossCard';

/* Styles */
import './SupportCard.scss';

export function SupportCard() {
    return (
        <CrossCard className="SupportCard" theme={{
            contentColor: '#fff',
            shadowColor: '#ab0034',
            bgColor: '#ff424d',
        }}>
            <h1>SUPPORT</h1>
            <ul>
                <li>Customize your <b>Sword Trail</b> color</li>
                <li>Early-access to new versions</li>
                <li>Help with continued development</li>
            </ul>
            <Button link="https://www.patreon.com/goblinbob" openInNewTab>Become a Supporter</Button>
        </CrossCard>
    );
}
