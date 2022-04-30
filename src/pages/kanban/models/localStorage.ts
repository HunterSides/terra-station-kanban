import { ITaskState } from "./atoms"

export const LOCAL_TASK_STATE = "recoil_tasks"
export const LOCAL_LIST_STATE = "recoil_lists"

export const loadTasks = () => {
  const localTasks = localStorage.getItem(LOCAL_TASK_STATE)
  if (localTasks) {
    return JSON.parse(localTasks)
  }
  return null
}

export const saveTasks = (tasks: ITaskState) => {
  localStorage.setItem(LOCAL_TASK_STATE, JSON.stringify(tasks))
}
