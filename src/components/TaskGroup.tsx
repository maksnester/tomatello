import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'
import { ReactComponent as IconMove } from '../assets/move.svg'

import { GroupOfTasks, Task } from './FakeDataProvider'

const defaultInputStyles = {
  '&::placeholder': {
    color: 'lightgray',
  },
  outline: 'none',
  border: 'none',
}

const styles = {
  taskGroup: {
    padding: 15,
  },

  groupTitle: {
    ...defaultInputStyles,
    borderBottom: '1px solid #dadada',
    display: 'flex',
    fontSize: 21,
    margin: '0 auto 10px',
    textAlign: 'center',
  },

  taskContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  taskWrapper: {
    borderBottom: '1px solid gray',
    marginBottom: 10,
    padding: '0 10px',
    display: 'flex',

    '& svg': {
      display: 'block',
      height: '32px',
      width: '32px',
      fill: '#e8e8e8',
      '&:hover': {
        fill: '#959595',
      },
    },
  },

  task: {
    ...defaultInputStyles,
    display: 'block',
    width: '100%',
    padding: '10px 0',
    fontSize: 18,
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

  const getPlaceholderByIndex = (index: number): string => {
    switch (index) {
      case 1:
        return 'Click tomato to start work'
      case 2:
        return 'Accept once time has passed'
      case 3:
        return 'Take a rest'
      case 4:
        return 'Start another task'
      case 5:
        return 'Stay focused'
      case 10:
        return 'Wow, good plans!'
      case 11:
        return " Perhaps it's time to create a new group?"
      default:
        return 'Enter some task description...'
    }
  }

  return (
    <div className={cn(className, classes.taskGroup)}>
      <input
        placeholder="Group title"
        className={classes.groupTitle}
        value={group.title}
        onChange={e => onChangeGroupTitle(e.target.value)}
      />
      <label className={classes.taskContainer}>
        {Object.values(group.itemsById).map((task, i) => (
          <div key={task.id} className={classes.taskWrapper}>
            <input
              className={classes.task}
              value={task.value}
              type="text"
              placeholder={getPlaceholderByIndex(i)}
              onChange={e =>
                props.onChangeTask(group.id, task.id, e.target.value)
              }
              onBlur={() => onBlurTask(task)}
            />
            <IconMove />
          </div>
        ))}
      </label>
    </div>
  )
}

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
