/*Elementos DOM */
const form = document.getElementById('form');

const nome = document.getElementById('usuario');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

const btn = document.getElementById('btn');
btn.addEventListener('click', function(event){
  event.preventDefault(); //Impede que formulario recarregue as informações da página ao clicar no botão enviar

  checkInputs();
});

function checkInputs(){
  let a= validaNome(nome.value);
  let b = validaEmail(email.value);
  let c = validaSenha(senha);
  
  if(!a || !b || !c ){   //Verifica se as variaveis a,b e c que correspondem aos inputs (a-nome, b-email, c-senha) são diferentes de TRUE (! = não(false))
    Swal.fire({ //alert show de bola (sweet alert)
      title: 'Revise os campos',
      text: `Preencha o campo ${!a ? ' USUÁRIO corretamente  ' : '                 '} ${!b ? ' E-MAIL corretamente ' : '            '} ${!c ? ' SENHA corretamente ' : '                '}`,
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  }else{
    createUser(); //Se as informações da função requisitada forem TRUE, chama a função e continua para o FETCH na API
  }
}

function validaNome(n){
  const userRegex = new RegExp(/^[a-zA-Z]+[a-zA-Z0-9_]+[a-zA-Z0-9]$/);

  if(userRegex.test(n) && n.length >= 4 && n.length < 25){
    return true;
  } else{
    return false;
  }
};

function validaEmail(email){
  const emailRegex = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/); //Funciona como um identificador de caracteres, onde o usuário deverá seguir a sequencia ditada em emailRegex

  if(emailRegex.test(email) || email.value ==='' ){ 
    return true; 
  }else{                        //Se o usuario deixar o campo vazio ou não corresponder a sequência ditada a cima, retorna Falso
    return false;
  }
};
function validaSenha(senha){
  if(senha.value.length <= 8 ){    //Caso a senha digitada pelo usuário seja menor ou igual a 8, retorna falso
    return false;
  }else{
    return true;
  }
};

//Função CriaUsuario + Fetch()
function createUser(){
  
  let user = {
    name : nome.value,
    email : email.value,
    password : senha.value
  };

  //Method Post
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  fetch('http://localhost:3333/users/', requestOptions)
  .then(function(response){ 
    if(response.status === 400){
      console.log('erro!')
    }else{
      console.log('sigUP success')
      window.location.href = "/index/createUser/loginPage/loginUser.html";
    }
  });
};