import { createReducer, on } from "@ngrx/store"
import { addPersons, addTask, getTask, updateTaskStatus } from "./task.actions"
import { Task } from "../interface/task.interface";

export interface TaskInitialState {
    tasks: Task[];
    activeTask: Task | null;
}

export const initialState: TaskInitialState = {
    tasks: [],
    activeTask: null
}

export const taskReducer = createReducer(
  initialState,
    on(addTask, (state, { task }) => {
        return {
        ...state,
        tasks: [...state.tasks, task]
        }
    }),

    on(updateTaskStatus, (state, { id }) => {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        status: task.status === 'PENDING' ? 'DONE' : 'PENDING'
                    }
                }
                return task;
            })
        }
    }),

    on(getTask, (state, { id }) => {
        return {
            ...state,
            activeTask: state.tasks.find(task => task.id === id) || null
        }
    }),

    on(addPersons, (state, { persons, id }) => {
        return {
            ...state,
            activeTask: null,
            tasks: state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        person: [...persons]
                    }
                }
                return task;
            })
        }
    })
)
