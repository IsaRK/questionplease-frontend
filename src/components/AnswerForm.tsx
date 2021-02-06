import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { useStyles } from '../App';
import { RootState } from '../modules/reducer';
import { useDispatch, useSelector } from 'react-redux'
import { Question } from '../modules/questions';
import { validateAnswerAction } from '../modules/answerActions';
import { AnswerResult } from './AnswerResult';

export const AnswerForm: React.FunctionComponent = () => {

  const dispatch = useDispatch();
  const selectedQuestion: Question | null = useSelector((state: RootState) => state.questionsState.SelectedQuestion);
  const answerResult:Boolean | null = useSelector((state: RootState) => state.questionsState.AnswerResult);
  
  const dispatchValidation = (answer: string) => {
    dispatch(validateAnswerAction(answer));
  }

  const styleClass = useStyles();

  if (selectedQuestion === null)
    {
      return <div/>
    }

    if (answerResult !== null)
    {
      return <AnswerResult/>
    }

  return (
    <Box className={styleClass.root}>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(values) => dispatchValidation(values.answer)}
      >
        {({ values, handleChange, handleBlur }) =>
          <Form>
            <div>
              <TextField
                name="answer"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button type="submit">Submit</Button>
          </Form>}
      </Formik>

    </Box>
  )
};