const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', login);

function login(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const data = {
    username,
    password
  };

  fetch('https://localhost:44384/User/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
        console.log("All good goin to index");	
      window.location.href = 'index.html'; // Redirect to main page
    } 
  })
  .catch(error => {
    console.error('Error loging user:', error);
  });
}
