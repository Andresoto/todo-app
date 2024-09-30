import { TaskInitialState } from "../store/taks.reducers";

export interface Task {
    id: string;
    name: string;
    date: string;
    status: string;
    person: Person[];
}

export interface Person {
    name: string;
    age: number;
    skills: string[];
}

export interface GlobalState {
    task: TaskInitialState;
}