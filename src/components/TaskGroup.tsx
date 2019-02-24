import React, { useState } from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'

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

interface TaskGroupProps {
  classes: ClassNameMap<keyof typeof styles>
  className?: string
}

const TaskGroupComponent: React.FC<TaskGroupProps> = props => {
  const [tasks, setTasks] = useState(['', '', '', '', ''])
  const [groupTitle, setGroupTitle] = useState('')

  function updateTask(newValue: string, index: number) {
    const newTasks = tasks.map((item, i) => {
      if (index === i) {
        return newValue
      } else {
        return item
      }
    })
    if (index === newTasks.length - 1 && newTasks[index]) {
      newTasks.push('')
    }
    setTasks(newTasks)
  }

  return (
    <div className={cn(props.className, props.classes.taskGroup)}>
      <div className={props.classes.groupTitle}>
        <input
          value={groupTitle}
          onChange={e => setGroupTitle(e.target.value)}
        />
      </div>
      {tasks.map((task, i) => (
        <React.Fragment key={i}>
          <input
            type="text"
            value={task}
            onChange={e => updateTask(e.target.value, i)}
            onBlur={() => updateTask(tasks[i].trim(), i)}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
