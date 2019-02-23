import React, { useState } from "react";

export function TaskGroup() {
  const [tasks, setTasks] = useState(["", "", "", "", ""]);

  function updateTask(newValue: string, index: number) {
    const newTasks = tasks.map((item, i) => {
      if (index === i) {
        return newValue;
      } else {
        return item;
      }
    });
    if (index === newTasks.length - 1 && newTasks[index]) {
      newTasks.push("");
    }
    setTasks(newTasks);
  }

  return (
    <div>
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
  );
}
