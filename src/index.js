import "./styles.css";
import { localStorageHandler } from "./localStorageHandler";

import { domHandler } from "./domHandler";
const { v4: uuidv4 } = require('uuid');


let taskForm = document.querySelector('form')

//init localStorageHandler 

let storageHandler = localStorageHandler()

let domHandlerInstance = domHandler()



//handle submissions
taskForm.addEventListener('submit', onButtonClick)

//to handle deleting 
domHandlerInstance.addContainerListener()


domHandlerInstance.generateProjects()



function onButtonClick(e){
    e.preventDefault()

    
    //get the values to be put into objects

    let title = taskForm.title.value
    let description = taskForm.description.value
    let checked = false
    let priority = taskForm.priority.value
    let date = taskForm.date.value
    let project= taskForm.project.value
    let id = uuidv4();

    let toDoItem = {title, description,date,checked,priority,project, id}


    storageHandler.addToLocalStorage(toDoItem)

    domHandlerInstance.generateProjects()

}
