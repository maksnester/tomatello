import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'
import { GroupOfTasks, Task } from './FakeDataProvider'

const styles = {
  taskGroup: {
    padding: 15,

    '& input': {
      width: '100%',
    },
  },

  groupTitle: {
    '& > input': {
      border: 'unset',
      borderBottom: '2px solid black',
      padding: '0 2px',
      height: 45,
      fontSize: 21,
      textAlign: 'center',
    },
  },
}

type Props = {
  classes: ClassNameMap<keyof typeof styles>
  className?: string
  group: GroupOfTasks
  onChangeGroup: (groupId: string, newValue: GroupOfTasks) => void
  onChangeTask: (groupId: string, taskId: string, newValue: string) => void
}

const TaskGroupComponent: React.FC<Props> = props => {
  const { group, className, classes } = props

  const onChangeGroupTitle = (newTitleValue: string) => {
    props.onChangeGroup(group.id, {
      ...group,
      title: newTitleValue,
    })
  }

  const onBlurTask = (task: Task) => {
    const trimmed = task.value.trim()
    if (trimmed !== task.value) {
      props.onChangeTask(group.id, task.id, task.value.trim())
    }
  }

  return (
    <div className={cn(className, classes.taskGroup)}>
      <div className={classes.groupTitle}>
        <input
          value={group.title}
          onChange={e => onChangeGroupTitle(e.target.value)}
        />
      </div>
      {Object.values(group.itemsById).map(task => (
        <React.Fragment key={task.id}>
          <input
            type="text"
            value={task.value}
            onChange={e =>
              props.onChangeTask(group.id, task.id, e.target.value)
            }
            onBlur={() => onBlurTask(task)}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
