import { createTask } from '../tasks';
import { IntervalResource } from './intervalResource';

const API_ENDPOINT = process.env.REACT_APP_MOBENDS_API_URL || 'localhost:5000';
const ACTIVITY_ENDPOINT = `${API_ENDPOINT}/api/activity`;
const DASHBOARD_ENDPOINT = `${API_ENDPOINT}/auth/dashboard`;

export class ApiService {
    public static readonly instance = new ApiService();
}

export const ActiveUserCount = new IntervalResource(async () => {
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


export const SET_MC_USERNAME_TASK = createTask(async (username: string) => {
    if (username.length === 0) {
        return;
    }

    let response;

    try {
        // We're sending the finished job.
        response = await fetch(`${DASHBOARD_ENDPOINT}/mcusername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
            }),
            credentials: 'include',
        }).then(r => r.json());
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