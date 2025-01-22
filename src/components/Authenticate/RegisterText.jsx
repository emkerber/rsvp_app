import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// determines the verbiage that renders on the Register view
// which varies by inviteStatus (guest, nope, none)
// (inviteStatus will never be pending here)
function RegisterText() {
  const [verbiageOne, setVerbiageOne] = useState('');
  const [verbiageTwo, setVerbiageTwo] = useState('');

  const inviteStatus = useSelector((store) => store.invite.inviteStatus);
  const firstName = useSelector((store) => store.visit.name.firstName);

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
        setVerbiageOne(`Well hey there, ${firstName}!`);
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
      <p id="communications-p">This email address will be used for communications.</p>
    </div>
  );
}

export default RegisterText;