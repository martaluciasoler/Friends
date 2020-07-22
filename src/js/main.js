'use strict';

/*DECLARACIÓN CONSTANTES Y VARIABLES*/
// let users = datos limpios de la API.
// let listUsers = selector de cada usuario.
// const list = selector de <ul>.

const ENDPOINT = 'https://randomuser.me/api/?results=10';
let users = [];
let listUsers = document.querySelectorAll('.js-userList');
const list = document.querySelector('.js-list');

/* GETDATA = trae los datos de la API */
// PUSH objeto (datos limpios) en [] Users.
// P.D ninguno es amigo, (isfriends = false).
//llamo a la function RENDER para pintarlos.

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

          isFriend: false,
        });
      }
      renderUsers(users);
    });
}
getData();

/*FUNCTION RENDERUSERS (pinta)*/
//  list.innerHTML = codeHTML añade a <ul> todos los <li>.
//  listeners(); se ejecuta una vez se pinten las personas <li>
// he añadido el nombre del login a cada LISTUSERS con DATA-ID

function renderUsers(array) {
  let codeHTML = '';
  for (let i = 0; i < array.length; i++) {
    if (array[i].isFriend === true) {
      codeHTML += `<li  class="js-userList pink list" data-id='${array[i].login}'>`;
      codeHTML += `<img class="img" src="${array[i].picture}">`;
      codeHTML += `<h1 class="name">"${array[i].name}"</h1>`;
      codeHTML += `<div class="city" >"${array[i].location}"</div>`;
      codeHTML += `<span class= "userName">"${array[i].login}"</span></li>`;
    } else {
      codeHTML += `<li  class="js-userList list" data-id='${array[i].login}'>`;
      codeHTML += `<img class="img" src="${array[i].picture}">`;
      codeHTML += `<h1 class="name">"${array[i].name}"</h1>`;
      codeHTML += `<div class="city">"${array[i].location}"</div>`;
      codeHTML += `<span class= "userName">"${array[i].login}"</span></li>`;
    }
  }
  list.innerHTML = codeHTML;

  listeners();
}

/*FUNCTION LISTENERS para escuchas a las personas <li> */

function listeners() {
  listUsers = document.querySelectorAll('.js-userList');
  for (const li of listUsers) {
    li.addEventListener('click', friendUser);
  }
}

/*FUNCTION FRIENDUSER*/
// añade o quita clase "pink" del elemento clickado.
//const loginNameListUser = login de cada elemento clickado (DATA-ID) para poder identificar con que elemento del [] USER se corresponde.
//const arrayLoginUsers = con MAP estoy creando un [] igual de largo que USERS que contiene  solo el nombre del login(nombre del usuario).
//const userIndex = me da el indice del [] arrayLoginUsers ( que solo contiene strings con el login de cada persona) que coincide con el login de la persona clickeada (DATA-ID)
// L93.accedo al elemento del [] USERS que tiene el INDICE USERINDEX, a su propiedad ISFRIEND y machacho el dato poniendo "TRUE" (orden de los indices de [] USERS = orden de los indices de []arrayLiginUsers)

function friendUser(event) {
  event.currentTarget.classList.toggle('pink');
  const loginNameListUser = event.currentTarget.dataset.id;
  const arrayLoginUsers = users.map((user) => user.login);
  const userIndex = arrayLoginUsers.findIndex(
    (elem) => elem === loginNameListUser
  );
  users[userIndex].isFriend = true;
}

/*LOCAL STORAGE*/

const buttonSetData = document.querySelector('.js-setData');
buttonSetData.addEventListener('click', setInToLocal);

function setInToLocal() {
  localStorage.setItem('usersFriends', JSON.stringify(users));
}

const buttonGetData = document.querySelector('.js-getData');
buttonGetData.addEventListener('click', getFromLocal);

function getFromLocal() {
  const localFriends = JSON.parse(localStorage.getItem('usersFriends'));
  renderUsers(localFriends); // llamo a FUNCTION RENDERUSER y le doy como parametro ( LOCALFRIENDS (personas guardadas en LOCAL ESTORAGE))
}
