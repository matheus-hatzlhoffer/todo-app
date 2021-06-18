// Database in Memory

import {
  AfterSetEvent,
  BaseRecord,
  BeforeSetEvent,
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

    private beforeAddListeners = createobserver<BeforeSetEvent<T>>();
    private afterAddListeners = createobserver<AfterSetEvent<T>>();

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
        this.beforeAddListeners.publish({
          newValue,
          value: this.db[newValue.id],
        });

        this.db[newValue.id] = newValue;
      }

      this.afterAddListeners.publish({
        value: newValue,
      });

      return newValue.id;
    }

    public delete(id: number): void {
      delete this.db[id];
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    //Visitor execute visitor function to all elements in the database
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
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
