import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import { ReactComponent as IconTimer } from '../assets/pomodoro-timer.svg'

const styles = {
  timerContainer: {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    height: 100,
    border: '1px solid black',
  },
  icon: {
    height: 64,
    width: 64,
  },
  text: {
    marginLeft: 40,
  },
}

type Props = {
  classes: ClassNameMap<keyof typeof styles>
}

const TimerComponent: React.FC<Props> = props => {
  const { classes } = props

  return (
    <div className={classes.timerContainer}>
      <IconTimer className={classes.icon} />
      <div className={classes.text}>Click me</div>
    </div>
  )
}

export const Timer = injectSheet(styles)(TimerComponent)
