
/*
  OOP JavaScript
  Yuhan Zhao

*/

'use strict';

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
function select (selector, parent = document) {
  return parent.querySelector(selector);
}
function selectAll (selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
function print(arg) {
  console.log(arg);
}
function create(element, parent = document) {
  return parent.createElement(element);
}
class User {
  _name;
  _password;
  constructor(name, password) {
    this._name = name;
    this._password = password;
  }
  get name() { return this._name; } 
  get password() { return this._password; }
  set name(name) {
    this._name = name;
  }
  set password(password) {
    this._password = password;
  }
}
const userName = select('.username');
const password = select('.password');
const message = select('.message');

function checkInPut() {
  const userInfo = JSON.parse(localStorage.getItem("info"));
  if (userName.value === userInfo._name && password.value === userInfo._password) {
    window.location.replace("./homepage.html");
  } else {
    message.innerText = 'Incorrect username or password';
  }
  console.log(userName.value);
}
window.onload = function () {
  const user = new User('XiaoGou', 'lovenuomi');
  localStorage.setItem('info', JSON.stringify(user));
}