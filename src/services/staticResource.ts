import { IResource, IResourceChangeListener } from './resource';

export class StaticResource<T> implements IResource<T> {
    private listeners: Set<IResourceChangeListener<T>> = new Set();
    private getterPromise: Promise<T>|null = null;

    constructor(private readonly getter: () => Promise<T>) {}

    async get(): Promise<T> {
        if (this.getterPromise === null) {
            this.getterPromise = this.getter();
            
            const value = await this.getterPromise;
            this.notify(value);
            return value;
        }

        return await this.getterPromise;
    }

    markDirty(): void {
        this.getterPromise = null;
    }

    subscribe(callback: IResourceChangeListener<T>): () => void {
        this.listeners.add(callback);

        return () => this.unsubscribe(callback);
    }

    unsubscribe(callback: IResourceChangeListener<T>): void {
        this.listeners.delete(callback);
    }

    private notify(value: T) {
        this.listeners.forEach(l => l(value));
    }
}