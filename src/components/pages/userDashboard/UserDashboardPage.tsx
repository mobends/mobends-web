import React, { useMemo } from 'react';
import { AccessorySettingsMap, ACCESSORY_SETTINGS, MINECRAFT_USERNAME, SET_ACCESSORY_SETTINGS, SET_MC_USERNAME_TASK } from '../../../services/dashboard';
import { ACCESSORY_DETAILS, API_ENDPOINT } from '../../../services/apiService';
import { useResource } from '../../../networking/resources/resource';
import { useUpdatableResource } from '../../../networking/updatableResource';
import { CrossCard } from '../../shared/CrossCard';
import { Button } from '../../shared/Button';
import { Loader } from '../../shared/Loader';
import { Dashboard } from './Dashboard';

/* Styles */
import './UserDashboardPage.scss';

export function UserDashboardPage() {
    const [mcUsername, updateMcUsername, mcUsernameLoading] = useUpdatableResource(MINECRAFT_USERNAME, SET_MC_USERNAME_TASK);
    const accessoryDetails = useResource(ACCESSORY_DETAILS);
    const [accessoryMap, updateAccessoryMap, accessoryMapLoading] = useUpdatableResource(ACCESSORY_SETTINGS, SET_ACCESSORY_SETTINGS);

    const loading = useMemo(() => {
        return mcUsernameLoading || accessoryMapLoading;
    }, [mcUsernameLoading, accessoryMapLoading]);

    const submitMinecraftUsername = (username: string) => {
        updateMcUsername(username);
    };

    const submitAccessorySettings = (map: AccessorySettingsMap) => {
        updateAccessoryMap(map);
    };

    let contents;
    if (mcUsername === undefined || accessoryMap === undefined) {
        contents = null;
    }
    else if (mcUsername.authenticated && accessoryDetails?.authenticated && accessoryMap.authenticated) {
        contents = (<Dashboard
            mcUsername={mcUsername.username}
            accessoryDetails={accessoryDetails.details}
            accessoryMap={accessoryMap.settings}
            onMcUsernameChange={submitMinecraftUsername}
            onAccessoryMapChange={submitAccessorySettings}
        />);
    }
    else {
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
                <Button link={`${API_ENDPOINT}/auth/discord`}>Login</Button>
            </CrossCard>
        );
    }

    return (
        <div className="UserDashboardPage">
            {contents}
            {loading && (
                <div className="UserDashboardPage__loader">
                    <Loader />
                </div>
            )}
        </div>
    );
}
