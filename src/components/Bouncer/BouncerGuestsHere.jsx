import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BouncerGuestsHere() {

    const history = useHistory();

    const handleNameClick = () => {
        // TODO - capture name clicked on and save to reducer (?)
        // and history.push to BouncerViewGuest
    }

    return (
        <>
        
            <h2>Guests here:</h2>

            <ul>
                {/* TODO - render reducer array */}
            </ul>
            
        </>
    )
}

export default BouncerGuestsHere;