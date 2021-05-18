import { Component } from "../../../core/Component";
import { Kanban } from "../../../core/Kanban";
import { Utils } from "../../../core/Utils";
import taskCardTemplate from "../../../templates/content/taskCard.html";

const taskCard = new Component('taskCard');

taskCard.createBody(taskCardTemplate);

function taskDeleteClick(props){
  const id = props['id'];
  
  const deleteBtn = document.querySelector(`#btn${id}`);

  deleteBtn.addEventListener('click', ()=>{
    Utils.deleteFromStorage('Tasks', 'id', id);
    Kanban.renderBoard();
  })
}

taskCard.addFunction(taskDeleteClick);