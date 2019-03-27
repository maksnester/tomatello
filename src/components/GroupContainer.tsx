import React, { Component } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TaskGroup } from './TaskGroup'
import injectSheet, { ClassNameMap } from 'react-jss'
import {
  FakeDataProvider,
  GroupOfTasks,
  GroupsDictionary,
  Task,
} from './FakeDataProvider'

const fakeDataProvider = new FakeDataProvider()

const styles = {
  addGroup: {
    height: 100,
    backgroundColor: 'rgba(168, 255, 235, 0.43)',
  },
}

type Props = {
  classes: ClassNameMap<keyof typeof styles>
}

type State = {
  groups: GroupsDictionary
}

export class GroupContainerComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      groups: fakeDataProvider.getGroups(),
    }
  }

  onChangeTask = (groupId: string, taskId: string, newValue: string): void => {
    fakeDataProvider.updateTask(groupId, taskId, newValue)
    if (
      newValue &&
      !Object.values(this.state.groups[groupId].itemsById).some(
        task => !task.value
      )
    ) {
      fakeDataProvider.addTask(groupId)
    }

    this.setState(() => {
      return {
        groups: fakeDataProvider.getGroups(),
      }
    })
  }

  onChangeGroup = (groupId: string, newValue: GroupOfTasks): void => {
    fakeDataProvider.updateGroup(groupId, newValue)
    this.setState(() => {
      return {
        groups: fakeDataProvider.getGroups(),
      }
    })
  }

  onAddGroupClicked = () => {
    fakeDataProvider.addGroup(3)
    this.setState(() => {
      return {
        groups: fakeDataProvider.getGroups(),
      }
    })
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceGroup = this.state.groups[source.droppableId]
    const destinationGroup = this.state.groups[destination.droppableId]
    if (!sourceGroup) {
      console.warn('Can not find group with id', source.droppableId)
      return
    }
    if (!destinationGroup) {
      console.warn('Can not find group with id', destination.droppableId)
      return
    }

    const sourceTasks: Task[] = Object.values(sourceGroup.itemsById).sort(
      t => t.index
    )
    const destinationTasks: Task[] =
      sourceGroup === destinationGroup
        ? sourceTasks
        : Object.values(destinationGroup.itemsById).sort(t => t.index)

    const movedTask = sourceTasks[source.index]

    sourceTasks.splice(source.index, 1)
    destinationTasks.splice(destination.index, 0, movedTask)

    const convertArrayToCollection = (
      acc: { [id: string]: Task },
      task: Task,
      index: number
    ) => {
      acc[task.id] = {
        ...task,
        index,
      }
      return acc
    }

    this.onChangeGroup(destinationGroup.id, {
      ...destinationGroup,
      itemsById: destinationTasks.reduce(convertArrayToCollection, {}),
    })

    if (sourceGroup !== destinationGroup) {
      this.onChangeGroup(sourceGroup.id, {
        ...sourceGroup,
        itemsById: sourceTasks.reduce(convertArrayToCollection, {}),
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {Object.values(this.state.groups)
          .sort(group => group.index)
          .map(group => (
            <TaskGroup
              key={group.id}
              group={group}
              onChangeGroup={this.onChangeGroup}
              onChangeTask={this.onChangeTask}
            />
          ))}

        <div className={classes.addGroup} onClick={this.onAddGroupClicked} />
      </DragDropContext>
    )
  }
}

export const GroupContainer = injectSheet(styles)(GroupContainerComponent)
