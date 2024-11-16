import { id } from "date-fns/locale";

export const localStorageHandler=()=>{


    let toDoArray = JSON.parse(localStorage.getItem('todolist')) || [];


   const addToLocalStorage = (todoItem)=>{


    toDoArray.push(todoItem)    

    localStorage.setItem('todolist',JSON.stringify(toDoArray))

   }


   const deleteFromLocalStorage = (idToRemove)=>{

    console.log('in deletelocalstorage')


    let filteredArray = toDoArray.filter((item,index)=>
        item.id !==  idToRemove
    )

    console.log(filteredArray)

    localStorage.setItem('todolist', JSON.stringify(filteredArray))

    return filteredArray

   }


   const markToDoAsChecked = (idToCheck)=>{

    console.log('in marked to do')
    let itemIndex = toDoArray.findIndex((item)=>item.id===idToCheck)

     if (itemIndex !== -1) {
      toDoArray[itemIndex].checked = !toDoArray[itemIndex].checked;

          localStorage.setItem('todolist', JSON.stringify(toDoArray))


    
     
    }

   }


   return {addToLocalStorage, deleteFromLocalStorage, markToDoAsChecked}

}