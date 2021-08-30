import { useMemo, useState } from 'react';
import { IResource, useResource } from './resources/resource';
import { useLoadingState, useTask } from './tasks';
import { ITask } from './tasks/hooks';

export function useUpdatableResource<T, UpdateParams>(resource: IResource<T>, updatingTask: ITask<UpdateParams, T>): [T|undefined, (params: UpdateParams) => Promise<T>, boolean] {
    const initialValue = useResource(resource);
    const [updatedValue, setUpdatedValue] = useState<T|undefined>(undefined);

    const loadingState = useLoadingState();
    const updateTaskAction = useTask(loadingState, updatingTask);

    const loading = useMemo(() => {
        return loadingState.loading || initialValue === undefined;
    }, [loadingState.loading, initialValue]);

    const updateValue = async (params: UpdateParams): Promise<T> => {
        const value = await updateTaskAction(params);

        setUpdatedValue(value);

        return value;
    };

    return [updatedValue || initialValue, updateValue, loading];
}