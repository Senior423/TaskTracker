"use strict"

const root = document.getElementById('root')
const control = document.createElement('div')
control.classList.add('control')
root.append(control)

const form = document.createElement('form')
form.method = 'get'
control.append(form)

function createButton(className, type, text) {
    const button = document.createElement('button')
    button.className = className
    button.type = type
    button.textContent = text
    return button
}

form.append(createButton('control__delete-all', 'button', 'Удалить всё'))

function createInput(className, type, placeholder) {
    const input = document.createElement('input')
    input.className = className
    input.type = type
    input.placeholder = placeholder
    return input
}

form.append(createInput('control__input-add', 'input', 'Описание задачи'))
form.append(createButton('control__button-submit', 'submit', 'Добавить'))

