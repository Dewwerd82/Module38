import { Component } from "../../core/Component";
import { User } from "../../core/User";
import createUserTemplate from "../../templates/other/createUser.html";

const createUser = new Component('createUser');

createUser.createBody(createUserTemplate);

function submitClick(){
    Component.defineTarget('CUalert', document.querySelector('#createUserAlert'));

    document.querySelector('#createUserForm').addEventListener('submit', (e)=>{
        e.preventDefault();

        const form = new FormData(createUserForm);

        const login = form.get('login');
        const password = form.get('password');
        const role = form.get('role');

        if(User.createUser(login, password, role)){
            Component.renderComponent('CUalert', 'messageBlock', {message: `User ${login} was created`});
        }else{
            Component.renderComponent('CUalert', 'errorBlock', {error: `User ${login} already exists!`});
        }
    })
}

createUser.addFunction(submitClick);