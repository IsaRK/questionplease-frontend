import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { useStyles } from '../App';
import { RootState } from '../modules/reducer';
import { connect } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
    selectedQuestion : state.questionsState.SelectedQuestion
  });

const mapDispatchToProps = { };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const UnconnectedAnswerForm: React.FunctionComponent<Props> = ((props) => {

  function onsubmit(answer: string) {
    console.log("Form submitted with answer" + answer);
  }

  const styleClass = useStyles();

  if (props.selectedQuestion === null)
    {
      return <div/>
    }

  return (
    <Box className={styleClass.root}>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(values) => onsubmit(values.answer)}
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
});

export const AnswerForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(UnconnectedAnswerForm);