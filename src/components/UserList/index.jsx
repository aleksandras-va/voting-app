import { postMessage } from '../../utils/postMessage';

import './index.css';
import { User } from './User';

export const UserList = ({ allUsers, showResults, currentUser }) => {
  const handleResultShow = () => {
    postMessage({}, 'show_results');
  };

  const handleReset = () => {
    postMessage({}, 'reset');
    postMessage({}, 'hide_results');
  };

  const handleUnload = (event) => {
    postMessage({ name: event.target.dataset.targetName }, 'unload');
  };

  const disabled = !allUsers.every(({ voted }) => voted) || showResults;

  return (
    <div className='box user-list'>
      <h2>User List ({allUsers.length})</h2>
      <ul>
        {allUsers.map(({ name, vote }, index) => (
          <User
            key={index}
            name={name}
            vote={vote}
            handleUnload={handleUnload}
            showResults={showResults}
            currentUser={currentUser}
          />
        ))}
      </ul>

      <button className='result-button' onClick={handleResultShow} disabled={disabled}>
        Show Results
      </button>

      <button className='reset-button' onClick={handleReset}>
        Reset Results
      </button>

      {/* <div className='statistics'>
        <h3>Statistics</h3>
        <p>Average: </p>
      </div> */}
    </div>
  );
};
