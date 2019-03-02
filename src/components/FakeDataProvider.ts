export type Task = {
  id: string
  value: string
}

export type GroupOfTasks = {
  id: string
  title: string
  itemsById: { [id: string]: Task }
}

export type GroupsDictionary = {
  [id: string]: GroupOfTasks
}

export class FakeDataProvider {
  fakeData: GroupsDictionary

  constructor() {
    this.fakeData = {
      groupId1: FakeDataProvider.createGroupOfTasks('groupId1', 5),
      groupId2: FakeDataProvider.createGroupOfTasks('groupId2', 3),
    }
    this.updateGroup = this.updateGroup.bind(this)
  }

  getGroups(): GroupsDictionary {
    return this.fakeData
  }

  addTask(groupId: string): void {
    const newTask = FakeDataProvider.createTaskItem()
    this.fakeData[groupId].itemsById[newTask.id] = newTask
  }

  addGroup(): void {
    const newGroup = FakeDataProvider.createGroupOfTasks()
    this.fakeData[newGroup.id] = newGroup
  }

  updateGroup(groupId: string, newValue: GroupOfTasks): void {
    this.fakeData[groupId] = newValue
  }

  // updateTask(groupId: string, taskId: string, newValue: string): void {
  //   this.fakeData[groupId].itemsById[taskId] = {
  //     ...this.fakeData[groupId].itemsById[taskId],
  //     value: newValue,
  //   }
  // }

  private static createGroupOfTasks(
    id: string = `groupId${Math.random()}`,
    countOfTasks: number = 5
  ): GroupOfTasks {
    return {
      id,
      title: '',
      itemsById: Array.from(Array(countOfTasks)).reduce(acc => {
        const id = `taskId${Math.random().toString()}`
        acc[id] = FakeDataProvider.createTaskItem(id)
        return acc
      }, {}),
    }
  }

  private static createTaskItem(
    id: string = `taskId${Math.random()}`,
    value: string = ''
  ): Task {
    return {
      id,
      value,
    }
  }
}
