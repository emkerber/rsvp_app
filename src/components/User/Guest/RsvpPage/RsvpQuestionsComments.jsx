import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function QuestionsComments() {
  const dispatch = useDispatch();
  const questionsCommentsResponse = useSelector(store => store.guest.responses.questions_comments);
  
  const [questionsCommentsTemp, setQuestionsCommentsTemp] = useState('');

  const handleQuestionsCommentsChange = (value) => {
    setQuestionsCommentsTemp(value);

    dispatch({
      type: 'SET_RSVP_QUESTIONS_COMMENTS',
      payload: value
    })
  }

  const setRsvpReducer = () => {
    questionsCommentsResponse &&
      dispatch({
        type: 'SET_RSVP_QUESTIONS_COMMENTS',
        payload: questionsCommentsResponse
      });
  }

  const prepareToRender = () => {
    questionsCommentsResponse &&
      setQuestionsCommentsTemp(questionsCommentsResponse);
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);

  return (
    <FormControl>

      <h2>Questions / comments / concerns / compliments?</h2>

      <TextField
        className="rsvp-input"
        id="multiline-questions-comments"
        multiline
        rows={4}
        value={questionsCommentsTemp}
        onChange={(event) => handleQuestionsCommentsChange(event.target.value)}
      >
      </TextField>

    </FormControl>
  );
}

export default QuestionsComments;