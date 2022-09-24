import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useBeforeunload } from 'react-beforeunload';

import { Login } from './components/Login';
import { VotePanel } from './components/VotePanel';
import { UserList } from './components/UserList';
import { postMessage } from './utils/postMessage';

export const App = () => {
  const [currentUser, setCurrentUser] = useState('Alex');
  const [allUsers, setAllUsers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTimeValue, setSelectedTimeValue] = useState('');

  useBeforeunload((event) => {
    event.preventDefault();
    postMessage({ user: currentUser }, 'exit');
  });

  useEffect(() => {
    const pusher = new Pusher('cbfddc48857c5bd9c9a2', {
      cluster: 'eu',
      encrypted: true,
    });

    const channel = pusher.subscribe('vote');

    channel.bind('results', (data) => {
      setShowResults(data);
    });

    channel.bind('user', (data) => {
      if (data.event === 'reset') {
        setSelectedTimeValue('');
      }
      setAllUsers([...allUsers, ...data.state]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!allUsers.find(({ name }) => name === currentUser)) {
      setCurrentUser('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers]);

  return (
    <div className='App'>
      {currentUser && <h1>Hello, {currentUser}</h1>}
      {currentUser ? (
        <div className='voting-view'>
          <VotePanel
            currentUser={currentUser}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            selectedTimeValue={selectedTimeValue}
            setSelectedTimeValue={setSelectedTimeValue}
          />
          <UserList allUsers={allUsers} showResults={showResults} currentUser={currentUser} />
        </div>
      ) : (
        <Login setCurrentUser={setCurrentUser} allUsers={allUsers} setAllUsers={setAllUsers} />
      )}
    </div>
  );
};
