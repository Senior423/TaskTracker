import { taskList, todos } from "./main.js"

export function renderTask() {
    taskList.innerHTML = ''
    if (todos.length > 0) {
        todos.forEach(({id, date, text, isChecked}) => createTaskCard({id, date, text, isChecked}))
    }
}

function createTaskCard({id, date, text, isChecked}) {
    const taskCard = document.createElement('div')
    taskCard.classList.add('task__card')
    taskCard.id = id
    taskList.append(taskCard)
    createCheckbox({id, date, text, isChecked}, taskCard)
}

function createCheckbox({id, date, text, isChecked}, taskCard) {
    const checkbox = document.createElement('input')
    checkbox.classList.add('task__checkbox')
    checkbox.type = 'checkbox'
    checkbox.defaultChecked = isChecked
    taskCard.append(checkbox)
    checkbox.addEventListener('click', () => examChecked(checkbox, id))
    createText({id, date, text}, taskCard)
}

function examChecked(checkbox, id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].isChecked = checkbox.checked
            localStorage.setItem('todos', JSON.stringify(todos))
            break
        }
    }
}

function createText({id, date, text}, taskCard) {
    const description = document.createElement('input')
    description.classList = 'task__description'
    description.type = 'input'
    description.value = text
    taskCard.append(description)
    createDate({id, date}, taskCard)
    description.addEventListener('input', () => selText(id, description))
}

function selText(id, description) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].text = description.value
            localStorage.setItem('todos', JSON.stringify(todos))
            break
        }
    }
}

function createDate({id, date}, taskCard) {
    const taskDate = document.createElement('p')
    taskDate.classList.add('task__date')
    taskDate.textContent = date
    taskCard.append(taskDate)
    createButtonDelete(id, taskCard)
}

function createButtonDelete(id, taskCard) {
    const button = document.createElement('button')
    button.className = 'fa-solid fa-trash-can task__button-delete'
    taskCard.append(button)
    button.addEventListener('click', () => taskDelete(id))
}

function taskDelete(id) {
    const confirmation = confirm('Вы уверены, что хотите удалить эту задачу?')
    if (confirmation) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos.splice(i, 1)
                renderTask()
                localStorage.setItem('todos', JSON.stringify(todos))
                break
            }
        }
    }
}