import { useCallback, useMemo, useState } from 'react';

export interface LoadingState {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export function useLoadingState(): LoadingState {
    const [loading, setLoading] = useState(false);
    
    return useMemo(() => ({
        loading,
        setLoading
    }), [loading, setLoading]);
}

export interface ITask<Params, T> {
    action: (params: Params) => Promise<T>;
}

export function createTask<Params, T>(action: (params: Params) => Promise<T>): ITask<Params, T> {
    return {
        action,
    };
}

export function useTask<Params, T>(loadingState: LoadingState, task: ITask<Params, T>) {
    const { loading, setLoading } = loadingState;
    const { action } = task;

    return useCallback(async (params: Params) => {
        if (loading) {
            // Another task is being performed.
            throw new Error('Another task is being currently performed');
        }
    
        setLoading(true);
        
        try {
            const value = await action(params);

            setLoading(false);

            return value;
        }
        catch(e) {
            setLoading(false);
            throw e;
        }
    }, [loading, setLoading, action]);
}
