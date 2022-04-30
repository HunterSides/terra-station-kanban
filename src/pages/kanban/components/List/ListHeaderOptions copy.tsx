import { useSetRecoilState } from "recoil"
import { Box } from "@mui/material"
import { IList, taskState } from "pages/kanban/models/atoms"
import { ModalButton } from "components/feedback"
import { InternalButton } from "components/general"
import styles from "./ListHeaderOptions.module.scss"
import { t } from "i18next"
import ListDialogue from "./ListDialogue"


const ListHeaderOptions = ({ listId, tasks, index }: IList) => {
  const setList = useSetRecoilState(taskState)
  const { EditList, CreateList } = ListDialogue()
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
  const handleDelete = () => {
    if (
      window.confirm(
        `️Are you sure to remove board "${listId.slice(
          0,
          
        )}"?`
      )
    ) {
      setList((allTasks) => {
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
  const DeleteList = () => {
    
    return (
      <InternalButton className={styles.deletebutton} onClick={handleDelete}>
        {t("delete")}
    </InternalButton>
    )
  }
  return (
    <>
      <EditList />
       {bull}
      <DeleteList />
       {divide}
      <CreateList />
    </>
  )
}

export default ListHeaderOptions
