
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
  #name;
  #location;
  #image;
  constructor(name, location, image) {
    this.#name = name;
    this.#location = location;
    this.#image = image;
  }
  get name() { return this.#name; } 
  get location() { return this.#location; }
  get image() { return this.#image; } 
  set name(name) {
    this.#name = name;
  }
  set location(location) {
    this.#location = location;
  }
  set image(image) {
    this.#image = image;
  }
}
const peopleboard = select('.peopleboard')
const message = select('.message');
const button = select('.post');
const board = select('.board');
const image = select('#file-input');
const type = select('textarea');
const user = new User();
const xiaogou = new User('XiaoGou', 'Winnipeg', '');
const api = 'https://randomuser.me/api/?nat=CA&results=10';
const options = {
  method: 'GET',
  header: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  mode: 'cors'
}
window.onload = function () {
  getUser();
}
async function getUser() {
  try {
    const response = await fetch(api, options);
    if (!response.ok) {
      throw new Error(`${response.statusText}: ${response.status} error`);
    }
    const data = await response.json();
    for (let i = 0; i < 11; i++) {
      const firstName = data.results[i].name.first;
      const lastName = data.results[i].name.last;
      const name = firstName.concat(' ', lastName);
      const city = data.results[i].location.city;
      const state = data.results[i].location.state;
      const location = city.concat(', ', state);
      setUser(name, location, data.results[i].picture.large);
    }
  } catch (error) {
    console.log(error.message);
  }
}
function setUser(name, location, image) {
  user.name = name;
  user.location = location;
  user.image = image;
  let postBox = create('div');
  postBox.classList.add("peoplediv");
  addPeople(postBox, user);
}
function addPeople(postBox, obj) {
  let info = create('div');
  info.classList.add("info");
  info.innerText = `${obj.name}\n${obj.location}\n`;
  let img = create('div');
  img.innerHTML = `<img src=\"${obj.image}\">`;
  img.classList.add("img");
  postBox.append(img, info);
  peopleboard.append(postBox);
}
function checkInput(type, image) {
  const curFiles = image.files;
  if (type.value == '' && curFiles.length === 0){
    return false;
  }
  return true;
}
button.addEventListener('click', () => {
  if (checkInput(type, image)) {
    let postBox = document.createElement('div');
    postBox.classList.add("div");
    addPost(postBox, xiaogou);
    addImage(postBox, image);
  }
  type.value = '';
  message.innerText = '';
  image.value = '';
})
function addPost(postBox, obj) {
  let infoBox = document.createElement('div');
  infoBox.classList.add("flex");
  let icon = document.createElement('div');
  icon.classList.add("icon");
  icon.innerHTML = `<img src="./assets/image/icon.jpeg">`;
  let name = document.createElement('p');
  name.classList.add("name");
  name.innerText = `${obj.name}`;
  const now = new Date();
  let time = document.createElement('p');
  time.classList.add("time");
  time.innerText = `${now.toDateString()}`;
  infoBox.append(icon, name, time);
  let para = document.createElement('p');
  para.classList.add("para");
  para.innerText = type.value;
  postBox.append(infoBox, para);
  board.prepend(postBox);
}
function addImage(postBox, img) {
  let file = img.files;
  if (file.length != 0) {
    let imgBox = document.createElement('div');
    imgBox.classList.add("image");
    const tempImage = document.createElement('img');
    tempImage.src = URL.createObjectURL(img.files[0]);
    imgBox.append(tempImage);
    postBox.append(imgBox);
  }
}
document.getElementById("file-input").onchange = function() {
  message.innerText = `${(document.getElementById("file-input").files[0].name)}`;
}