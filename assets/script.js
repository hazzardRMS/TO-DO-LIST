const newTaskBtn = document.getElementById('new-task--btn');
const newTaskInput = document.getElementById('new-task--input');
const taskList = document.getElementById('task-list');
let counter = 1
newTaskBtn.addEventListener('click', addNewTask);
newTaskInput.addEventListener('keyup',addNewTaskWithBtn);
function addNewTask(){
    if(newTaskInput.value !== ''){
        const taskName = document.createElement ('p')
    taskName.className = 'task-item'
    taskName.innerText = newTaskInput.value;

    const taskRemoveBtn = document.createElement('div');
    taskRemoveBtn.className = 'remove-task-btn'
    taskRemoveBtn.innerHTML ='<i class="fas fa-trash"></i>' 
    taskRemoveBtn.addEventListener('click', removeTask)

    const taskCheck = createInput('checkbox', 'check-item', 'check-task');
    taskCheck.className = 'checkbox-item'

    taskCheck.addEventListener('click', checkItem);

    const taskLi = document.createElement('li');
    taskLi.id = 'task-' + counter;
    taskLi.classList = 'task-item--container'
    
    taskLi.append(taskCheck,taskName, taskRemoveBtn)
    taskList.appendChild(taskLi)
    counter++
    newTaskInput.value = ''
    newTaskInput.focus()
    } else{
        alert('Você precisa digitar um nome para a tarefa!')
    }
    
}
function addNewTaskWithBtn(ev){
    if(ev.key === 'Enter'){
       addNewTask()
    }
}

function removeTask(){
     this.parentNode.remove()
   
}

function createInput(type, id, value){
const newInput = document.createElement('input');
newInput.type = type;
newInput.id = id;
newInput.value = value;
return newInput
}

function checkItem(ev){
const li = ev.currentTarget.parentNode
const p = li.children[1]

p.style.textDecoration = 'line-through'
p.style.backgroundColor = 'greenyellow'
ev.currentTarget.setAttribute('disabled', 'disabled')
}