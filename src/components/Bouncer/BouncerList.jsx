import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BouncerSearchForm from './BouncerSearchForm';
import BouncerSearchResults from './BouncerSearchResults';
import BouncerGuestsNotHere from './BouncerGuestsNotHere';
import BouncerGuestsHere from './BouncerGuestsHere';

function BouncerList() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ATT_GUESTS_NOT_HERE' });
  }, []);
  

  return (
    <>
      <h1>Bouncin'</h1>

      <BouncerSearchForm />
      <BouncerSearchResults />

      <BouncerGuestsNotHere />
      <BouncerGuestsHere />

    </>
  )
}

export default BouncerList;