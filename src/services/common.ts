export async function parseAuthJSON<T>(res: Response): Promise<(T & { authenticated: true } | { authenticated: false })> {
    if (res.status === 401) {
        return {
            authenticated: false,
        };
    }

    return {
        ...((await res.json()) as T),
        authenticated: true,
    };
}

export async function fetchPostJSON<T>(url: string, body: T, authenticate?: boolean): Promise<any> {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: authenticate ? 'include' : 'omit',
    }).then(r => r.json());
}