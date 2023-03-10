const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editId = ''

//event linsteners
form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)
window.addEventListener('DOMContentLoaded', setUpItems)

// add item
function addItem(e) {
	e.preventDefault()
	const value = grocery.value
	const id = new Date().getTime().toString()

	if (value && !editFlag) {
		creatListItem(id, value)
		// show container
		container.classList.add('show-container')
		// set back to default
		setBackToDefault()
		// display alert
		displayAlert('item added in your list', 'success')
		// add to local storage
		addToLocalStorage(id, value)
	} else if (value && editFlag) {
		editElement.innerHTML = value
		displayAlert('value changed', 'success')

		// edit  local storage
		editLocalStorage(editId, value)
		setBackToDefault()
	} else {
		displayAlert('please add your item in list', 'danger')
	}
}
// add item

// change display alert
function displayAlert(text, action) {
	alert.classList.add(`alert-${action}`)
	alert.textContent = text

	setTimeout(() => {
		alert.classList.remove(`alert-${action}`)
		alert.textContent = ''
	}, 1000)
}
// change display alert

// clear items
function clearItems() {
	const items = document.querySelectorAll('.grocery-item')
	if (items.length > 0) {
		items.forEach(item => {
			list.removeChild(item)
			displayAlert('items removed from your list', 'danger')
		})
		container.classList.remove('show-container')
		setBackToDefault()
		localStorage.removeItem('list')
	}
}
// clear items

// delete function
function deleteItems(e) {
	const element = e.currentTarget.parentElement.parentElement
	const id = element.dataset.id
	list.removeChild(element)

	if (element.children.lenght === 0) {
		container.classList.remove('show-container')
		setBackToDefault()
	}
	displayAlert('item removed from your list', 'danger')
	removeFromLocalStorage(id)
}
// delete function

// edit function
function editItems(e) {
	const element = e.currentTarget.parentElement.parentElement

	editElement = e.currentTarget.parentElement.previousElementSibling
	grocery.value = editElement.innerHTML
	editFlag = true
	editId = element.dataset.id
	submitBtn.textContent = 'Edit'
}
// edit function

// set back to default
function setBackToDefault() {
	grocery.value = ''
	editFlag = false
	editId = ''
	submitBtn.textContent = 'submit'
}
// set back to default

// local storage
function addToLocalStorage(id, value) {
	const grocery = {
		id: id,
		value: value,
	}
	let items = getLocalStorage()
	items.push(grocery)
	localStorage.setItem('list', JSON.stringify(items))
}
// local storage

// remove from local storage
function removeFromLocalStorage(id) {
	let items = getLocalStorage()

	items = items.filter(item => {
		if (item.id !== id) {
			return item
		}
	})
	localStorage.setItem('list', JSON.stringify(items))
}
// remove from local storage

// edit to local storage
function editLocalStorage(id, value) {
	let items = getLocalStorage()

	items = items.map(function (item) {
		if (item.id === id) {
			item.value = value
		}
		return item
	})
	localStorage.setItem('list', JSON.stringify(items))
}
// edit to local storage

// get local storage
function getLocalStorage() {
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: []
}
// get local storage

// setUpItems
function setUpItems() {
	let items = getLocalStorage()
	if (items.length > 0) {
		items.forEach(item => {
			creatListItem(item.id, item.value)
		})
		container.classList.add('show-container')
	}
}
// setUpItems

function creatListItem(id, value) {
	const element = document.createElement('arcticle')
	const attr = document.createAttribute('data-id')
	attr.value = id
	element.setAttributeNode(attr)
	element.classList.add('grocery-item')
	element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `
	// buttons
	const deleteBtn = element.querySelector('.delete-btn')
	const editBtn = element.querySelector('.edit-btn')
	deleteBtn.addEventListener('click', deleteItems)
	editBtn.addEventListener('click', editItems)
	// apend child
	list.appendChild(element)
}
