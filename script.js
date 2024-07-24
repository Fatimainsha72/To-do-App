const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let todoJson = JSON.parse(localStorage.getItem("list-container")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
        return;
    }
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("delete");
        li.appendChild(span);
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"  && e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    const tasks = [];
    listContainer.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            checked: task.classList.contains('checked')
        });
    });
    localStorage.setItem("list-container", JSON.stringify(tasks));
}

function showTask(){
     listContainer.innerHTML = '';
     const tasks = JSON.parse(localStorage.getItem("list-container")) || [];
     tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task.text;
        if(task.checked){
            li.classList.add('checked');
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("delete");
        li.appendChild(span);
        listContainer.appendChild(li);
     });
}

showTask();

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if(el.classList.contains('active')){
            el.classList.remove('active');
            filter = '';
        } else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = el.dataset.filter;
    }
    applyFilter();
});
});
deleteAllButton.addEventListener("click", () => {
    listContainer.innerHTML = '';
    saveData();
});

function applyFilter(){
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        switch (filter) {
            case 'completed':
                task.style.display = task.classList.contains('checked') ? '' : 'none';
                break;
                case 'pending':
                    task.style.display = !task.classList.contains('checked') ? '' : 'none';
                break;
                default:
                    task.style.display = '';
                    break;

        }
    });
}
