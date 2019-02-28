import React, { Component } from 'react'
import { TaskGroup } from './TaskGroup'
import injectSheet, { ClassNameMap } from 'react-jss'
import { FakeDataProvider, GroupsDictionary } from './FakeDataProvider'

const fakeDataProvider = new FakeDataProvider()

const styles = {
  addGroup: {
    height: 100,
    backgroundColor: 'rgba(168, 255, 235, 0.43)',
  },
}

interface Props {
  classes: ClassNameMap<keyof typeof styles>
}

interface State {
  groups: GroupsDictionary
}

export class GroupContainerComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      groups: fakeDataProvider.getGroups(),
    }
  }

  onAddGroupClicked = () => {
    // add group ...
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {Object.values(this.state.groups).map((group, id) => (
          <TaskGroup key={id} group={group} />
        ))}

        <div className={classes.addGroup} />
      </div>
    )
  }
}

export const GroupContainer = injectSheet(styles)(GroupContainerComponent)
