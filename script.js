"use strict";
//! Definir variables

const logIn = document.querySelector(".login");
const logOut = document.querySelector(".logout");
const user = document.querySelector(".user");
const pass = document.querySelector(".pass");
const barra = document.querySelector(".barra");
const img = document.querySelector("body");
const icon = document.querySelector(".icon");
const tab = document.querySelector(".tab");
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");
const form = document.querySelector(".form");
const gold = document.querySelector(".gold");
const silver = document.querySelector(".silver");
const bronze = document.querySelector(".bronze");

//! Creacion de usuarios
const account1 = {
  name: "Luis",
  rol: "Administrador",
  pin: 1111,
};

const account2 = {
  name: "Alfredo",
  rol: "Coordinador",
  pin: 2222,
};

const accounts = [account1, account2];

//! Obtener la informacion con la peticion GET
const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

const getData = async function () {
  const data = await getJSON(
    "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json"
  );
  return data;
};

//! Funcionabilidades
let currentAccount;
const button = function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.name === user.value);
  if (!currentAccount) return window.alert("Usuario no existe");
  if (+pass.value === currentAccount.pin) {
    if (currentAccount.rol === "Coordinador") {
      //!Rol Coordinador
      user.value = "";
      pass.value = "";
      userRol(currentAccount);
    }
    if (currentAccount.rol === "Administrador") {
      //! Rol Administrador
      user.value = "";
      pass.value = "";
      tab.removeAttribute("hidden");
      userRol(currentAccount);
      adminDo(getData());
    }
  } else {
    window.alert("Acceso Denegado");
  }
};
//! Evento al formulario
logIn.addEventListener("click", button);

//! Mostrar informacion usuario coordinador

const userRol = function (user) {
  barra.removeAttribute("hidden");
  const html = `
  <ul class='menu'>
  <li><a class="icon"> ${user?.rol === "Administrador" ? "🤵" : "🕵️‍♀️"}</a></li>
  <li><a class="usuario">${user?.name}</a></li>
  <li><a class="rol">${user?.rol}</a></li>
  </ul>
  `;
  barra.innerHTML = "";
  barra.insertAdjacentHTML("afterbegin", html);
  if (user.rol === "Coordinador")
    img.style.backgroundImage = "url(./mantenimiento.png)";
};

//!Tabulador
function openTab(event, opcion) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(opcion).style.display = "block";
  event.currentTarget.className += " active";
}

//! Mostrar informacion usuario adminitrador
const adminDo = async function (user) {
  const data = await user;
  const markup = function (result) {
    return `
          <tr> 
          <th>${result.athlete}</th>
          <th>${result.age}</th>
          <th>${result.country}</th>
          <th>${result.year}</th>
          <th>${result.date}</th>
          <th>${result.sport}</th>
          <th>${result.gold}</th>
          <th>${result.silver}</th>
          <th>${result.bronze}</th>
          <th>${result.total}</th>
          </tr>
          `;
  };
  tab1.innerHTML = "";
  data.map((e) => tab1.insertAdjacentHTML("beforebegin", markup(e)));

  const markupResult = function (gold, silver, bronze) {
    return `
    <tr> 
    <th>${gold}</th>
    <th>${silver}</th>
    <th>${bronze}</th>
    `;
  };
  let totalGold = data.map((e) => 0 + e.gold);
  totalGold = totalGold.reduce((acc, value) => acc + value);
  let totalSilver = data.map((e) => 0 + e.silver);
  totalSilver = totalSilver.reduce((acc, value) => acc + value);
  let totalBronze = data.map((e) => 0 + e.bronze);
  totalBronze = totalBronze.reduce((acc, value) => acc + value);
  tab2.innerHTML = "";
  tab2.insertAdjacentHTML(
    "beforebegin",
    markupResult(totalGold, totalSilver, totalBronze)
  );
  gold.addEventListener("click", function () {
    window.alert(`Usted ha dado click en medallas de oro`);
  });
  silver.addEventListener("click", function () {
    window.alert(`Usted ha dado click en medallas de plata`);
  });
  bronze.addEventListener("click", function () {
    window.alert(`Usted ha dado click en medallas de bronze`);
  });
};
//!Boton Log out
logOut.addEventListener("click", function (e) {
  e.preventDefault();
  barra.setAttribute("hidden", true);
  tab.setAttribute("hidden", true);
  img.style.backgroundImage = "url(./edificios.jpg)";
  form.setAttribute("hidden", null);
  form.removeAttribute("hidden");
});
