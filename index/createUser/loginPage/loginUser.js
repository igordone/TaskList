const form = document.getElementById('form');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

const btn_login = document.getElementById('btn-login');
btn_login.addEventListener('click', function(event){
  event.preventDefault();
  checkInputs();
});

function checkInputs(){
  let b = validaEmail(email.value);
  let c = validaSenha(senha);
    
  if(!b || !c ){   //Verifica se as variaveis a,b e c que correspondem aos inputs (a-nome, b-email, c-senha) são diferentes de TRUE (! = não(false))
    Swal.fire({ //alert show de bola (sweet alert)
      title: 'Revise os campos',
      text: 'E-mail ou Senha incorretos!',
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
    //alert(`os seguintes campos estão incorretos: ${!b ? 'e-mail, ' : ''} ${!c ? 'senha ' : '.'}`); //swal = alert('') - Forma de se fazer sem o sweet alert
  }else{
    loginUser(email.value,senha.value);
  }
}

function validaEmail(email){
  const emailRegex = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/); //Funciona como um identificador de caracteres, onde o usuário deverá seguir a sequencia ditada em emailRegex
  
  if(emailRegex.test(email) || email.value ==='' ){ 
    return true; 
  }else{              //Se o usuario deixar o campo vazio ou não corresponder a sequência ditada a cima, retorna Falso
    return false;
  }
}
function validaSenha(senha){
  if(senha.value.length <= 8 ){    //Caso a senha digitada pelo usuário seja menor ou igual a 8, retorna falso
    return false;
  }else{
    return true;
  }
}

async function loginUser(email, senha){

  let loginUser = {
    email : email,
    password : senha
  };
  
    //Method Post
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginUser)
  };

  const api_response = await fetch('http://localhost:3333/sessions/', options)
  if(api_response.status === 200){
    const data = await api_response.json();
    console.log(data);
    localStorage.setItem('token', JSON.stringify(data.token));
    console.log('login success');
    window.location.href = "/index/createUser/taskPage/task.html";
  } else if(api_response.status === 400){
    Swal.fire({ //alert show de bola (sweet alert)
      title: 'Revise os campos',
      text: 'E-mail ou Senha incorretos',
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
  }
}