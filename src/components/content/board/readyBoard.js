import { Component } from "../../../core/Component";
import { Kanban } from "../../../core/Kanban";
import { User } from "../../../core/User";
import { Utils } from "../../../core/Utils";
import readyBoardTemplate from "../../../templates/content/readyBoard.html";

const readyBoard = new Component('readyBoard');

readyBoard.createBody(readyBoardTemplate);

function addCardClick() {
    const addCard = document.querySelector('#addCardReady');

    addCard.addEventListener('click', (e)=>{
        addCard.textContent = 'Submit';
        addCard.removeAttribute('data-bs-toggle');
        setTimeout(() => {
            addCard.type = 'submit';
        }, 100);
    })
}

readyBoard.addFunction(addCardClick);

function addTaskFormSubmit(){
    const addCardForm = document.querySelector('#taskForm');

    addCardForm .addEventListener('submit', (e)=>{
        e.preventDefault();
        const form = new FormData(taskForm);
        const user = form.get('user');
        const taskBody = form.get('task');

        const task = {
            id: Utils.createID(),
            user: user,
            body: taskBody,
            status: 'ready'
        }

        Utils.addToStorage(task, 'Tasks');
        Kanban.renderBoard();
    })
}

readyBoard.addFunction(addTaskFormSubmit);

function loadReadyTasks(){
    const readyTasks =  Kanban.getTasks('ready');

    Component.defineTarget('ready', document.querySelector('#ready-board'));

    const taskList = [];
    for(let task of readyTasks){
        const user = User.getUserData(task.user);

        const props = {
            id: task.id,
            user: task.user,
            body: task.body,
            delete: (User.getCurrentRole() === 'user') ? 'disabled' : '',
            email: (user) ? `E-Mail: ${user['email']}` : '',
            phone: (user) ? `Phone: ${user['phone']}` : ''
        }

        taskList.push({name: 'taskCard', props: props});
    }

    Component.renderComponent('ready', taskList);
}

readyBoard.addFunction(loadReadyTasks);