import { StaticResource } from '../networking/resources/staticResource';
import { createTask } from '../networking/tasks';
import { API_ENDPOINT } from './apiService';
import { fetchPostJSON, parseAuthJSON } from './common';

const DASHBOARD_ENDPOINT = `${API_ENDPOINT}/auth/dashboard`;

export const MINECRAFT_USERNAME = new StaticResource(async () => {
    try {
        return await fetch(`${DASHBOARD_ENDPOINT}/mcusername?`, {
            credentials: 'include',
        }).then(r => parseAuthJSON<{username: string}>(r));
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return {
            authenticated: false as const,
        };
    }
});

export const SET_MC_USERNAME_TASK = createTask(async (username: string) => {
    if (username.length === 0) {
        return { authenticated: true as const, username, };
    }

    let response;

    try {
        response = await fetchPostJSON(`${DASHBOARD_ENDPOINT}/mcusername`, { username }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return { authenticated: false as const };
    }

    if (response.error !== undefined) {
        alert(`Failed to set username.`);
        return { authenticated: false as const };
    }

    return { authenticated: true as const, username };
});

export interface AccessorySettings {
    unlocked: boolean;
    hidden: boolean;
    color: number;
}

export type AccessorySettingsMap = {[key: string]: AccessorySettings};

export const ACCESSORY_SETTINGS = new StaticResource(async () => {
    try {
        return await fetch(`${DASHBOARD_ENDPOINT}/accessories`, {
            credentials: 'include',
        }).then(r => parseAuthJSON<{settings: AccessorySettingsMap}>(r));
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return {
            authenticated: false as const,
        };
    }
});

export const SET_ACCESSORY_SETTINGS = createTask(async (map: AccessorySettingsMap) => {
    let response;

    try {
        response = await fetchPostJSON(`${DASHBOARD_ENDPOINT}/accessories`, { settings: map }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return { authenticated: false as const };
    }

    if (response.error !== undefined) {
        alert(`Failed to update accessory settings.`);
        return { authenticated: false as const };
    }

    return { authenticated: true as const, settings: map };
});