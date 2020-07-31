// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --
import { createTodo, getTodos } from "./todos";
import { renderTodos } from "./views";
import { getFilters, setFilters } from "./filters";
// Add necessary imports

console.log(getTodos())
// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })    
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#filter').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = e.target.elements.text.value.trim()
    if(todoText) {
        createTodo(todoText)
        renderTodos()
        e.target.elements.text.value = ''
    } 
})
// Bonus: Add a watcher for local storage
window.addEventListener('storage', (e) =>  {
    if (e.key === 'todos') {
        renderTodos()
    }
})