import React from 'react';
import { DiscordCard } from '../DiscordCard';
import { Button } from '../shared/Button';
import { CrossCard } from '../shared/CrossCard';

/* Styles */
import './RoadMapPage.scss';

export function RoadMapPage() {
    return (
        <div className="RoadMapPage">
            <CrossCard className="RoadMapPage__card" theme={{
                contentColor: '#fff',
                shadowColor: '#0467a0',
                bgColor: '#169cb4',
            }}>
                <h1>THE FUTURE</h1>
                <p>
                    While I support versions <b>1.0.0</b> and onwards, I'm working on the next step, <b>Mo' Bends 2.0.0</b>.
                </p>
                <p>
                    I've completed most of the tough tasks, but we've still got a hell of a road ahead of us. You can see the live progress
                    and roadmap on my <b>Discord Server</b>. Join below!
                </p>
                <Button link="https://discord.gg/Epf7atm" openInNewTab>Join the Discord</Button>
            </CrossCard>
        </div>
    );
}
