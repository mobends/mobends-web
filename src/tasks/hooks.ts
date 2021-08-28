import { MutableRefObject, useCallback, useState } from 'react';
import { useValueRef } from '../hooks/valueRef';

export interface LoadingState {
    loading: MutableRefObject<boolean>;
    setLoading: (value: boolean) => void;
}

export function useLoadingState(): LoadingState {
    const [loading, setLoading] = useState(false);
    const loadingRef = useValueRef(loading);

    return {
        loading: loadingRef,
        setLoading
    };
}

export interface Task<Params, T> {
    action: (params: Params) => Promise<T>;
}

export function createTask<Params, T>(action: (params: Params) => Promise<T>): Task<Params, T> {
    return {
        action,
    };
}

export function useTask<Params, T>(loadingState: LoadingState, task: Task<Params, T>) {
    const { loading, setLoading } = loadingState;
    const { action } = task;

    return useCallback(async (params: Params) => {
        if (loading.current) {
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
