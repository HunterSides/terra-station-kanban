/* eslint-disable react-hooks/exhaustive-deps */
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { draggingAtomState, taskState } from "../../models/atoms"
import { ITask } from "../../models/atoms"
import styles from "./Task.module.scss"
import TaskOptions from "./TaskOptions"
import { Col, Row } from "components/layout"
import { ExtraActions } from "components/layout"
const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 274px;
  padding: 10px 22px 10px 22px;
  border-radius: 5px;
  align-items: center;
`
const Text = styled.div``
interface IIndexedTask {
  task: ITask[]
  id: string
  index: number
  text: string
  description: string
}

const Task = ({ id, index, text, description, task }: IIndexedTask) => {
  const [isDragging, setIsDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(text)

  const [draggingAtom, setDraggingAtom] = useRecoilState(draggingAtomState)
  const setTasks = useSetRecoilState(taskState)

  useEffect(() => {
    setDraggingAtom(isDragging)
  }, [isDragging, draggingAtom])

  return (
    <Draggable draggableId={id + ""} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        setIsDragging(isDragging)

        return (
          <Wrapper
            className={styles.task}
            isDragging={isDragging}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
          >
            <Col>
              <Row>
                <Text className={styles.name}>{text}</Text>
                <ExtraActions
                  children={
                    <TaskOptions listId={id} tasks={task} index={index} />
                  }
                />
              </Row>
              <Text className={styles.description}>{description}</Text>
            </Col>
          </Wrapper>
        )
      }}
    </Draggable>
  )
}

export default React.memo(Task)
