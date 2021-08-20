import React from 'react';
import { ActiveUserCount } from '../services/apiService';
import { createTask, useResource, useResources } from '../services/resource';

/* Styles */
import './PlayerCounter.scss';

import { Button } from './shared/Button';

const playerCounterTask = createTask('PLAYER_COUNTER', {
    activeUserCount: ActiveUserCount
});

export function PlayerCounter() {
    const activeUserCount = useResource(ActiveUserCount);

    return (
        <div className="PlayerCounter">
            <p>Online users of Mo' Bends:</p>
            <p className="count">{activeUserCount || 0}</p>
            <Button link="https://www.curseforge.com/minecraft/mc-mods/mo-bends">Download Mo' Bends</Button>
        </div>
    );
}