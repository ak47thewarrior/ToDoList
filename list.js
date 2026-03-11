const masterContainer = document.getElementById("rootContainer");
const textDiv = document.getElementById("textContainer");
const creatlistbtn = document.getElementById("createbtn");
const todoInput = document.getElementById("todoinput");
const addTodoButton = document.getElementById("addtodo");
const newItemsButton = document.getElementById("new-items")
const completedItemsButton = document.getElementById('completed-items')

let myTodo = []
let currentView = "New"

const deleteTodo = (timestamp) =>{
    const itemIndex = myTodo.find((item) => item.timestamp === timestamp)
    myTodo.splice(itemIndex,1)
    populateCards()
}

const markAsDone = (timestamp) =>{
    const matchingItem = myTodo.find((item) => item.timestamp === timestamp)  
    matchingItem.status = "Done"
    populateCards()
}


const getTodoCard = (todo) =>{
    const card = document.createElement('div')
    card.classList.add("card")

    const checkbox = document.createElement("div")
    checkbox.classList.add('checkbox')
    if(todo.status === "Done"){
        checkbox.style.backgroundColor = 'blue'
    }
    checkbox.onclick = () => markAsDone(todo.timestamp)
    card.append(checkbox)

    const noteContainer = document.createElement("div")
    noteContainer.innerText = todo.note
    card.append(noteContainer)

    const deleteTodoBtn = document.createElement("div")
    deleteTodoBtn.innerText = "D"
    deleteTodoBtn.onclick = () => deleteTodo(todo.timestamp)
    card.append(deleteTodoBtn)
    

    return card
}

const populateCards =() => {
    textDiv.innerHTML = ''
    myTodo.forEach(todo =>{
        if(todo.status === currentView){
            const card = getTodoCard(todo)
            textDiv.append(card)
        }

    })
}

const addItem = () => {
    const inputValue = todoInput.value;
    const newTodoObj = {
        note: inputValue,
        timestamp: new Date(),
        status:"New"
    }
    myTodo.push(newTodoObj)
    localStorage.setItem("todo", JSON.stringify(myTodo))
    todoInput.value = ''
    populateCards()
}


const switchView = (view) => {
    currentView = view
    if(view === "New"){
        completedItemsButton.classList.remove("highlight")
        newItemsButton.classList.add("highlight")
    }else{
        completedItemsButton.classList.add("highlight")
        newItemsButton.classList.remove("highlight")
    }
    populateCards()
}

function main(){
    addTodoButton.addEventListener("click", addItem);
    completedItemsButton.addEventListener('click', () => switchView("Done"))
    newItemsButton.addEventListener('click', () => switchView("New"))

    const locallySavedTodos = JSON.parse(localStorage.getItem('todo'))
    myTodo = [
        ...locallySavedTodos
    ]
    switchView("New")
}
main()




