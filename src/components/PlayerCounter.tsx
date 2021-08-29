import React from 'react';
import { ACTIVE_USER_COUNT } from '../services/apiService';
import { Button } from './shared/Button';
import { CrossCard } from './shared/CrossCard';

/* Styles */
import './PlayerCounter.scss';
import { useResource } from '../networking/resources/resource';

export function PlayerCounter() {
    const activeUserCount = useResource(ACTIVE_USER_COUNT);

    return (
        <CrossCard className="PlayerCounter">
            <p>Online users of Mo' Bends:</p>
            <p className="count">{activeUserCount || 0}</p>
            <Button link="https://www.curseforge.com/minecraft/mc-mods/mo-bends" openInNewTab>Download Mo' Bends</Button>
        </CrossCard>
    );
}
