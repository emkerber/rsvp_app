import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';

function BouncerSearchForm() {

    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const handleSearchClick = () => {
      // TODO - dispatch to saga to GET by search term with searchTerm payload
    }

    return (
        <FormControl>

            <TextField 
                label="Search by first OR last name:"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
            />

            <Button onClick={handleSearchClick}>
                Look
            </Button>

        </FormControl>
    )
}

export default BouncerSearchForm;