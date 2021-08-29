import { useEffect, useMemo } from 'react';
import { useResource } from './resources/resource';
import { StaticResource } from './resources/staticResource';
import { useLoadingState, useTask } from './tasks';
import { ITask } from './tasks/hooks';

export function useUpdatableResource<T, UpdateParams>(resource: StaticResource<T>, updatingTask: ITask<UpdateParams, unknown>): [T|undefined, (params: UpdateParams) => unknown, boolean] {
    const resourceValue = useResource(resource);

    const loadingState = useLoadingState();
    const updateResourceValue = useTask(loadingState, updatingTask);

    useEffect(() => {
        if (loadingState.loading === false) {
            resource.markDirty();
            resource.get();
        }
    }, [resource, loadingState.loading]);

    const loading = useMemo(() => {
        return loadingState.loading || resourceValue === null;
    }, [loadingState.loading, resourceValue]);

    return [resourceValue, updateResourceValue, loading];
}