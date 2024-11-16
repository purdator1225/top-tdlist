import { localStorageHandler } from "./localStorageHandler"

export const domHandler = ()=>{

    let localStorageInstance = localStorageHandler()


    const generateProjects=()=>{

         const toDoHolder = document.querySelector('.project-holder')

        toDoHolder.innerHTML = ''

        const toDoList = JSON.parse(localStorage.getItem('todolist'))

        // console.log(toDoList)

        let allProjectsList = toDoList.map((todoItem)=>{
            return todoItem.project
        })

        let projectSet = new Set(allProjectsList)

        // console.log(projectSet)

        //loop through the project sets

        for (let item of projectSet){

            let filteredList = toDoList.filter((toDoItem)=>{
                return toDoItem.project === item
            })

            //create Project Item 

            let projectWrapper = document.createElement('div')

            projectWrapper.classList.add(`project-wrapper-${item}`)

            let projectTitle = document.createElement('h1')

            projectTitle.innerText = item

            projectWrapper.append(projectTitle)


            filteredList.forEach((toDoItem,index)=>{
        
                const toDoElement = createToDoElement(item,toDoItem,index)

                projectWrapper.appendChild(toDoElement)

    })

        toDoHolder.appendChild(projectWrapper)


        }


    }

    //I generate a list of projects 
    //for each project, I have a project wrapper 
    //I filter list by projects 
    //I append it to the project wrapper 




    const createToDoElement = (project, toDoItem, index)=>{

        //wrapper for todo 

        const toDoElementWrapper = document.createElement('div')
        toDoElementWrapper.classList.add('todo-wrapper')

        toDoElementWrapper.id = toDoItem.id

        toDoElementWrapper.dataset.index = index

       //todo title
       
        let toDoTitle = document.createElement('h1')
        toDoTitle.textContent = toDoItem.title

        //todo button
        let deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-btn')
        deleteButton.textContent= "Delete"


        //render checkbox
        let checkbox = document.createElement('input')
        checkbox.classList.add('checkbox')
        checkbox.type = 'checkbox'

        checkbox.checked = toDoItem.checked || false

    

        //render priority 

        let priority

        if(toDoItem.priority === "Low"){
             priority = "🟩"
    
        } else if (toDoItem.priority === "Medium"
        ) {
            priority = "🟨"
        }
        else if (toDoItem.priority === 'High'
        ) {
            priority = "🟥"
        }

        let priorityText = document.createElement('p')
        priorityText.textContent= priority



        toDoElementWrapper.append(checkbox,toDoTitle,priorityText,deleteButton)

        return toDoElementWrapper
        

    }




  const addContainerListener = ()=>{

    const toDoHolder = document.querySelector('.project-holder')


    toDoHolder.addEventListener('click', (e)=>{

        //delete button

        if (e.target.classList.contains('delete-btn')){
            const toDoItem = e.target.closest('.todo-wrapper');

            const index = toDoItem.id

            
            localStorageInstance.deleteFromLocalStorage(index)

            generateProjects()            
        }

        //checkedbutton 

         else if (e.target.classList.contains('checkbox')){
            const toDoItem = e.target.closest('.todo-wrapper');

            const index = toDoItem.id

            //  console.log(index)

            localStorageInstance.markToDoAsChecked(index)

            generateProjects()            
        }





    })





  }





  return { addContainerListener, generateProjects}



}