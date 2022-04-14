import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// might not use these?

// function* fetchGuestList() {
//   try {
//     yield put({ type: 'EMPTY_GUEST_LIST' });
    
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };
    
//     const response = yield axios.get('/api/guestList', config);
  
//     yield put({ type: 'SET_GUEST_LIST', payload: response.data });
//   } catch (error) {
//     console.log('Get Guest List request failed:', error);
//   }
// }

// function* fetchPendingList() {
//   try {
//     yield put({ type: 'EMPTY_PENDING_LIST' });

//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };

//     const response = yield axios.get('/api/pendingList', config);

//     yield put({ type: 'SET_PENDING_LIST', payload: response.data });
//   } catch (error) {
//     console.log('Get Pending List request failed:', error);
//   }
// }

function* listsSaga() {
  // yield takeLatest('FETCH_GUEST_LIST', fetchGuestList);
  // yield takeLatest('FETCH_PENDING_LIST', fetchPendingList);
}

export default listsSaga;