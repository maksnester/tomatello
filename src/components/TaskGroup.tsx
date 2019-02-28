import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import cn from 'classnames'
import { GroupOfTasks } from './FakeDataProvider'

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

interface Props {
  classes: ClassNameMap<keyof typeof styles>
  className?: string
  group: GroupOfTasks
}

const TaskGroupComponent: React.FC<Props> = props => {
  return (
    <div className={cn(props.className, props.classes.taskGroup)}>
      <p>TaskGroupComponent is under refactoring</p>
    </div>
  )
}

/*

<p>TaskGroupComponent is under refactoring</p>
      <div className={props.classes.groupTitle}>
        <input
          value={groupTitle}
          onChange={e => setGroupTitle(e.target.value)}
        />
      </div>
      {tasks.items.map((task, i) => (
        <React.Fragment key={i}>
          <input
            type="text"
            value={task}
            onChange={e => updateTask(e.target.value, i)}
            onBlur={() => updateTask(tasks.items[i].trim(), i)}
          />
          <br />
        </React.Fragment>
      ))}

 */

export const TaskGroup = injectSheet(styles)(TaskGroupComponent)
