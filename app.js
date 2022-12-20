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

const deleteBtn = document.querySelector('.delete-btn')
const editBtn = document.querySelector('.edit-btn')

// add item
function addItem(e) {
	e.preventDefault()

	const value = grocery.value
	const id = new Date().getTime().toString()

	if (value !== '' && !editFlag) {
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
		// apend child
		list.appendChild(element)
		// show container
		container.classList.add('show-container')
		// display success
		displayAlert('added on list', 'success')
		// addToLocalStorage
		addToLocalStorage(id, value)
		// setBackToDefaul
		setBackToDefault()
	} else if (value && editFlag) {
		setBackToDefault()
	} else {
		displayAlert('please enter the value', 'danger')
	}
}
// add item

// change display alert
function displayAlert(text, action) {
	alert.classList.add(`alert-${action}`)
	alert.textContent = text

	// remove alert
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
		items.forEach(function (item) {
			list.removeChild(item)
		})
	}
	container.classList.remove('show-container')
	displayAlert('empty list', 'danger')
	setBackToDefault()
	// localStorage.remove(id, value)
}
// clear items

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
	console.log('add to local storage')
}
// local storage
