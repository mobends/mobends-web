import { BendsPack } from '../store/types';

const API_ENDPOINT = 'http://localhost:5200/graphql';

const getAllBendsPacksQuery = `
query GetAllBendsPacks($sortBy: SortingType) {
    allBendsPacks(sortBy: $sortBy) {
        id
        name
        createdOn
        likes
    }
}
`;

function executeQuery(query: string) {
    return fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    }).then(r => r.json());
}

export class ApiService {

    public static readonly instance = new ApiService();

    public async getPacks(): Promise<BendsPack[]> {
        const response = await executeQuery(getAllBendsPacksQuery);
        return response.data.allBendsPacks.map((r: any) => ({
            id: r.id,
            name: r.name,
            createdOn: new Date(parseInt(r.createdOn)),
            likes: r.likes,
        }));
    }

}