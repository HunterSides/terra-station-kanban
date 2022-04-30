import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DraggableLocation,
  DropResult,
  Draggable,
} from "react-beautiful-dnd"
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil"
import { draggingAtomState, taskState } from "./models/atoms"
import { useEffect, useRef } from "react"
import { saveTasks } from "./models/localStorage"
import List from "./components/List/List"
import { Page, Row, Card } from "components/layout"
import React from "react"
import ListHeaderOptions from "./components/List/ListHeaderOptions"
import Header from "./components/Header"
const Wrapper = styled.div``
const Handle = styled.div``
const Lists = styled.div``
const DraggableList = styled.div``
const ListWrapper = Card

const KanbanBoard = () => {
  const [tasks, setTasks] = useRecoilState(taskState)
  const setDraggingAtomState = useSetRecoilState(draggingAtomState)
  const boardWidthRef = useRef<HTMLDivElement>(null)

  //const name = List.listId.slice(0, List.listId.length - 14);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const source: DraggableLocation = result.source
    const destination: DraggableLocation = result.destination

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (result.type === "Lists") {
      if (source.droppableId === destination?.droppableId) {
        // Move Lists
        setTasks((allTasks) => {
          let boardEntries = Object.entries(allTasks)
          const [sourceBoard] = boardEntries.splice(source.index, 1)
          boardEntries.splice(destination.index, 0, sourceBoard)

          return boardEntries.reduce(
            (modifiedLists, [listId, tasks]) => ({
              ...modifiedLists,
              [listId]: tasks,
            }),
            {}
          )
        })
      }
    } else {
      // Move Tasks
      if (source.droppableId === destination?.droppableId) {
        // Move a task in same board.
        setTasks((allTasks) => {
          let reOrderedTasks = [...allTasks[destination.droppableId]]
          const sourceTask = reOrderedTasks[source.index]
          reOrderedTasks.splice(source.index, 1)
          reOrderedTasks.splice(destination?.index, 0, sourceTask)
          return {
            ...allTasks,
            [destination?.droppableId]: reOrderedTasks,
          }
        })
      } else if (source?.droppableId !== destination?.droppableId) {
        // Move task to different board
        setTasks((allTasks) => {
          let modifiedSourceTasks = [...allTasks[source.droppableId]]
          let modifiedDestinationTasks = [...allTasks[destination?.droppableId]]
          const sourceTask = modifiedSourceTasks[source.index]
          modifiedSourceTasks.splice(source.index, 1)
          modifiedDestinationTasks.splice(destination?.index, 0, sourceTask)
          return {
            ...allTasks,
            [source.droppableId]: modifiedSourceTasks,
            [destination?.droppableId]: modifiedDestinationTasks,
          }
        })
      } else {
        return
      }
    }
  }
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  return (
    <Page title="Board Name" sub={true}>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={"Lists"}
          type={"Lists"}
          direction={"horizontal"}
        >
          {(provided: DroppableProvided) => (
            <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
              <Lists ref={boardWidthRef}>
                <Row>
                  {Object.keys(tasks).map((listId, index) => (
                    <>
                      <Draggable draggableId={listId} index={index}>
                        {(provided) => (
                          <DraggableList
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Handle
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            >
                              <ListWrapper
                                title={listId}
                                extra={
                                  <ListHeaderOptions
                                    listId={listId}
                                    tasks={tasks[listId]}
                                    index={index}
                                  />
                                }
                                children={
                                  <List
                                    key={listId}
                                    index={index}
                                    listId={listId}
                                    tasks={tasks[listId]}
                                  />
                                }
                              />
                            </Handle>
                          </DraggableList>
                        )}
                      </Draggable>
                    </>
                  ))}
                </Row>
              </Lists>
              {provided.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    </Page>
  )
}

export default React.memo(KanbanBoard)
