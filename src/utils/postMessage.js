export const postMessage = (payload, action) => {
  //https://temp-voting-app-api.herokuapp.com/pusher
  //http://localhost:4000/pusher
  try {
    fetch('https://temp-voting-app-api.herokuapp.com/pusher', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-event': action,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.log('Front: ', error);
  }
};
