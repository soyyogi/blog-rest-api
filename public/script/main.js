// document.querySelectorAll('.btn-delete').forEach(function(btn) {
//   btn.addEventListener('click', async () => {
//     console.log(btn.id);
//     await $.ajax({
//       url: `/post/delete/?id=${btn.id}`,
//       type: 'POST',
//     })
//     // window.location.assign('/posts');
//   })
// })

// if (document.querySelector('.signup-form')) {
//   document.querySelector('.signup-form').addEventListener('submit', registerUser);
// }

// if (document.querySelector('.signin-form')) {
//   document.querySelector('.signin-form').addEventListener('submit', signIn);
// }

// async function registerUser(e) {
//   e.preventDefault();
//   let name = document.getElementById('name');
//   let email = document.getElementById('email');
//   let password = document.getElementById('password');
//   let confirmPassword = document.getElementById('confirm-password');
//   let checkbox = document.getElementById('checkbox');
//   if (password.value !== confirmPassword.value || !checkbox.checked) {
//     return console.log('something went wrong');
//   }
//   const data = {
//     name: name.value,
//     email: email.value,
//     password: password.value
//   }

//   name.value = email.value = password.value = confirmPassword.value = '';
//   checkbox.checked = false;

//   const result = await axios.post('/user/signup', data);
//   localStorage.setItem('token', JSON.stringify(result.data.token));
//   window.location.assign('/posts');
// }

// async function signIn(e) {
//   e.preventDefault();
//   let email = document.getElementById('email');
//   let password = document.getElementById('password');
//   const data = {
//     email: email.value,
//     password: password.value
//   }
//   console.log(data);

//   email.value = password.value = '';
//   const result = await axios.get(`/user/signin?email=${data.email}&password=${data.password}`);
//   console.log(result);
//   // localStorage.setItem('token', JSON.stringify(result.data.token));
//   // window.location.assign('/posts');
// }

// async function getPost() {
//   window.location.assign('/post');
//   await axios.get('/post', {
//     headers: {
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAxYTdlMGQ5YmQ0ODIzZTExMmJhNjIiLCJpYXQiOjE2MTA3MjEyNDh9.WqH1Pro6uRqlBG5_fFLORS6ZZ7rdFqtbILKjhwsscTU'
//     }
//   })

// }


// // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAxYjVjM2QxNzU3MjI4NzRhN2JiOTgiLCJpYXQiOjE2MTA3MjQ4MDN9.cHvxVLibb-j2uYPtc2BPcz9mexWZDbQvafIpM6jPdDk"