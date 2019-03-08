const SORT_KEY_STEP = 1000

export type Task = {
  id: string
  sortKey: number
  value: string
}

export type GroupOfTasks = {
  id: string
  title: string
  sortKey: number
  itemsById: { [id: string]: Task }
}

export type GroupsDictionary = {
  [id: string]: GroupOfTasks
}

export class FakeDataProvider {
  private static nextId: number = 0

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
    const lastSortKey = Math.max(
      ...Object.values(this.fakeData[groupId].itemsById).map(
        task => task.sortKey
      )
    )
    const newTask = FakeDataProvider.createTaskItem({
      sortKey: lastSortKey + SORT_KEY_STEP,
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

  private createGroupOfTasks(countOfTasks: number = 3): GroupOfTasks {
    const id = `groupId${FakeDataProvider.nextId++}`
    return {
      id,
      sortKey:
        Math.max(
          ...Object.values(this.fakeData).map(group => group.sortKey),
          0
        ) + SORT_KEY_STEP,
      title: '',
      itemsById: Array.from(Array(countOfTasks)).reduce((acc, _, index) => {
        const id = `taskId${FakeDataProvider.nextId++}`
        acc[id] = FakeDataProvider.createTaskItem({
          id,
          value: '',
          sortKey: index * SORT_KEY_STEP,
        })
        return acc
      }, {}),
    }
  }

  private static createTaskItem(task: Partial<Task> = {}): Task {
    return {
      id: task.id || `taskId${FakeDataProvider.nextId++}`,
      value: task.value || '',
      sortKey: task.sortKey || 0,
    }
  }
}
