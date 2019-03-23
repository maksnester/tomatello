import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskGroup } from './TaskGroup'
import injectSheet, { ClassNameMap } from 'react-jss'
import {
  FakeDataProvider,
  GroupOfTasks,
  GroupsDictionary,
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

  onDragEnd = () => {
    console.log('dragend')
  }

  render() {
    const { classes } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {Object.values(this.state.groups).map(group => (
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
