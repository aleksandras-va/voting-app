import { useState } from 'react';

import { postMessage } from '../utils/postMessage';

export const Login = ({ setCurrentUser }) => {
  const [usernameField, setUsernameField] = useState('Test');

  const handleUserSet = () => {
    if (usernameField) {
      const name = usernameField[0].toUpperCase() + usernameField.substring(1);
      setCurrentUser(name);
      setUsernameField('');

      postMessage({ name }, 'loggedIn');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserSet();
    }
  };

  return (
    <div className='login'>
      <div className='wrapper'>
        <h2>Hello, please login.</h2>
        <input
          onKeyDown={handleKeyPress}
          value={usernameField}
          onChange={(event) => setUsernameField(event.target.value)}
        />
        <button onClick={handleUserSet}>Submit</button>
      </div>
    </div>
  );
};
