export const User = ({ name, vote, showResults, currentUser, handleUnload }) => {
  const readyClassName = vote ? 'user ready' : 'user';

  return (
    <li>
      <div className={readyClassName}>
        <div className='user__info'>
          <div className='name'>{name}</div>
          {showResults && <div className='vote'>{vote}</div>}
        </div>

        {name !== currentUser && (
          <button class='user__remove' data-target-name={name} onClick={handleUnload}>
            🗑
          </button>
        )}
      </div>
    </li>
  );
};
