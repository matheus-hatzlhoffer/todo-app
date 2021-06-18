// Database in Memory

import {
  AfterChangeEvent,
  BaseRecord,
  BeforeChangeEvent,
  Database,
  Listener,
} from "./interface";

function createobserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  };
}

function CreateDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};
    private idCounter: number = 1;

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeChangeListeners = createobserver<BeforeChangeEvent<T>>();
    private afterChangeListeners = createobserver<AfterChangeEvent<T>>();

    private constructor() {}

    public get(id: number): T | undefined {
      return this.db[id];
    }

    public getAll(): Record<number, T> {
      return this.db;
    }

    public set(newValue: T): number | undefined {
      if (!newValue.id) {
        newValue = { ...newValue, id: this.idCounter };
        this.idCounter++;
      }

      if (newValue.id) {
        this.beforeChangeListeners.publish({
          newValue,
          value: this.db[newValue.id],
          method: "POST",
          date: new Date(),
        });

        this.db[newValue.id] = newValue;
      }

      this.afterChangeListeners.publish({
        value: newValue,
        method: "Post",
        date: new Date(),
      });

      return newValue.id;
    }

    public delete(id: number): void {
      this.beforeChangeListeners.publish({
        newValue: null,
        value: this.db[id],
        method: "DELETE",
        date: new Date(),
      });
      delete this.db[id];
      this.afterChangeListeners.publish({
        value: null,
        method: "Post",
        date: new Date(),
      });
    }

    onBeforeChange(listener: Listener<BeforeChangeEvent<T>>): () => void {
      return this.beforeChangeListeners.subscribe(listener);
    }
    onAfterChange(listener: Listener<AfterChangeEvent<T>>): () => void {
      return this.afterChangeListeners.subscribe(listener);
    }

    //Visitor execute visitor function to all elements in the database
    visit(visitor: (item: T) => void): void {
      this.beforeChangeListeners.publish({
        newValue: null,
        value: null,
        method: "PATCH",
        date: new Date(),
      });
      Object.values(this.db).forEach(visitor);
      this.afterChangeListeners.publish({
        value: null,
        method: "PATCH",
        date: new Date(),
      });
    }

    countProprety(scorestrategy: (item: T) => number): {
      prop: number;
      item: T | undefined;
    } {
      const count: { prop: number; item: T | undefined } = {
        prop: 0,
        item: undefined,
      };

      Object.values(this.db).reduce((f, item) => {
        const score = scorestrategy(item);
        f.prop += score;
        return f;
      }, count);
      return count;
    }
  }

  return InMemoryDatabase;
}

export default CreateDatabase;
