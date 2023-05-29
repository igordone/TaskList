const userInfo = document.querySelector('.usuario');
const userEmail = document.querySelector('.email');
const userPass = document.querySelector('.senha');
const token = JSON.parse(localStorage.getItem('token'));

document.addEventListener('DOMContentLoaded', async () => {
   await showUser();
});

const getUser = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    config_showUser = {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}, 
    };

    let data = await fetch(`http://localhost:3333/users/`, config_showUser);
    if(data.status === 200){
        data = data.json();
        return data;
    }
    else{
        console.log('erro');
    }
    await showUser();
}

async function showUser(){
    let data = await getUser();
    console.log(data);
    userInfo.innerHTML = data.user.name;
    userEmail.innerHTML = data.user.email;
    userPass.innerHTML = data.user.password_hash;
}
