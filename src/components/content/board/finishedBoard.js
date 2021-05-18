import { Component } from "../../../core/Component";
import { Kanban } from "../../../core/Kanban";
import { User } from "../../../core/User";
import { Utils } from "../../../core/Utils";
import finishedBoardTemplate from "../../../templates/content/finishedBoard.html";

const finishedBoard = new Component('finishedBoard');

finishedBoard.createBody(finishedBoardTemplate);

function selectTask(){
    const taskList = document.querySelector('#collapseFinished');

    taskList.addEventListener('click', (e)=>{
        if (e.target.classList.contains('select-task_finished')){
            const taskId = e.target.textContent;
            
            Utils.modifyInStorage('Tasks', 'id', taskId, 'status', 'finished');
            Kanban.renderBoard();
        }
    })
}

finishedBoard.addFunction(selectTask);

function loadFinishedTask(){
    const finishedTasks =  Kanban.getTasks('finished');

    Component.defineTarget('finished', document.querySelector('#finished-board'));

    const taskList = [];
    for(let task of finishedTasks){
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

    Component.renderComponent('finished', taskList);
}

finishedBoard.addFunction(loadFinishedTask);