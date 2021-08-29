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
        return;
    }

    let response;

    try {
        response = await fetchPostJSON(`${DASHBOARD_ENDPOINT}/mcusername`, { username }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return;
    }

    if (response.error !== undefined) {
        alert(`Failed to set username.`);
        return;
    }
});

export interface AccessorySettings {
    displayName: string;
    unlocked: boolean;
    hidden: boolean;
    color: number;
}

export const ACCESSORY_SETTINGS = new StaticResource(async () => {
    try {
        return await fetch(`${DASHBOARD_ENDPOINT}/accessories?`, {
            credentials: 'include',
        }).then(r => parseAuthJSON<{settings: {[key: string]: AccessorySettings}}>(r));
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return {
            authenticated: false as const,
        };
    }
});

export const SET_ACCESSORY_SETTINGS = createTask(async () => {
    
});