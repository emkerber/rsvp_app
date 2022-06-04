import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

function RsvpDuties() {
  const dispatch = useDispatch();
  const dutiesIndicated = useSelector(store => store.guest.responses.duties_indicated);
  const dutiesResponses = useSelector(store => store.duties.dutyResponses);

  const [setupChecked, setSetupChecked] = useState(false);
  const [cleanupChecked, setCleanupChecked] = useState(false);
  const [hydrationChecked, setHydrationChecked] = useState(false);
  const [photographerChecked, setPhotographerChecked] = useState(false);
  const [nopeChecked, setNopeChecked] = useState(false);
  
  const handleSetupChange = (event) => {
    setSetupChecked(!setupChecked);
    dispatch({
      type: 'SET_RSVP_SETUP_DUTY',
      payload: event.target.checked
    });
  }

  const handleCleanupChange = (event) => {
    setCleanupChecked(!cleanupChecked);
    dispatch({
      type: 'SET_RSVP_CLEANUP_DUTY',
      payload: event.target.checked
    });
  }

  const handleHydrationChange = (event) => {
    setHydrationChecked(!hydrationChecked);
    dispatch({
      type: 'SET_RSVP_HYDRATION_DUTY',
      payload: event.target.checked
    });
  }

  const handlePhotographerChange = (event) => {
    setPhotographerChecked(!photographerChecked);
    dispatch({
      type: 'SET_RSVP_PHOTO_DUTY',
      payload: event.target.checked
    });
  }

  const handleNopeChange = (event) => {
    setNopeChecked(!nopeChecked);
    dispatch({
      type: 'SET_RSVP_NO_DUTY',
      payload: event.target.checked
    });
  }

  // make sure no values are unintentionally overwritten on page submit
  const setRsvpReducers = () => {
    if (dutiesIndicated) {
      
      dispatch({
        type: 'SET_RSVP_SETUP_DUTY',
        payload: dutiesResponses.setup
      });

      dispatch({
        type: 'SET_RSVP_CLEANUP_DUTY',
        payload: dutiesResponses.cleanup
      });

      dispatch({
        type: 'SET_RSVP_HYDRATION_DUTY',
        payload: dutiesResponses.hydration
      });

      dispatch({
        type: 'SET_RSVP_PHOTO_DUTY',
        payload: dutiesResponses.photography
      });

      dispatch({
        type: 'SET_RSVP_NO_DUTY',
        payload: dutiesResponses.none
      });

    }
  }

  // checkboxes on DOM will reflect values stored in db
  const prepareToRender = () => {
    if (dutiesIndicated) {
      setSetupChecked(dutiesResponses.setup);
      setCleanupChecked(dutiesResponses.cleanup);
      setHydrationChecked(dutiesResponses.hydration);
      setPhotographerChecked(dutiesResponses.photography);
      setNopeChecked(dutiesResponses.none);
    }
  }

  useEffect(() => {
    setRsvpReducers();
    prepareToRender();
  }, []);

  return (
    <FormControl>
      <FormGroup>
      
        <h2>Are you interested in signing up for any of these extra special duties?</h2>

        <FormControlLabel 
          label="Setup Squad"
          labelPlacement="end"
          control={
            <Checkbox 
              checked={setupChecked}
              onChange={handleSetupChange}
            />
          }
        />

        <FormControlLabel 
          label="Cleanup Crew"
          labelPlacement="end"
          control={
            <Checkbox 
              checked={cleanupChecked}
              onChange={handleCleanupChange}
            />
          }
        />

        <FormControlLabel 
          label="Hydration Helper"
          labelPlacement="end"
          control={
            <Checkbox 
              checked={hydrationChecked}
              onChange={handleHydrationChange}
            />
          }
        />

        <FormControlLabel 
          label="Photography Friend"
          labelPlacement="end"
          control={
            <Checkbox 
              checked={photographerChecked}
              onChange={handlePhotographerChange}
            />
          }
        />

        <FormControlLabel 
          label="No thanks"
          labelPlacement="end"
          checked={nopeChecked}
          control={
            <Checkbox 
              checked={nopeChecked}
              onChange={handleNopeChange}
            />
          }
        />

      </FormGroup>
    </FormControl>
  );
}

export default RsvpDuties;
