import { inputAdd, todos } from "./main.js"
import { renderTask } from "./render.js"

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

export function createTask(event) {
  event.preventDefault()
  if (inputAdd.value) {
      todos.push({id: generateId(), date: getDate(), text: inputAdd.value})
      localStorage.setItem('todos', JSON.stringify(todos))
      inputAdd.value = ''
      renderTask()
  }
}