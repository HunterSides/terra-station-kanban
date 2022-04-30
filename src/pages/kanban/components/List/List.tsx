/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import { draggingAtomState, IList } from "../../models/atoms"

import Task from "../Task/Task"

const Wrapper = styled.div<{ isDragging: boolean }>``
const Handle = styled.div``
const DraggingArea = styled.div<{ isDraggingOver: boolean }>``

const List = ({ listId, tasks, index }: IList) => {
  const [isDragging, setIsDragging] = useState(false)
  const [draggingAtom, setDraggingAtom] = useRecoilState(draggingAtomState)
  useEffect(() => {
    setDraggingAtom(isDragging)
  }, [isDragging, draggingAtom])

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <Wrapper
          isDragging={isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Droppable droppableId={listId}>
            {(provided, snapshot) => (
              <DraggingArea
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    index={index}
                    text={task.name}
                    description={task.description}
                    task={tasks}
                  />
                ))}

                {provided.placeholder}
              </DraggingArea>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  )
}

export default React.memo(List)
