import { useSetRecoilState } from "recoil"
import { Box } from "@mui/material"
import { IList, taskState } from "pages/kanban/models/atoms"
import { ModalButton } from "components/feedback"
import { InternalButton } from "components/general"
import styles from "./ListHeaderOptions.module.scss"
import { t } from "i18next"
import NewTaskDialogue from "../Task/NewTaskDialogue"
import EditListDialogue from "./EditListDialogue"
import TaskDialogue from "../Task/TaskDialogue"
import ListDialogue from "./ListDialogue"
const bull = (
  <Box
    sx={{
      display: "inline-block",
      m: "2px 1px 0px 2px",
      transform: "scale(0.5)",
      opacity: "75%",
    }}
  >
    •
  </Box>
)

const divide = (
  <Box
    sx={{
      display: "inline-block",
      mx: "5px",
      transform: "scale(1)",
      opacity: "100%",
    }}
  >
    |
  </Box>
)

const ListHeaderOptions = ({ listId, tasks, index }: IList) => {
  const setTasks = useSetRecoilState(taskState)
  const { EditList } = ListDialogue()
  const handleDeleteList = () => {
    if (
      window.confirm(
        `️Are you sure to remove board "${listId.slice(
          0,
          
        )}"?`
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

  const DeleteList = () => (
    <InternalButton className={styles.deletebutton} onClick={handleDeleteList}>
      {t("delete")}
    </InternalButton>
  )

  const NewTask = () => (
    <ModalButton
      title={t("Task")}
      renderButton={(open) => {
        return (
          <InternalButton
            className={styles.taskbutton}
            onClick={open}
            chevron={true}
          >
            {t("new task")}
          </InternalButton>
        )
      }}
    >
      <NewTaskDialogue listId={listId} tasks={tasks} index={index} />
    </ModalButton>
  )
  return (
    <>
      <EditList />
       {bull}
      <DeleteList />
       {divide}
      <NewTask />
    </>
  )
}

export default ListHeaderOptions
