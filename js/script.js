"use strict"

import { renderTask } from "./render.js"

export let todos = JSON.parse(localStorage.getItem('todos')) || []

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

export const taskList = document.createElement('div')
taskList.classList.add('task__list')
root.append(taskList)

renderTask()