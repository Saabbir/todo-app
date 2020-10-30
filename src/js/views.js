import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// Generate DOM structure for individual todo
const generateTodoDOM = todo => {
  // Create span, button, input elements along with root div element for single todo
  const todoEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkboxEl = document.createElement('input')
  const textEl = document.createElement('span')
  const buttonEl = document.createElement('button')

  // Setup checkbox element
  checkboxEl.setAttribute('type', 'checkbox')
  checkboxEl.checked = todo.completed
  checkboxEl.addEventListener('change', e => {
    toggleTodo(todo.id)
    renderTodos()
  })
  containerEl.appendChild(checkboxEl)

  // Setup the todo text
  if (todo.text.length > 0) {
    textEl.textContent = todo.text
  } else {
    textEl.textContent = 'Unnamed Todo'
  }
  containerEl.appendChild(textEl)

  // Setup container
  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl)

  // Setup button element
  buttonEl.textContent = 'remove'
  buttonEl.classList.add('button', 'button--text')
  buttonEl.addEventListener('click', e => {
    removeTodo(todo.id)
    renderTodos()
  })
  todoEl.appendChild(buttonEl)

  return todoEl
}

// Generate DOM structure for summary
const generateSummaryDOM = incompleteTodos => {
  const summaryEl = document.createElement('h2')
  const plural = incompleteTodos.length === 1 ? '' : 's'
  summaryEl.classList.add('list-title')
  summaryEl.textContent = `You have ${incompleteTodos.length} todo${plural} left`

  return summaryEl
}

// Render application todos based on filters
const renderTodos = () => {
  const todos = getTodos()
  const filters = getFilters()
  const todosContainer = document.querySelector('#todos')
  todosContainer.innerHTML = ''

  let filteredTodos = todos.filter(todo => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  if (filters.hideCompleted) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed)
  }

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

  if (filteredTodos.length > 0) {
    todosContainer.appendChild(generateSummaryDOM(incompleteTodos))
    filteredTodos.forEach(todo => {
      todosContainer.appendChild(generateTodoDOM(todo))
    })
  } else {
    const messageEl = document.createElement('p')
    messageEl.textContent = 'There are no todos to show'
    messageEl.classList.add('empty-message')
    todosContainer.appendChild(messageEl)
  }
}

export { generateTodoDOM, generateSummaryDOM, renderTodos }