import React, { useState } from 'react';
import { SET_MC_USERNAME_TASK } from '../../services/apiService';
import { useLoadingState, useTask } from '../../tasks';
import { Button } from '../shared/Button';
import { InputField } from '../shared/InputField';
import { PanelBase } from '../shared/PanelBase';
import './UserDashboardPage.scss';

export function UserDashboardPage() {
    const [mcUsername, setMcUsername] = useState('');
    const usernameLoadingState = useLoadingState();
    const updateMinecraftUsername = useTask(usernameLoadingState, SET_MC_USERNAME_TASK);

    const submitMinecraftUsername = () => {
        updateMinecraftUsername(mcUsername);
    };

    return (
        <div className="UserDashboardPage">
            <h1>Welcome to your Dashboard</h1>
            <PanelBase className="UserDashboardPage__mcUsernamePanel">
                <InputField type="text" value={mcUsername} onChange={(e) => setMcUsername(e.target.value)} />
                <Button onClick={submitMinecraftUsername}>Submit</Button>
            </PanelBase>
        </div>
    );
}
