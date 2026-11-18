
type QueueItem = {
    priority: number;
    value: any;
};

export class PQueue {
    public items: QueueItem[] = [];

    constructor () {

    }


    // append new_item to queue in order
    enqueue(new_item: [number, any]): boolean {
        const priority: number = new_item[0];
        const value: any = new_item[1];

        let index: number = 0;
        for (const item of this.items) {
            if (item.priority > priority) {
                this.items.splice(index, 0, { priority: priority, value: value } as QueueItem);
                return true;
            }

            index++;
        }

        this.items.push({ priority: priority, value: value } as QueueItem);
        return true;
    }

    dequeue(): QueueItem | undefined {
        if (this.items.length === 0) return undefined;

        return this.items.shift();
    }

    peek(): QueueItem | undefined {
        return this.items[0];
    }
}