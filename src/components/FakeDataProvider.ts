export type Task = {
  id: string
  index: number
  value: string
}

/**
 * @property id
 * @property title
 * @property index
 * @property createdAt - e.g. "Wed Apr 03 2019 15:37:55 GMT+0200"
 * @property itemsById
 */
export type GroupOfTasks = {
  id: string
  title: string
  index: number
  createdAt: string
  itemsById: { [id: string]: Task }
}

export type GroupsDictionary = {
  [groupId: string]: GroupOfTasks
}

export class FakeDataProvider {
  private static nextTaskId: number = 0
  private static nextGroupId: number = 0

  fakeData: GroupsDictionary = {}

  constructor() {
    const newGroup = this.createGroupOfTasks(5)
    this.fakeData = {
      [newGroup.id]: newGroup,
    }
    this.updateGroup = this.updateGroup.bind(this)
  }

  getGroups(): GroupsDictionary {
    return this.fakeData
  }

  addTask(groupId: string): void {
    const newTask = FakeDataProvider.createTaskItem({
      index: Object.values(this.fakeData[groupId].itemsById).length,
    })
    this.fakeData[groupId].itemsById[newTask.id] = newTask
  }

  addGroup(countOfTasks: number): void {
    const newGroup = this.createGroupOfTasks(countOfTasks)
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

  removeGroup(groupId: string) {
    delete this.fakeData[groupId]
  }

  private createGroupOfTasks(countOfTasks: number = 3): GroupOfTasks {
    const id = `groupId${FakeDataProvider.nextGroupId++}`
    return {
      id,
      index: Object.values(this.fakeData).length,
      title: '',
      createdAt: new Date().toString(),
      itemsById: Array.from(Array(countOfTasks)).reduce((acc, _, index) => {
        const id = `taskId${FakeDataProvider.nextTaskId++}`
        acc[id] = FakeDataProvider.createTaskItem({
          id,
          index,
        })
        return acc
      }, {}),
    }
  }

  private static createTaskItem(task: Partial<Task> = {}): Task {
    return {
      id: task.id || `taskId${FakeDataProvider.nextTaskId++}`,
      value: task.value || '',
      index: task.index || 0,
    }
  }
}
