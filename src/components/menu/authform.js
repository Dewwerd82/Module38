import { Kanban } from "../../core/Kanban";
import { Component } from "../../core/Component";
import { User } from "../../core/User";
import authFormTemplate from "../../templates/menu/authForm.html";
import avatar from "../../assets/avatarbase.png";

const authForm = new Component('authForm');


authForm.createBody(authFormTemplate);

function signInClick() {
    const signIn = document.querySelector('.loginForm__submit');
    signIn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = new FormData(loginform);
        const login = form.get('login');
        const password = form.get('password');

        async function auth(login, password) {
            return User.authUser(login, password);
        }

        auth(login, password).then(result => {
            if (result === 'user') {
                const props = {
                    username: login,
                    avatar: avatar
                }

                Component.renderComponent('menu', 'userMenu', props);
                Kanban.renderBoard();
            } else if (result === 'administrator') {
                const props = {
                    username: login,
                    avatar: avatar
                }

                Component.renderComponent('menu', 'adminMenu', props);
                Kanban.renderBoard();
            } else {
                const props = {
                    error: result
                }
                Component.renderComponent('board', 'errorBlock', props);
            }
        })


    })
}

authForm.addFunction(signInClick);