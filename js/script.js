"use strict"

let todos = JSON.parse(localStorage.getItem('todos')) || []

const root = document.getElementById('root')
const control = document.createElement('div')
control.classList.add('control')
root.append(control)

const controlForm = document.createElement('form')
controlForm.classList.add('control__form')
controlForm.method = 'get'
control.append(controlForm)

const buttonDeleteAll = document.createElement('button')
buttonDeleteAll.className = 'control__delete-all'
buttonDeleteAll.type = 'button'
buttonDeleteAll.textContent = 'Удалить всё'
controlForm.append(buttonDeleteAll)

function deleteAll() {
    const confirmation = confirm('Вы уверены, что хотите удалить все задачи?')
    if (confirmation) {
        localStorage.setItem('todos', JSON.stringify([]))
        taskList.innerHTML = ''
        todos = []
    }
}

buttonDeleteAll.addEventListener('click', () => deleteAll())

const inputAdd = document.createElement('input')
inputAdd.classList.add('control__input-add')
inputAdd.type = 'input'
inputAdd.placeholder = 'Описание задачи'
controlForm.append(inputAdd)

const buttonSubmit = document.createElement('button')
buttonSubmit.className = 'control__button-submit'
buttonSubmit.type = 'input'
buttonSubmit.textContent = 'Добавить'
controlForm.append(buttonSubmit)

function corectedDate(value) {
    return value < 10 ? '0' + value : value
}

function getDate() {
    const currentDAte = new Date()
    const hours = corectedDate(currentDAte.getHours())
    const minutes = corectedDate(currentDAte.getMinutes())
    const second = corectedDate(currentDAte.getSeconds())
    const day = corectedDate(currentDAte.getDate())
    const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
    const monthIndex = currentDAte.getMonth()
    const month = months[monthIndex]
    return `${hours}:${minutes}:${second} ${day} ${month}`
}

function generateId() {
    const id = String(Math.random())
    return id.slice(-5)
}

function createTask(event) {
    event.preventDefault()
    if (inputAdd.value) {
        todos.push({id: generateId(), date: getDate(), text: inputAdd.value})
        localStorage.setItem('todos', JSON.stringify(todos))
        inputAdd.value = ''
        renderTask()
    }
}

buttonSubmit.addEventListener('click', (event) => createTask(event))

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

renderTask()