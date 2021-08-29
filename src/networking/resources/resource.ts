import { useEffect, useState } from 'react';

export type IResourceChangeListener<T> = (value: T) => void;

export interface IResource<T> {
    get(): Promise<T>;
    subscribe(callback: IResourceChangeListener<T>): () => void;
    unsubscribe(callback: IResourceChangeListener<T>): void;
}

export function useResource<T>(resource: IResource<T>): T|undefined {
    const [value, setValue] = useState<T|undefined>(undefined);

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
    }, [resource]);

    return value;
}
