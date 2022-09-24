import { Button } from './Button';
import { SP_VALUES } from '../../constants';

import './index.css';

export const VotePanel = ({ currentUser, selectedTimeValue, setSelectedTimeValue }) => {
  return (
    <div className='box options'>
      <h2>Vote</h2>
      <div className='options__buttons'>
        {SP_VALUES.map((value, index) => (
          <Button
            key={index}
            currentUser={currentUser}
            selectedTimeValue={selectedTimeValue}
            setSelectedTimeValue={setSelectedTimeValue}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};
