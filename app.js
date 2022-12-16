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

function addItem(e) {
	e.preventDefault()
	const value = grocery.value
	const id = new Date().getTime().toString()

	if (value && !editFlag) {
		const element = document.createElement('article')
		element.classList.add('grocery-item')
		const attr = document.createAttribute('data-id')
		attr.value = id
		element.setAttributeNode(attr)
		element.innerHTML = `<p class="title">${value}</p>
					<div class="btn-container">
						<button type="button" class='edit-btn'>
							<i class="fas fa-edit"></i>
						</button>
						<button type="button" class='delete-btn'>
							<i class="fas fa-trash"></i>
						</button>
					</div>`
		// append element
		list.appendChild(element)
		//remove display alert
		displayAlert('item added to the list', 'success')
		// add to container
		container.classList.add('show-container')
		//add to Local storage
		addToLocalStorage(id, value)
		// set back to default
		setBackToDefault()
	} else if (value && editFlag) {
		console.log('editing')
	} else {
		displayAlert('please text your message', 'danger')
	}
	grocery.value = ''
}

// display alert
function displayAlert(text, action, value) {
	alert.classList.add(`alert-${action}`)
	alert.textContent = text

	// change display alert
	setTimeout(() => {
		alert.classList.remove(`alert-${action}`)
		alert.textContent = ''
	}, 1000)
}

// set back to default
function setBackToDefault() {
	console.log('set back to default')
}

// local storage
function addToLocalStorage(id, value) {
	console.log('added to local storage')
}
