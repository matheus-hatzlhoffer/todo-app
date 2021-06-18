export type Listener<EventType> = (ev: EventType) => void;

export interface BeforeChangeEvent<T> {
  value: T | null;
  newValue: T | null;
  method: string;
  date: Date;
}

export interface AfterChangeEvent<T> {
  value: T | null;
  method: string;
  date: Date;
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

  onBeforeChange(listener: Listener<BeforeChangeEvent<T>>): () => void;
  onAfterChange(listener: Listener<AfterChangeEvent<T>>): () => void;

  visit(visitor: (item: T) => void): void;
}
