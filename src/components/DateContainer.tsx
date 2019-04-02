import React from 'react'
import injectSheet, { ClassNameMap } from 'react-jss'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const styles = {
  dateContainer: {
    display: 'flex',
    'justify-content': 'center',
  },
}

type Props = {
  value: Date
  handleChange: (newDate: Date) => void
  classes: ClassNameMap<keyof typeof styles>
}

const DateContainerComponent: React.FC<Props> = props => {
  const { classes } = props

  const onClickPrevDay = () => {
    const newDate = new Date(props.value)
    newDate.setDate(props.value.getDate() - 1)
    props.handleChange(newDate)
  }

  const onClickNextDay = () => {
    const newDate = new Date(props.value)
    newDate.setDate(props.value.getDate() + 1)
    props.handleChange(newDate)
  }

  return (
    <div className={classes.dateContainer}>
      <button onClick={onClickPrevDay}>{'<'}</button>
      <DatePicker
        selected={props.value}
        onChange={props.handleChange}
        withPortal
      />
      <button onClick={onClickNextDay}>{'>'}</button>
    </div>
  )
}

export const DateContainer = injectSheet(styles)(DateContainerComponent)
