import { useEffect, useState } from 'react';

export interface IResource<T> {
    get(): Promise<T>;
}

type ResourceMap<T> = {[key in keyof T]: IResource<T[key]>};

export interface ITask<T extends object> {
    key: string;
    deps: ResourceMap<T>;
}

export function createTask<T extends object>(key: string, resources: ResourceMap<T>): ITask<T> {
    return {
        key,
        deps: resources,
    };
}

export function useResources<T extends object>(task: ITask<T>): T|null {
    const [values, setValues] = useState<null|T>(null);

    const { key: taskKey, deps } = task;

    useEffect(() => {
        let cancelled = false;

        const resourceKeys = Object.keys(deps);
        const resourcePromises = resourceKeys.map(key => (deps as any)[key].get());

        Promise.all(resourcePromises).then(result => {
            if (cancelled) {
                return;
            }

            let valuesMap: any = {};

            resourceKeys.forEach((key, index) => {
                valuesMap[key] = result[index];
            });

            setValues(valuesMap);
        });

        return () => {
            cancelled = true;
        };
    }, [deps, setValues]);

    return values;
}
