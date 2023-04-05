const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', registerUser);

function registerUser(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const data = {
    username,
    password
  };

  fetch('https://localhost:44384/User/Register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert('Registration successful!');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      alert('Registration failed.');
    }
  })
  .catch(error => {
    console.error('Error registering user:', error);
    alert('Registration failed.');
  });
}
