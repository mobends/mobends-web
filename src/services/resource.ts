import { useEffect, useState } from 'react';

export type IResourceChangeListener<T> = (value: T) => void;

export interface IResource<T> {
    get(): Promise<T>;
    subscribe(callback: IResourceChangeListener<T>): () => void;
    unsubscribe(callback: IResourceChangeListener<T>): void;
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

export function useResource<T>(resource: IResource<T>): T|null {
    const [value, setValue] = useState<T|null>(null);

    useEffect(() => {
        let cancelled = false;

        resource.get().then(value => {
            if (!cancelled)
                setValue(value);
        });

        // Subscribe to future updates.
        const unsubscribe = resource.subscribe(newValue => {
            setValue(newValue);
        });

        return () => {
            unsubscribe();

            cancelled = true;
        };
    }, []);

    return value;
}

export function useResources<T extends object>(task: ITask<T>): T|null {
    const [values, setValues] = useState<null|T>(null);

    const { key: taskKey, deps } = task;

    useEffect(() => {
        let cancelled = false;

        const resourceKeys = Object.keys(deps);
        const resourcePromises = resourceKeys.map(key => (deps as any)[key].get());

        const unsubscribers: (() => void)[] = [];

        for (const resourceKey of resourceKeys) {
            const resource = (deps as any)[resourceKey] as IResource<any>;

            unsubscribers.push(resource.subscribe((value) => {
                setValues(old => ({
                    ...old,
                    [resourceKey]: value
                } as any));
            }));
        }

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

            for (const unsub of unsubscribers) {
                unsub();
            }
        };
    }, [deps, setValues]);

    return values;
}
