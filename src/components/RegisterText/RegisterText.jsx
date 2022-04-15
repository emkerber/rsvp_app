import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// determines the verbiage that renders on the Register view
// which varies by inviteStatus (guest, nope, none)
// (inviteStatus will never be pending here)
function RegisterText() {
  const [verbiageOne, setVerbiageOne] = useState('');
  const [verbiageTwo, setVerbiageTwo] = useState('');

  const inviteStatus = useSelector((store) => store.inviteStatus);

  const checkStatus = () => {
    switch (inviteStatus) {
      case 'guest':
        setVerbiageOne('Hey there, rockstar!');
        setVerbiageTwo('You\'re on the list! Please register.');
        break;
      case 'nope':
        setVerbiageOne('Please register.');
        setVerbiageTwo('');
        break;
      case 'none':
        setVerbiageOne('Well hello there!');
        setVerbiageTwo('Please register.');
        break;
      default:
        console.log('st0p try!ng 2 h@ck m3 plz');
    }
  }

  useEffect(() => {
    checkStatus();
  }, [inviteStatus]);

  return (
    <div>
      <h1>{verbiageOne}</h1>
      <h2>{verbiageTwo}</h2>
    </div>
  );
}

export default RegisterText;