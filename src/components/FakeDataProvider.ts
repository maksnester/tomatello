export interface Task {
  id: string
  value: string
}

export interface GroupOfTasks {
  id: string
  itemsById: { [id: string]: Task }
}

export interface GroupsDictionary {
  [id: string]: GroupOfTasks
}

export class FakeDataProvider {
  fakeData: GroupsDictionary

  constructor() {
    this.fakeData = {
      groupId1: this.createGroupOfTasks('groupId1', 5),
      groupId2: this.createGroupOfTasks('groupId2', 3),
    }
  }

  getGroups(): GroupsDictionary {
    return this.fakeData
  }

  updateTask(groupId: string, taskId: string, newValue: string): void {
    this.fakeData[groupId].itemsById[taskId] = {
      ...this.fakeData[groupId].itemsById[taskId],
      value: newValue,
    }
  }

  private createGroupOfTasks(
    id = `groupId${Math.random()}`,
    countOfTasks: number
  ): GroupOfTasks {
    return {
      id,
      itemsById: new Array(countOfTasks).reduce(acc => {
        const id = `taskId${Math.random().toString()}`
        acc[id] = this.createTaskItem(id)
        return acc
      }, {}),
    }
  }

  private createTaskItem(id = `taskId${Math.random()}`, value = ''): Task {
    return {
      id,
      value,
    }
  }
}
