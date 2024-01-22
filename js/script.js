"use strict"

const todos = [{id: '11111', date: '19:35 17 sept', text: 'Play video games', isChecked: true},{id: '22222', date: '19:35 17 sept', text: 'Play video games', isChecked: false}]

const root = document.getElementById('root')
const control = document.createElement('div')
control.classList.add('control')
root.append(control)

const controlForm = document.createElement('form')
controlForm.classList.add('control__form')
controlForm.method = 'get'
control.append(controlForm)

function createButton(className, type, text) {
    const button = document.createElement('button')
    button.className = className
    button.type = type
    button.textContent = text
    return button
}

controlForm.append(createButton('control__delete-all', 'button', 'Удалить всё'))

function createInput(className, type, placeholder) {
    const input = document.createElement('input')
    input.className = className
    input.type = type
    input.placeholder = placeholder
    return input
}

controlForm.append(createInput('control__input-add', 'input', 'Описание задачи'))
controlForm.append(createButton('control__button-submit', 'submit', 'Добавить'))

const taskList = document.createElement('div')
taskList.classList.add('task__list')
root.append(taskList)

function renderTask() {
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
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1)
            renderTask()
            break
        }
    }
}

renderTask()