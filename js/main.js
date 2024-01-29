import { renderTask } from "./render.js"
import { createTask } from "./task.js"

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

export const inputAdd = document.createElement('input')
inputAdd.classList.add('control__input-add')
inputAdd.type = 'input'
inputAdd.placeholder = 'Описание задачи'
controlForm.append(inputAdd)

const buttonSubmit = document.createElement('button')
buttonSubmit.className = 'control__button-submit'
buttonSubmit.type = 'input'
buttonSubmit.textContent = 'Добавить'
controlForm.append(buttonSubmit)

buttonSubmit.addEventListener('click', (event) => createTask(event))

export const taskList = document.createElement('div')
taskList.classList.add('task__list')
root.append(taskList)

addEventListener('DOMContentLoaded', renderTask)