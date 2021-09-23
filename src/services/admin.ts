import { StaticResource } from '../networking/resources/staticResource';
import { createTask } from '../networking/tasks';
import { API_ENDPOINT } from './apiService';
import { fetchDeleteJSON, fetchPostJSON, parseAuthJSON } from './common';

const ADMIN_ENDPOINT = `${API_ENDPOINT}/auth/admin`;

export interface AssetDefinition {
    id: number;
    path: string;
    version: number;
}

export interface AssetManifest {
    baseUrl: string;
    version: number;
    assets: AssetDefinition[];
}

export const ASSET_MANIFEST = new StaticResource(async () => {
    try {
        return await fetch(`${ADMIN_ENDPOINT}/asset-manifest`, {
            credentials: 'include',
        }).then(r => parseAuthJSON<{manifest: AssetManifest}>(r));
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return {
            authenticated: false as const,
        };
    }
});

export const SET_ASSET_MANIFEST = createTask(async (manifest: AssetManifest) => {
    let response;

    try {
        response = await fetchPostJSON(`${ADMIN_ENDPOINT}/asset-manifest`, { manifest }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return { authenticated: false as const };
    }

    if (response.error !== undefined) {
        alert(`Failed to update asset manifest.`);
        return { authenticated: false as const };
    }

    return { authenticated: true as const, manifest };
});

export const ADD_ASSET = createTask(async (path: string) => {
    let response;

    try {
        response = await fetchPostJSON(`${ADMIN_ENDPOINT}/asset`, { path }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return { authenticated: false as const };
    }

    if (response.error !== undefined) {
        alert(`Failed to add new asset.`);
        return { authenticated: false as const };
    }

    return { authenticated: true as const, path };
});

export const DELETE_ASSET = createTask(async (assetId: number) => {
    let response;

    try {
        response = await fetchDeleteJSON(`${ADMIN_ENDPOINT}/asset`, { assetId }, true);
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return { authenticated: false as const };
    }

    if (response.error !== undefined) {
        alert(`Failed to delete asset: ${assetId}.`);
        return { authenticated: false as const };
    }

    return { authenticated: true as const };
});