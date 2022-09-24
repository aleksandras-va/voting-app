import { postMessage } from '../../utils/postMessage';

export const Button = ({ value, currentUser, selectedTimeValue, setSelectedTimeValue }) => {
  const handleClick = () => {
    postMessage({ currentUser, currentVote: value }, 'voted');
    setSelectedTimeValue(value);
  };

  return (
    <button
      className={selectedTimeValue === value ? 'voted' : ''}
      onClick={handleClick}
      data-value={value}
    >
      <span className='value'>{value}</span>
      <span className='time'>~{value * 4}h ⏱</span>
    </button>
  );
};
