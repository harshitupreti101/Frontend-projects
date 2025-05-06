document.addEventListener('DOMContentLoaded',()=>{
    
const input = document.getElementById(`todo-input`);
const btn = document.getElementById(`add-task-btn`);
const todoList = document.getElementById(`todo-list`);
let arr = JSON.parse(localStorage.getItem(`arr`)) || []

arr.forEach(arr => {
    renderTasks(arr);
});
btn.addEventListener(`click`,()=>{
    const val = input.value.trim()
    if (val === "") return;
    let obj = {
        text:val,
        id:Date.now( ),
        completed:false,
    }
    arr.push(obj);
    saveTasks();
    renderTasks(obj);
    input.value = "";
})

function renderTasks(tasks) {
    const li = document.createElement(`li`);
    li.setAttribute(`data-id`,tasks.id);
    li.innerHTML = `<span>${tasks.text}</span> <button>delete</button>
    `
    li.querySelector(`button`).addEventListener(`click`,(e) => {
        e.stopPropagation();
        arr = arr.filter ((t) => t.id !== tasks.id);
        li.remove();
        saveTasks();
    }); 
    todoList.appendChild(li);
}
 
function saveTasks() {
    localStorage.setItem('arr',JSON.stringify(arr));
}
})
