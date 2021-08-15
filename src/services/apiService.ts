import { IResource } from './resource';

const API_ENDPOINT = process.env.REACT_APP_MOBENDS_API_URL || 'localhost:5000';
const ACTIVITY_ENDPOINT = `${API_ENDPOINT}/activity`;

export class ApiService {
    public static readonly instance = new ApiService();
}

export const ActiveUserCount: IResource<number> = {
    async get(): Promise<number> {
        return 0;
    }
};