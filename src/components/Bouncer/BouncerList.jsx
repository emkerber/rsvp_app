import BouncerSearchForm from './BouncerSearchForm';
import BouncerSearchResults from './BouncerSearchResults';
import BouncerGuestsNotHere from './BouncerGuestsNotHere';
import BouncerGuestsHere from './BouncerGuestsHere';

function BouncerList() {

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