import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// determines the verbiage that renders on the Login view
// which varies by inviteStatus (guest, pending, nope, none)
function LoginText() {
  const [verbiageOne, setVerbiageOne] = useState('');
  const [verbiageTwo, setVerbiageTwo] = useState('');

  const inviteStatus = useSelector((store) => store.inviteStatus);
  const firstName = useSelector((store) => store.responses.first_name);

  const checkStatus = () => {
    switch (inviteStatus) {
      case 'guest':
        setVerbiageOne('OH!');
        setVerbiageTwo(`How lovely to see you here again, ${firstName}!`);
        break;
      case 'pending':
        setVerbiageOne('Hello again!');
        setVerbiageTwo('');
        break;
      case 'nope':
        setVerbiageOne('');
        setVerbiageTwo('Log in if you must.');
        break;
      case 'none':
          setVerbiageOne('Hello again!');
          setVerbiageTwo('');
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

export default LoginText;