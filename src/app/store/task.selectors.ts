import { createSelector } from "@ngrx/store";
import { GlobalState } from "../interface/task.interface";

export const selectTasks = (state: GlobalState) => state.task;

export const selectTaskList = createSelector(selectTasks, (state) => state.tasks);

export const selectActiveTask = createSelector(selectTasks, (state) => state.activeTask);