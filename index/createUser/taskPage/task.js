let dataCreate;
document.addEventListener('DOMContentLoaded', async () => {
    dataCreate = await showTask();
    renderTask(dataCreate);
});

async function initialRender(){
    dataCreate = await showTask();
    renderTask(dataCreate);
    console.log('Dados >>' , dataCreate);
}

const main = document.querySelector('.main');

//buttons
const btn_add = document.getElementById('btn-add');

//Inputs to create a new task
const newtask = document.querySelector('.novaTask');
const detailtask = document.querySelector('.detalhe-task');

btn_add.addEventListener('click', function(){
    checkInputs(newtask);
});

function checkInputs(newtask){
    if(newtask.value.length < 4 || newtask.value ===''){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'warning',
            title: 'Preencha o campo corretamente'
        });
    }
    else{
        createTask();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'Tarefa registrada'
        });
    }
}

async function createTask(){
    let task = {
        task: newtask.value
    };
    //Post
    const token = JSON.parse(localStorage.getItem('token'));
    config_create = {
        method: 'POST',
        headers: {'Content-type' : 'application/json', 'Authorization' : `Bearer ${token}`}, 
        body: JSON.stringify(task)
    };

    fetch('http://localhost:3333/tasks', config_create)
    .then(response => response.json())
    .then(async data => {
        dataCreate = await showTask();
        console.log('Dados >>' , dataCreate);
        renderTask(dataCreate);
    })
    .catch(error => console.error(error));
}

async function showTask(){
    const token = JSON.parse(localStorage.getItem('token'));
    config_show = {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}, 
    };

    let data = await fetch(`http://localhost:3333/tasks`, config_show);
    data = data.json();
    return data;
}

function deleteTask(id){
    const token = JSON.parse(localStorage.getItem('token'));

    config_dell = {
        method: 'DELETE',
        headers: {'Authorization' : `Bearer ${token}`}
    };
    fetch(`http://localhost:3333/tasks/${id}`, config_dell);
}

async function statusTask(id, status){
    const token = JSON.parse(localStorage.getItem('token'));
    let task_status = {
        check : status
    };
    config_status = {
        method: 'PUT',
        headers: {'Content-type' : 'application/json','Authorization' : `Bearer ${token}`},
        body: JSON.stringify(task_status)
    };
    await fetch(`http://localhost:3333/tasks/${id}`, config_status);
    console.log(task_status);
    initialRender(); 
}

function renderTask(dataCreate){
    const taskContainers = document.querySelectorAll('.task-container');
    if (taskContainers.length > 0) {
        for (let i = 0; i < taskContainers.length; i++) {
            taskContainers[i].remove();
        }
    }
    for(let i = 0; i < dataCreate.length; i++ ){
        //renderizing task infos
        const task_container = document.createElement('div');
        task_container.classList.add('task-container');
        const task_controller = document.createElement('div');
        task_controller.classList.add('task-controller');
        const task_title = document.createElement('h4');
        task_title.classList.add('task-title');
        task_controller.appendChild(task_title); //atribui a task-title à task-controller

        //buttons
        const buttons_controller = document.createElement('div');
        buttons_controller.classList.add('buttons-controller');
        task_container.appendChild(buttons_controller);

        //btn-dell
        const btn_dell = document.createElement('button');
        btn_dell.addEventListener('click', function(){
            deleteTask(dataCreate[i].id);
            task_container.remove();
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              })
              Toast.fire({
                icon: 'success',
                title: 'Tarefa deletada'
            });
        });                                                                    
        btn_dell.classList.add('btn-dell');
        const ibtn_dell = document.createElement('i');
        ibtn_dell.setAttribute('class','fa-solid fa-trash');
        btn_dell.appendChild(ibtn_dell);
        buttons_controller.appendChild(btn_dell);

        //btn-confirm
        const btn_confirm = document.createElement('button');
        btn_confirm.addEventListener('click', () =>{
            if(dataCreate[i].check === false){
                statusTask(dataCreate[i].id, true);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    })
                    Toast.fire({
                    icon: 'success',
                    title: 'Parabéns! Tarefa concluída!'
                });
            }else if(dataCreate[i].check === true){
                statusTask(dataCreate[i].id, false);
                
            }else{
                console.log('fail');
            }
        });


        btn_confirm.classList.add('btn-confirm');
        const ibtn_confirm = document.createElement('i');
        ibtn_confirm.setAttribute('class', 'fa-solid fa-check');
        btn_confirm.appendChild(ibtn_confirm);
        buttons_controller.appendChild(btn_confirm);
        
        task_container.appendChild(task_controller); //atribui a task-controller à task-container
        task_container.appendChild(buttons_controller);

        main.appendChild(task_container);

        //rederizing contents
        if(dataCreate[i].check === true){
            task_container.style.backgroundColor = 'rgb(81, 105, 239)';
            ibtn_confirm.setAttribute('class','fa-solid fa-rotate-left');
            btn_confirm.style.backgroundColor = 'rgb(242, 211, 99)';
            task_title.style.color = 'white';
        }else{
            task_container.style.backgroundColor = 'rgb(255, 255, 255)';
            ibtn_confirm.setAttribute('class','fa-solid fa-check');
            btn_confirm.style.backgroundColor = 'rgb(91, 189, 159)';
            task_title.style.color = 'rgb(5, 5, 5)';
        }
        task_title.innerText = `${dataCreate[i].task}`;
    }
}