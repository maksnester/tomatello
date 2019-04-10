import React, { Component } from 'react'
import { GroupContainer } from './GroupContainer'
import { Timer } from './Timer'

class App extends Component {
  render() {
    return (
      <div>
        <Timer />
        <GroupContainer />
      </div>
    )
  }
}

export default App
