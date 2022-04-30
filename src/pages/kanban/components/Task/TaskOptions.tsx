import React from "react"
import { useSetRecoilState } from "recoil"
import { Box } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline"
import { IList, taskState } from "pages/kanban/models/atoms"
import { InternalButton } from "components/general"
import EditTaskDialogue from "./EditTaskDialogue"
import TaskDialogue from "./TaskDialogue"
import { ModalButton } from "components/feedback"
import { t } from "i18next"

const TaskOptions = ({ listId, tasks, index }: IList) => {
  const { handleDeleteTask } = TaskDialogue({ listId, tasks, index })
  
  return (
    <Box>
      <ModalButton
        title={t("Task")}
        renderButton={(open) => {
        return (
          <InternalButton
            icon={<ModeEditOutlineIcon style={{ fontSize: 13 }} />}
            onClick={open}
          />
        )
      }}
    >
      <EditTaskDialogue listId={listId} tasks={tasks} index={index} />
    </ModalButton>
      <InternalButton
        icon={<DeleteOutlineIcon style={{ fontSize: 13 }} />}
        onClick={handleDeleteTask}
    />
    </Box>
  )
}

export default React.memo(TaskOptions)
