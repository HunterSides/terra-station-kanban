import { atom } from "recoil"
import { loadTasks } from "./localStorage"

export interface IForm {
  task: string
  description: string
}
export interface ITask {
  id: string
  name: string
  description: string
}
export interface IList {
  listId: string
  tasks: ITask[]
  index: number
}

export interface ITaskState {
  [key: string]: ITask[]
}

export const draggingAtomState = atom({
  key: "draggingAtomState",
  default: false,
})

export const taskState = atom<ITaskState>({
  key: "taskState",
  default: loadTasks() ?? {
    "Completed": [],
    "In progress": [],
    "Not started": [],
  },
})
