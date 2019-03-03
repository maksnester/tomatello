import React, { Component } from 'react'
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

  onChangeGroup = (groupId: string, newValue: GroupOfTasks): void => {
    fakeDataProvider.updateGroup(groupId, newValue)
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

  onAddGroupClicked = () => {
    fakeDataProvider.addGroup(3)
    this.setState(() => {
      return {
        groups: fakeDataProvider.getGroups(),
      }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {Object.values(this.state.groups).map((group, id) => (
          <TaskGroup
            key={id}
            group={group}
            onChangeGroup={this.onChangeGroup}
          />
        ))}

        <div className={classes.addGroup} onClick={this.onAddGroupClicked} />
      </div>
    )
  }
}

export const GroupContainer = injectSheet(styles)(GroupContainerComponent)
