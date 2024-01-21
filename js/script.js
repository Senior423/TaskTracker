"use strict"

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

