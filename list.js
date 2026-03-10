const masterContainer = document.getElementById("rootContainer");
const textDiv = document.getElementById("textContainer");
const creatlistbtn = document.getElementById("createbtn");
const todoInput = document.getElementById("todoinput");
const addTodoButton = document.getElementById("addtodo");

let myTodo = []


const getTodoCard = (todo) =>{
    const card = document.createElement('div')
    card.classList.add("card")

    const checkbox = document.createElement("div")
    checkbox.classList.add('checkbox')
    card.append(checkbox)

    const noteContainer = document.createElement("div")
    noteContainer.innerText = todo.note
    card.append(noteContainer)

    return card
}

const populateCards =() => {
    textDiv.innerHTML = ''
    myTodo.forEach(todo =>{
        const card = getTodoCard(todo)
        textDiv.append(card)
    })
}

const addItem = () => {
    const inputValue = todoInput.value;
    const newTodoObj = {
        note: inputValue,
        timestamp: new Date()
    }
    myTodo.push(newTodoObj)
    localStorage.setItem("todo", JSON.stringify(myTodo))
    todoInput.value = ''
    populateCards()
}


function main(){
    addTodoButton.addEventListener("click", addItem);
    const locallySavedTodos = JSON.parse(localStorage.getItem('todo'))
    myTodo = [
        ...locallySavedTodos
    ]
    populateCards()
}
main()




