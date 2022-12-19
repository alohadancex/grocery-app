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

// add item
function addItem(e) {
	e.preventDefault()
	const value = grocery.value
	const id = new Date().getTime().toString()

	if (value && !editFlag) {
		const element = document.createElement('article')
		let attr = document.createAttribute('data-id')
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
		// append child
		list.appendChild(element)
		// display alert
		displayAlert('item added to the list', 'success')
		// show container
		container.classList.add('show-container')
		// set local storage
		addToLocalStorage(id, value)
		// set back to default
		setBackToDefault()
	} else if (value && editFlag) {
		displayAlert('value changed', 'success')
		// edit  local storage
	} else {
		displayAlert('please enter value', 'danger')
	}
}
// add item

// display alert
function displayAlert(text, action) {
	alert.classList.add(`alert-${action}`)
	alert.textContent = text

	// change display alert
	setTimeout(() => {
		alert.classList.remove(`alert-${action}`)
		alert.textContent = ''
	}, 1000)
}
// display alert

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
	// localStorage.remove('list')
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
	console.log('added to local storagre')
}
// local storage
