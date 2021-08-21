import React from 'react';
import { ActiveUserCount } from '../services/apiService';
import { useResource } from '../services/resource';
import { Button } from './shared/Button';
import { CrossCard } from './shared/CrossCard';

/* Styles */
import './PlayerCounter.scss';

export function PlayerCounter() {
    const activeUserCount = useResource(ActiveUserCount);

    return (
        <CrossCard className="PlayerCounter">
            <p>Online users of Mo' Bends:</p>
            <p className="count">{activeUserCount || 0}</p>
            <Button link="https://www.curseforge.com/minecraft/mc-mods/mo-bends" openInNewTab>Download Mo' Bends</Button>
        </CrossCard>
    );
}
