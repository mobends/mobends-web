import { IntervalResource } from './intervalResource';

const API_ENDPOINT = process.env.REACT_APP_MOBENDS_API_URL || 'localhost:5000';
const ACTIVITY_ENDPOINT = `${API_ENDPOINT}/activity`;

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