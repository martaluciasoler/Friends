'use strict';
const ENDPOINT = 'https://randomuser.me/api/?results=10';
let users = [];
let friends = [];

console.log(users);

const list = document.querySelector('.js-list');
function getData() {
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      let usersData = data.results;
      for (let i = 0; i < usersData.length; i++) {
        users.push({
          id: usersData[i].id.value,

          picture: usersData[i].picture.large,

          name: usersData[i].name.first,

          location: usersData[i].location.city,

          login: usersData[i].login.username,

          isFriend: '',
        });
      }
      renderUsers(users);
      listeners();
    });
}
getData();

function renderUsers(array) {
  for (let i = 0; i < array.length; i++) {
    list.innerHTML += `<li  class="js-userList" id='friend${i}'><img src="${array[i].picture}"><h1>"${array[i].name}"</h1><div>"${array[i].location}"</div><span>"${array[i].login}"</span></li>`;
  }
}

//Cuando se haga click en uno de los usuarios del listado hay que:
//1. En el objeto del usuario clickado dentro del array, hay que añadir una propiedad para marcarlo como amigo, por ejemplo poniendo isFriend: true.
//2. Volver a pintar el listado de usuarios en pantalla: 1. Comprobar si cada usuario pintado es un amigo y en caso afirmativo pintar el color de fondo de otro color, por ejemplo rosa.
function listeners() {
  const listUsers = document.querySelectorAll('.js-userList');
  for (const li of listUsers) {
    li.addEventListener('click', friendUser);
  }
}

function friendUser(event) {
  const target = event.currentTarget;
  addToFriends(target);
}

function addToFriends(ev) {
  const friendName = ev.querySelector('span').innerHTML;
  console.log(friendName);
  const elemIndex = friends.findIndex((elem) => elem.login === friendName);

  if (elemIndex === -1) {
    ev.classList.add('pink');
    const userFriend = users.find((user) => user.login === friendName);
    friends.push(friendName);
    console.log(userFriend);
    console.log(friends);
  }
}

function saveInToLocal() {
  localStorage.setItem('userFriends', JSON.stringify(friends));
}

function getFromLocal() {
  return JSON.parse(localStorage.getItem('userFriends'));
}
