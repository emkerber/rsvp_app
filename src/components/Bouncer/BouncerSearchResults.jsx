import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function BouncerSearchResults() {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleDoneClick = () => {
        // TODO - dispatch to clear search result reducer
    }

    const handleAddNewClick = () => {
        // TODO - history.push to BouncerAddNewGuest
    }

    return (
        <>

            <h2>Results:</h2>

            <ul>
                {/* TODO - loop over reducer array */}
            </ul>

            <Button onClick={handleDoneClick}>
                Done
            </Button>

            <Button onClick={handleAddNewClick}>
                Add New
            </Button>

        </>
    )
}

export default BouncerSearchResults;