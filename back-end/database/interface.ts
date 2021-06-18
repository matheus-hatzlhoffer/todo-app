export type Listener<EventType> = (ev: EventType) => void;

export interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

export interface AfterSetEvent<T> {
  value: T;
}

export interface Todo {
  value: string;
  isCompleted: boolean;
  id?: number;
}

export interface BaseRecord {
  id?: number;
}

export interface Database<T extends BaseRecord> {
  set(newValue: T): number | undefined;
  get(id: number): T | undefined;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;

  visit(visitor: (item: T) => void): void;
}
