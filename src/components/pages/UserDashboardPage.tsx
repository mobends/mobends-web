import React, { useMemo, useState } from 'react';
import { API_ENDPOINT } from '../../services/apiService';
import { Button } from '../shared/Button';
import { CrossCard } from '../shared/CrossCard';
import { InputField } from '../shared/InputField';
import { Loader } from '../shared/Loader';
import { PanelBase } from '../shared/PanelBase';
import { SpacedRow } from '../shared/SpacedRow';
import './UserDashboardPage.scss';
import { useUpdatableResource } from '../../networking/updatableResource';
import { ACCESSORY_SETTINGS, MINECRAFT_USERNAME, SET_ACCESSORY_SETTINGS, SET_MC_USERNAME_TASK } from '../../services/dashboard';

export function UserDashboardPage() {
    const [localMcUsername, setLocalMcUsername] = useState('');

    const [mcUsername, updateMcUsername, mcUsernameLoading] = useUpdatableResource(MINECRAFT_USERNAME, SET_MC_USERNAME_TASK);
    const [accessoryMap, updateAccessoryMap, accessoryMapLoading] = useUpdatableResource(ACCESSORY_SETTINGS, SET_ACCESSORY_SETTINGS);

    const loading = useMemo(() => {
        return mcUsernameLoading || accessoryMapLoading;
    }, [mcUsernameLoading, accessoryMapLoading]);

    const authenticated = useMemo(() => {
        return mcUsername?.authenticated && accessoryMap?.authenticated;
    }, [mcUsername, accessoryMap]);

    const submitMinecraftUsername = () => {
        updateMcUsername(localMcUsername);
    };

    let contents;
    if (loading) {
        contents = (
            <div className="UserDashboardPage__loader">
                <Loader />
            </div>
        );
    }
    else if (!authenticated) {
        contents = (
            <CrossCard className="UserDashboardPage__loginCard" theme={{
                contentColor: '#fff',
                shadowColor: '#0467a0',
                bgColor: '#169cb4',
            }}>
                <h1>DASHBOARD</h1>
                <p>
                    Log in through <b>Discord</b> to configure your accessories!
                </p>
                <Button link={`${API_ENDPOINT}/auth/discord`} openInNewTab>Login</Button>
            </CrossCard>
        );
    }
    else {
        contents = (<>
            <h1>Welcome to your Dashboard</h1>
            <PanelBase
                className="UserDashboardPage__mcUsernamePanel"
                style={{
                    maxWidth: '30rem',
                }}
                header={<h1>Minecraft username</h1>}
            >
                <p>Current username: <b>{mcUsername?.authenticated ? mcUsername.username : ''}</b></p>
                <SpacedRow>
                    <InputField placeholder="Your username here" type="text" value={localMcUsername} onChange={(e) => setLocalMcUsername(e.target.value)} />
                    <Button onClick={submitMinecraftUsername}>Change</Button>
                </SpacedRow>
            </PanelBase>
            <h1>Accessories</h1>
            {accessoryMap?.authenticated ? Object.entries(accessoryMap.settings).map(([accessoryKey, settings]) => (
                <PanelBase header={<h1>{settings.displayName}</h1>}>
                    <p>Unlocked: {settings.unlocked ? 'YES' : 'NO'}</p>
                    <p>Color: #{settings.color.toString(16)}</p>
                </PanelBase>
            )) : null}
        </>);
    }

    return (
        <div className="UserDashboardPage">
            {contents}
        </div>
    );
}
