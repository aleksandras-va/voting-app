const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: '1479863',
  key: 'cbfddc48857c5bd9c9a2',
  secret: 'd327171471c162e6e649',
  cluster: 'eu',
  encrypted: true,
});

let users = [];

app.post('/pusher', (request, response) => {
  const payload = request.body;
  const event = request.headers['x-event'];

  if (event === 'loggedIn') {
    users.push({ name: payload.name });
  } else if (event === 'voted') {
    const { currentUser, currentVote } = payload;

    users = [...users].map(({ name, voted, vote }) => {
      if (currentUser === name) {
        return { name, voted: true, vote: currentVote };
      }
      return { name, voted, vote };
    });
  } else if (event === 'exit') {
    const { user } = payload;

    users = [...users].filter(({ name }) => name !== user);
  } else if (event === 'reset') {
    users = [...users].map(({ name, voted, vote }) => {
      return { name, voted: false, vote: '' };
    });
  }

  if (event === 'show_results') {
    pusher.trigger('vote', 'results', true);
  } else if (event === 'hide_results') {
    pusher.trigger('vote', 'results', false);
  } else {
    pusher.trigger('vote', 'user', users);
  }
  response.send(payload);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
