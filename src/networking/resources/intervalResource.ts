import { StaticResource } from './staticResource';

export class IntervalResource<T> extends StaticResource<T> {
    constructor(getter: () => Promise<T>, interval: number) {
        super(getter);

        setInterval(() => {
            this.markDirty();
            this.get();
        }, interval);
    }
}
