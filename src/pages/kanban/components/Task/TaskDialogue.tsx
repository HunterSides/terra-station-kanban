import React from "react"
import { useSetRecoilState } from "recoil"
import { Box } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline"
import { IList, taskState } from "pages/kanban/models/atoms"
import { InternalButton } from "components/general"
import EditTaskDialogue from "./EditTaskDialogue"
import { ModalButton } from "components/feedback"
import { t } from "i18next"

const TaskDialogue = ({ listId, tasks, index }: IList) => {
  const setTasks = useSetRecoilState(taskState)
  
  const handleDeleteTask = () => {
    if (
      window.confirm(
        `️Are you sure to remove task "${tasks[index]}"?`
      )
    ) {
      setTasks((allTasks) => {
        let boardEntries = Object.entries(allTasks)
        boardEntries.splice(index, 1)
        return boardEntries.reduce(
          (modifiedBoards, [listId, tasks]) => ({
            ...modifiedBoards,
            [listId]: tasks,
          }),
          {}
        )
      })
    }
  }
  const handleEditTask = () => {
  }
  const handleCreateTask = () => {

  }
  return { handleDeleteTask }
}

export default TaskDialogue
