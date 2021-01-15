import React from 'react';
import Box from '@material-ui/core/Box';
import './App.css';
import { QuestionComputer } from './components/QuestionComputer';
import { AnswerForm } from './components/AnswerForm';
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const App: React.FC = () => {
  return (
    <StyledBox>
        <QuestionComputer/>
        <AnswerForm/>
      </StyledBox>
  )
}

export const StyledBox: React.FunctionComponent = ((props) => {

  const styleClass = useStyles();

  return (
    <Box className={styleClass.root}>
      {props.children}
    </Box>
  )
})