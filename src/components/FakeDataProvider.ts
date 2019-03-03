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
  private static nextId: number = 0

  fakeData: GroupsDictionary

  constructor() {
    const newGroup = FakeDataProvider.createGroupOfTasks(5)
    this.fakeData = {
      [newGroup.id]: newGroup,
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

  addGroup(countOfTasks: number): void {
    const newGroup = FakeDataProvider.createGroupOfTasks(countOfTasks)
    this.fakeData[newGroup.id] = newGroup
  }

  updateGroup(groupId: string, newValue: GroupOfTasks): void {
    this.fakeData[groupId] = newValue
  }

  updateTask(groupId: string, taskId: string, newValue: string): void {
    this.fakeData[groupId].itemsById[taskId] = {
      ...this.fakeData[groupId].itemsById[taskId],
      value: newValue,
    }
  }

  private static createGroupOfTasks(countOfTasks: number = 3): GroupOfTasks {
    const id = `groupId${FakeDataProvider.nextId++}`
    return {
      id,
      title: '',
      itemsById: Array.from(Array(countOfTasks)).reduce(acc => {
        const id = `taskId${FakeDataProvider.nextId++}`
        acc[id] = FakeDataProvider.createTaskItem(id)
        return acc
      }, {}),
    }
  }

  private static createTaskItem(
    id: string = `taskId${FakeDataProvider.nextId++}`,
    value: string = ''
  ): Task {
    return {
      id,
      value,
    }
  }
}
