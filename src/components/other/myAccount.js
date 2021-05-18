import { Component } from "../../core/Component";
import { User } from "../../core/User";
import { Utils } from "../../core/Utils";
import myAccountTemplate from "../../templates/other/myAccount.html";

const myAccount = new Component('myAccount');

myAccount.createBody(myAccountTemplate);

function loadData(){
    const userData = User.getUserData(User.getCurrentUser());

    Component.defineTarget('MAalert', document.querySelector('#myAccountAlert'));

    const email = document.querySelector('#accountEmail');
    const phone = document.querySelector('#accountPhone');

    email.value = userData['email'];
    phone.value = userData['phone'];
}

myAccount.addFunction(loadData);

function onSubmit(){
    document.querySelector('#myAccontrForm').addEventListener('submit', (e)=>{
        e.preventDefault();

        const form = new FormData(myAccontrForm);

        const user = User.getCurrentUser();
        const email = form.get('email');
        const phone = form.get('phone');

        Utils.modifyInStorage('Users', 'login', user, 'email', email);
        Utils.modifyInStorage('Users', 'login', user, 'phone', phone);

        Component.renderComponent('MAalert', 'messageBlock', {message: `Saved`});
    })
}

myAccount.addFunction(onSubmit);