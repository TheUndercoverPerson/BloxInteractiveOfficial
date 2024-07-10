// Function to display messages
function displayMessage(type, message) {
  var messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

// Function to handle sign in
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      displayMessage('danger', 'Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      displayMessage('danger', 'Please enter a password.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        displayMessage('danger', 'Wrong password.');
      } else {
        displayMessage('danger', errorMessage);
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("email", email);
                alert('Signed in successfully');
        startCountdown('Signed in successfully. Redirecting in ', 'home.html');
      }
    });
  }
}

// Function to handle sign up
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var cpassword = document.getElementById('cpassword').value;
  if (email.length < 4) {
    displayMessage('danger', 'Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    displayMessage('danger', 'Please enter a password.');
    return;
  }
  if (password !== cpassword) {
    displayMessage('danger', 'Passwords do not match.');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
    startCountdown('Account created successfully. Redirecting in ', 'index.html');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      displayMessage('danger', 'The password is too weak.');
    } else {
      displayMessage('danger', errorMessage);
    }
  });
}

// Function to send password reset email
function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    startCountdown('Password reset email sent. Redirecting in ', 'index.html');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      displayMessage('danger', errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      displayMessage('danger', errorMessage);
    }
  });
}

// Function to start a countdown and redirect
function startCountdown(message, redirectUrl) {
  var countdown = 3;
  var interval = setInterval(function() {
    displayMessage('success', message + countdown + ' seconds...');
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      window.location = redirectUrl;
    }
  }, 1000);
}
