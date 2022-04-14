/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { useFormik } from 'formik';
import FeedBackButton from './FeedbackButton/FeedbackButton';
import FeedbackForm from './FeedbackForm/FeedbackForm';

const isEmpty = (str) => !str.trim().length;

const handleCustomPosition = (position, formStyles) => {
  let customFormStyles;
  if (position === 'left') {
    customFormStyles = { ...formStyles, left: '5%' };
  } else {
    customFormStyles = { ...formStyles, right: '5%' };
  }
  return customFormStyles;
};

const questions = [
  {
    id: 1,
    display: 'I like something',
    title: 'What did you like?',
  },
  {
    id: 2,
    display: 'I have an idea',
    title: 'What is your suggestion?',
  },
  {
    id: 3,
    display: "Something's not working",
    title: 'What did you find?',
  },
];

const Feedback = (props) => {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selQuestion, setSelQuestion] = useState(undefined);
  // const [ansQuestion, setAnsQuestion] = useState(0);

  const initialState = {
    value: '',
    email: '',
  };

  const {
    headerText,
    buttonText,
    position,
    buttonStyles,
    headerStyles,
    headerBtnStyles,
    headerBtnText,
    bodyText,
    style,
    handleClose,
    handleButtonClick,
    handleSubmit,
  } = props;

  const submithandler = (values) => {
    console.log(values);
    if (isEmpty(values.value) || isEmpty(values.email)) {
      alert('Fields are missing!');
    } else {
      handleSubmit({
        name: values.value,
        email: values.email,
      });
      setSelQuestion(undefined);
      feedbackFromik.resetForm();
      handleClose();
      setShowForm(false);
      setShowButton(true);
    }
  };

  const feedbackFromik = useFormik({
    initialValues: initialState,
    onSubmit: submithandler,
  });

  // const handleMessageInput = (inputName, content) => {
  //   if (inputName === 'email') {
  //     setEmailInput(content);
  //   } else if (inputName === 'name') {
  //     setNameInput(content);
  //   } else if (inputName === 'message') {
  //     setMessageInput(content);
  //   }
  // };
  // const handleNameInput = (name) => {
  //   setNameInput(name);
  // };
  // const handleEmailInput = (email) => {
  //   setEmailInput(email);
  // };
  const buttonClickHandler = () => {
    setShowButton(false);
    setShowForm(true);
    handleButtonClick();
  };
  const nextHandler = () => {
    if (!selQuestion) {
      setSelQuestion(questions[0]);
    }
  };

  const changeQuestion = (value) => {
    setSelQuestion(questions[value]);
  };

  const closeHandler = () => {
    setShowButton(true);
    setSelQuestion(undefined);
    feedbackFromik.resetForm();
    setShowForm(false);
    handleClose();
  };

  return (
    <Box>
      {showForm && (
        <Box>
          <FeedbackForm
            style={style}
            headerText={headerText}
            position={position}
            headerStyles={headerStyles}
            headerBtnStyles={headerBtnStyles}
            headerBtnText={headerBtnText}
            handleClose={closeHandler}
            bodyText={bodyText}
            feedbackFromik={feedbackFromik}
            selQuestion={selQuestion}
            handleCustomPosition={handleCustomPosition}
            changeQuestion={changeQuestion}
            nextHandler={nextHandler}
            questions={questions}
          />
        </Box>
      )}
      {showButton && (
        <FeedBackButton
          position={position}
          styles={buttonStyles}
          text={buttonText}
          handleButtonClick={buttonClickHandler}
          handleCustomPosition={handleCustomPosition}
        />
      )}
    </Box>
  );
};

Feedback.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  position: PropTypes.string,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleButtonClick: PropTypes.func,
  buttonStyles: PropTypes.object,
  headerStyles: PropTypes.object,
  headerBtnStyles: PropTypes.object,
  buttonText: PropTypes.string,
  headerBtnText: PropTypes.string,
};

Feedback.defaultProps = {
  position: 'right',
  handleSubmit: () => {},
  handleClose: () => {},
  handleButtonClick: () => {},
};

export default Feedback;
