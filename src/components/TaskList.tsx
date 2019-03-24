import { ClassNameMap } from 'react-jss'
import { GroupOfTasks, Task } from './FakeDataProvider'
import { ReactComponent as IconMove } from '../assets/move.svg'
import React from 'react'
import injectSheet from 'react-jss'
import { Draggable } from 'react-beautiful-dnd'

const styles = {
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

  taskLabel: {
    border: '1px solid transparent',
    width: '100%',
    padding: '10px 0',
  },

  task: {
    '&::placeholder': {
      color: 'lightgray',
    },
    outline: 'none',
    border: 'none',
    display: 'block',
    width: '100%',
    fontSize: 18,
  },
}

type Props = {
  // eslint-disable-next-line
  _ref: any // have to add custom _ref because of jss
  classes: ClassNameMap<keyof typeof styles>
  group: GroupOfTasks
  onChangeTask: (groupId: string, taskId: string, newValue: string) => void
}

const TaskListComponent: React.FC<Props> = ({
  classes,
  group,
  onChangeTask,
  _ref,
}) => {
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

  const onBlurTask = (task: Task) => {
    const trimmed = task.value.trim()
    if (trimmed !== task.value) {
      onChangeTask(group.id, task.id, task.value.trim())
    }
  }

  return (
    <div className={classes.taskContainer} ref={_ref}>
      {Object.values(group.itemsById).map((task, i) => (
        <Draggable draggableId={task.id} index={task.sortKey} key={task.id}>
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={classes.taskWrapper}
            >
              <label className={classes.taskLabel}>
                <input
                  className={classes.task}
                  value={task.value}
                  type="text"
                  placeholder={getPlaceholderByIndex(i)}
                  onChange={e =>
                    onChangeTask(group.id, task.id, e.target.value)
                  }
                  onBlur={() => onBlurTask(task)}
                />
              </label>
              <IconMove />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )
}

export const TaskList = injectSheet(styles)(TaskListComponent)