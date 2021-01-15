document.querySelector('#home-link').addEventListener('click', async () => {
  const result = await axios.get('/post', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAxYTdlMGQ5YmQ0ODIzZTExMmJhNjIiLCJpYXQiOjE2MTA3MjEyNDh9.WqH1Pro6uRqlBG5_fFLORS6ZZ7rdFqtbILKjhwsscTU'
    }
  })
  const posts = result.data;
  console.log(posts);
})