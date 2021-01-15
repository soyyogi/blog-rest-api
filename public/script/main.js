const axios = require('axios');

document.querySelector('#home-link').addEventListener('click', () => {
  axios.get('/posts', {
    headers: {
      Authorization: 'Bearer token'
    }
  })
})