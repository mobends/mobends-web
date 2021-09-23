import { IntervalResource } from '../networking/resources/intervalResource';
import { StaticResource } from '../networking/resources/staticResource';
import { parseAuthJSON } from './common';

export const API_ENDPOINT = process.env.REACT_APP_MOBENDS_API_URL || 'localhost:5000';
const ACTIVITY_ENDPOINT = `${API_ENDPOINT}/api/activity`;
const ACCESSORY_ENDPOINT = `${API_ENDPOINT}/api/accessory`;

export class ApiService {
    public static readonly instance = new ApiService();
}

export const ACTIVE_USER_COUNT = new IntervalResource(async () => {
    let data;

    const appId = 'mobends';

    try {
        data = await fetch(`${ACTIVITY_ENDPOINT}/pings?` + new URLSearchParams({
            app: appId,
        })).then(r => r.json());
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return 0;
    }

    let total = 0;
    if (data.mobends !== undefined) {
        const versions = Object.keys(data.mobends);
        for (const version of versions) {
            total += data.mobends[version];
        }
    }

    return total;
}, 10000); // Updating every 10 seconds

export interface AccessoryDetails {
    displayName: string;
    parts: any[];
}

export type AccessoryDetailsMap = {[key: string]: AccessoryDetails};

export const ACCESSORY_DETAILS = new StaticResource(async () => {
    try {
        return await fetch(`${ACCESSORY_ENDPOINT}/details`)
            .then(r => parseAuthJSON<{details: AccessoryDetailsMap}>(r));
    }
    catch (e) {
        console.error(`Unexpected error:`, e);
        return {
            authenticated: false as const,
        };
    }
});
