import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BouncerGuestsNotHere() {

    const guestsNotHere = useSelector(store => store.attendance.guestsNotHere);

    const history = useHistory();

    const handlePersonClick = (person) => {
        // TODO - capture name clicked on and save to reducer
        // and history.push to BouncerViewGuest
    }

    return (
        <>
        
            <h2>Guests not yet here:</h2>

            {guestsNotHere.map((person, i) => (
                <p key={i} onClick={() => handlePersonClick(person)}>
                    {person.first_name} {person.last_name}
                </p>
            ))}
            
        </>
    )
}

export default BouncerGuestsNotHere;