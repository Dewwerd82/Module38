import { Component } from "../../core/Component";
import { User } from "../../core/User";
import userMenuTemplate from "../../templates/menu/userMenu.html";

const userMenu = new Component('userMenu');

userMenu.createBody(userMenuTemplate);

function myAccount(){
  const myAccount = document.querySelector('#myAccount');

  myAccount.addEventListener('click', ()=>{
    Component.renderComponent('board', 'myAccount');
  })
}

userMenu.addFunction(myAccount);

function logOut(){
  const logOut = document.querySelector('#logOut');

  logOut.addEventListener('click', ()=>{
    User.logOut();
  })
}

userMenu.addFunction(logOut);