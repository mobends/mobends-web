import React from 'react';
import './PlayerCounter.scss';

import { Button } from './shared/Button';

export function PlayerCounter() {
    return (
        <div className="PlayerCounter">
            <p>Online users of Mo' Bends:</p>
            <p className="count">15</p>
            <Button link="https://www.curseforge.com/minecraft/mc-mods/mo-bends">Download Mo' Bends</Button>
        </div>
    );
}