import { getFilters } from './filters'
import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos'

// renderTodos
// Arguments: none
// Return value: none


//render
const renderTodos = () => {
    const { searchText, hideCompleted} = getFilters()
    const todos = getTodos()
    const todoEl = document.querySelector('#todos')
    
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed) 
    
    todoEl.innerHTML = ''

    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if(filteredTodos.length) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDom(todo))
        })
    } else {
        const p = document.createElement('p')
        p.classList.add('empty-message')
        p.textContent = 'There are no to-dos to show'
        todoEl.appendChild(p)
    }
} 

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDom = (todo) => {
    const root = document.createElement('label')
    const containerEl = document.createElement('div')
    const check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    check.checked = todo.completed
    const textEl = document.createElement('span')
    const button = document.createElement('button')
    containerEl.appendChild(check)

    check.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    if (todo.text.length > 0) {
        textEl.textContent = todo.text
    }
    else {
        textEl.textContent = 'Unnamed todo'
    }
   
    containerEl.appendChild(textEl)

    // Setup container
    root.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    root.appendChild(containerEl)
     
    // Setup the remove button
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    root.appendChild(button)
    button.addEventListener('click', (e) =>{
        removeTodo(todo.id)
        renderTodos()
    })
   
    return root
}
// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = (incompleteTodos) => {
    let summary = document.createElement('h2')
    summary.classList.add('list-title')
    if(incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    }
    return summary
}
// Make sure to set up the exports
export {generateTodoDom, generateSummaryDOM, renderTodos}