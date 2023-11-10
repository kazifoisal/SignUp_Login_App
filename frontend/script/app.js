const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const createAccountLink = document.getElementById("createAccountLink");

const nameInputField = document.getElementById("nameInputField");
const emailInputField = document.getElementById("emailInputField");
const passwordFiend = document.getElementById("passwordFiend");

const tittle = document.getElementById("tittle");
const littleText = document.getElementById("littleText");
const hiddenEmail = document.getElementById("hiddenEmail");
const API_URL = 'http://localhost:7690/api/student';

async function signInAction() {
  hiddenEmail.style.maxHeight = "0";
  tittle.innerText = "Sign In";
  signUpButton.classList.add("disable");
  signInButton.classList.remove("disable");
  littleText.classList.remove("noneDisplay");

  const name = nameInputField.value;
  const password = passwordFiend.value;

  const requestData = {
    name,
    password
  };

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      console.log("Successfully logged in");
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }

}

async function signUpAction() {
  hiddenEmail.style.maxHeight = "60px";
  tittle.innerText = "Sign Up";
  signUpButton.classList.remove("disable");
  signInButton.classList.add("disable");
  littleText.classList.add("noneDisplay");

  const name = nameInputField.value;
  const email = emailInputField.value;
  const password = passwordFiend.value;


  const requestData = {
    name,
    email,
    password
  };

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data for Sign Up:", data);
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }

}

window.addEventListener('load', () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});