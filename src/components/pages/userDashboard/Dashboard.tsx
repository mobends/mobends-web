import React, { useState } from 'react';
import { AccessorySettings, AccessorySettingsMap } from '../../../services/dashboard';
import { AccessoryPanel } from './AccessoryPanel';
import { Button } from '../../shared/Button';
import { PanelBase } from '../../shared/PanelBase';
import { SpacedRow } from '../../shared/SpacedRow';
import { InputField } from '../../shared/InputField';
import { StylableProps } from '../../shared/commonProps';

/* Styles */
import './Dashboard.scss';

export interface DashboardProps extends StylableProps {
    mcUsername: string;
    accessoryMap: AccessorySettingsMap;
    onMcUsernameChange(username: string): void;
    onAccessoryMapChange(accessoryMap: AccessorySettingsMap): void;
}

export function Dashboard(props: DashboardProps) {
    const [localMcUsername, setLocalMcUsername] = useState('');
    const [localAccessoryMap, setLocalAccessoryMap] = useState<AccessorySettingsMap>(props.accessoryMap);
    const [accessoryMapDirty, setAccessoryMapDirty] = useState(false);

    const submitMinecraftUsername = () => {
        props.onMcUsernameChange(localMcUsername);
    };

    const handleSettingsChange = (accessoryKey: string, settings: AccessorySettings) => {
        setLocalAccessoryMap({
            ...localAccessoryMap,
            [accessoryKey]: settings,
        });
        setAccessoryMapDirty(true);
    };

    const saveAccessorySettings = () => {
        props.onAccessoryMapChange(localAccessoryMap);
        setAccessoryMapDirty(false);
    };

    return (
        <div className="Dashboard">
            <h1>Welcome to your Dashboard</h1>
            <PanelBase
                className="Dashboard__mcUsernamePanel"
                style={{
                }}
                header={<h1>Minecraft username</h1>}
            >
                <p>Current username: <b>{props.mcUsername}</b></p>
                <SpacedRow>
                    <InputField placeholder="Your username here" type="text" value={localMcUsername} onChange={(e) => setLocalMcUsername(e.target.value)} />
                    <Button onClick={submitMinecraftUsername}>Change</Button>
                </SpacedRow>
            </PanelBase>
            <h1>Accessories</h1>
            {Object.entries(localAccessoryMap).map(([accessoryKey, settings]) => (
                <AccessoryPanel
                    key={accessoryKey}
                    {...{ accessoryKey, settings }}
                    onChange={(settings) => handleSettingsChange(accessoryKey, settings)}
                />
            ))}
            {accessoryMapDirty && (<>
                <div>You have unsaved changes</div>
                <Button onClick={saveAccessorySettings}>Save changes</Button>
            </>)}
        </div>
    );
}
