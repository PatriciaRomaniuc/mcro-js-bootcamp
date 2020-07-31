// Setup the empty todos array
import uuidv4 from 'uuid/v4'
import { renderTodos } from './views'

let todos = []


const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        todos =  todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}


const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array

const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none

const createTodo = (todoText) => {
    const id = uuidv4()
    todos.push({
        id: id,
        text: todoText.trim(),
        completed: false
    })
    saveTodos()
    
}
// removeTodo
// Arguments: id of todo to remove
// Return value: none

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id == todo.id)
    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo =  (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if(todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}
// Make sure to call loadTodos and setup the exports

loadTodos()

export { createTodo, removeTodo, getTodos, toggleTodo}