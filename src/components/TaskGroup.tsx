import React, { ChangeEvent, useState } from 'react'

export function TaskGroup() {
  const [tasks, setTasks] = useState(["", "", "", "", ""]);

  function onChangeTask(index: number) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setTasks(
        tasks.map((item, i) => {
          if (index === i) {
            return event.target.value;
          } else {
            return item;
          }
        })
      )
    }
  }

  return (
    <div>
      {tasks.map((task, i) => (
        <React.Fragment key={i}>
          <input
            type="text"
            value={task}
            onChange={onChangeTask(i)}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
