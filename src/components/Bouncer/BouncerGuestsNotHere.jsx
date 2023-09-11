import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BouncerGuestsNotHere() {

    const history = useHistory();

    const handleNameClick = () => {
        // TODO - capture name clicked on and save to reducer (?)
        // and history.push to BouncerCheckInGuest
    }

    return (
        <>
        
            <h2>Guests not yet here:</h2>

            <ul>
                {/* TODO - render reducer array */}
            </ul>
            
        </>
    )
}

export default BouncerGuestsNotHere;