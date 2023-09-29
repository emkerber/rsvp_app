import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - FOR BOUNCERS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// GET guests not checked in
function* fetchGuestsNotHere(action) {
    try {
        const guestsNotHere = yield axios.get('/api/attendance/not-here');

        yield put({ type: 'SET_ATT_GUESTS_NOT_HERE', payload: guestsNotHere.data });
    
    } catch (error) {
        console.log('Error fetching guests not here:', error);
    }
}

// TODO - GET guests checked in

// TODO - GET by search by first name

// TODO - POST into attendance when guest is checked in

// TODO - DELETE from attendance to un-check-in guest

// TODO - PUT attendance notes

// TODO - POST into attendance for new person not in guests table

// called on logout to empty attendance reducers
function* unsetBouncerData(action) {
    try {
        yield put({ type: 'UNSET_ATT_GUESTS_NOT_HERE' });
    
    } catch (error) {
        console.log('Error unsetting bouncer data:', error);
    }
}

function* attendanceSaga() {
    // bouncers:
    yield takeLatest('FETCH_ATT_GUESTS_NOT_HERE', fetchGuestsNotHere);

    yield takeLatest('UNSET_BOUNCER_DATA', unsetBouncerData);
}

export default attendanceSaga;