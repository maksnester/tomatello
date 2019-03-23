import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'

import { GroupOfTasks } from './FakeDataProvider'
import { Droppable } from 'react-beautiful-dnd'
import { TaskList } from './TaskList'

const styles = {
  taskGroup: {
    padding: 15,
  },

  groupTitle: {
    '&::placeholder': {
      color: 'lightgray',
    },
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #dadada',
    display: 'flex',
    fontSize: 21,
    margin: '0 auto 10px',
    textAlign: 'center',
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

  return (
    <div className={cn(className, classes.taskGroup)}>
      <input
        placeholder="Group title"
        className={classes.groupTitle}
        value={group.title}
        onChange={e => onChangeGroupTitle(e.target.value)}
      />
      <Droppable droppableId={group.id}>
        {provided => (
          <TaskList
            _ref={provided.innerRef}
            {...provided.droppableProps}
            group={group}
            onChangeTask={props.onChangeTask}
          />
        )}
      </Droppable>
    </div>
  )
}

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
