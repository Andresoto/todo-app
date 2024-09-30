import { createAction, props } from "@ngrx/store";
import { Person, Task } from "../interface/task.interface";

export const TASK = {
    ADD: '[task] Add Task',
    UPDATE: '[task] Update Task status',
    REMOVE: '[task] Remove Task',
    GET_TASK: '[task] Get Task',
    ADD_PERSONS: '[task] Add Persons',
};

export const addTask = createAction(
    TASK.ADD,
    props<{task: Task}>() 
)

export const updateTaskStatus = createAction(
    TASK.UPDATE,
    props<{id: string}>()
)

export const getTask = createAction(
    TASK.GET_TASK,
    props<{id: string}>()
)

export const addPersons = createAction(
    TASK.ADD_PERSONS,
    props<{id: string, persons: Person[]}>()
)