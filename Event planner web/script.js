
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const Eventplan = document.getElementById('Eventplan');

const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const getUserData = () => JSON.parse(localStorage.getItem('users')) || {};
const saveUserData = (data) => localStorage.setItem('users', JSON.stringify(data));

signupLink.addEventListener('click', (e) => {
 e.preventDefault();
  loginContainer.style.display = 'none';
  signupContainer.style.display = 'block';
});

loginLink.addEventListener('click', (e) => {
 e.preventDefault();
 signupContainer.style.display = 'none';
 loginContainer.style.display = 'block';
});
loginForm.addEventListener('submit', (e) => {
 e.preventDefault();
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;
   const users = getUserData();

  if (users[username] && users[username] === password) {
    alert('Login successful!');
    loginContainer.style.display = 'none';
    Eventplan.style.display = 'block';
  } 
  else {
   alert('Invalid username or password.');
  }
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;
  const users = getUserData();

    if (users[newUsername]) {
    alert('Username already exists. Please choose a different username.');
  }
  else {
  users[newUsername] = newPassword;
  saveUserData(users);
  alert('Sign up successful! You can now log in.');
  signupContainer.style.display = 'none';
  loginContainer.style.display = 'block';
  }
  });

document.getElementById("Date").addEventListener("change", function () {
  const selectedDate = new Date(this.value); 
  const today = new Date();
  const timeDiff = selectedDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    document.getElementById("CountdownDisplay").textContent = "The date has passed!";
  } else {
    document.getElementById("CountdownDisplay").textContent = `Days left: ${daysLeft}`;
  }
});

document.getElementById("AddTask").addEventListener("click", function () {
  const TaskText = document.getElementById("NewTask").value;
  if (TaskText === "") return;

  const li = document.createElement("li");
  li.textContent = TaskText;
  li.addEventListener("click", () => li.remove());
  document.getElementById("TaskList").appendChild(li);

  document.getElementById("NewTask").value = ""; 
});
document.getElementById("Budget").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("ExpenseName").value;
  const amount = Number(document.getElementById("ExpenseAmount").value);

  if (!name || !amount) return;

  const tableRow = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = name;

  const tdAmount = document.createElement("td");
  tdAmount.textContent = amount;

  const tdRemove = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    tableRow.remove(); 
    updateTotalBudget(-amount);  
  });
  tdRemove.appendChild(removeButton);

  tableRow.appendChild(tdName);
  tableRow.appendChild(tdAmount);
  tableRow.appendChild(tdRemove);

  document.getElementById("ExpenseTable").appendChild(tableRow);

  updateTotalBudget(amount); 

  document.getElementById("ExpenseName").value = "";
  document.getElementById("ExpenseAmount").value = "";
});

function updateTotalBudget(amount) {
  const TotalBudget = Number(document.getElementById("TotalBudget").textContent) || 0;
  document.getElementById("TotalBudget").textContent = TotalBudget + amount;
}
