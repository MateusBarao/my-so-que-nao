let inputNome = document.getElementById('nome');

let inputEmail = document.getElementById('email');

let inputSenha = document.getElementById('senha');

let inputConfirma = document.getElementById('confirmacao');

let inputFile = document.getElementById('foto');

let form = document.getElementById('formularioCadastro');

let formLogin = document.getElementById('formularioLogin');

const verificaCampoFoiPreenchido = (evento)=>{

    console.log(evento);

    if(evento.target.value == '') {
        evento.target.style.outline = "2px solid #993300";
        evento.target.setAttribute('placeholder', `Por favor preencha o campo ${evento.target.name}.`)

    } else {
        evento.target.style.outline = "none"
        evento.target.setAttribute('placeholder', '')
    }
}

const onFileChange = (evt) => {
    let img = document.getElementById('output');
    img.src = URL.createObjectURL(evt.target.files[0])

}

inputNome.addEventListener('blur', verificaCampoFoiPreenchido);

inputEmail.addEventListener('blur', verificaCampoFoiPreenchido);

inputSenha.addEventListener('blur', verificaCampoFoiPreenchido);

inputConfirma.addEventListener('blur', verificaCampoFoiPreenchido);

inputFile.addEventListener('change', onFileChange);


form.addEventListener('submit', 
    async (evt) => {
        evt.preventDefault();
        
        let formData = new FormData(form);

        let resposta = await fetch('http://localhost:3000/api/v1/usuarios', 
            {
                method:'POST',
                body: formData
            }
        );

        if(resposta.status == 409){alert("Usuário já cadstrado")}
        if(resposta.status == 500){alert("Erro. Tente novamente mais tarde.")}
        if(resposta.status == 201){
            let usuario = await resposta.json();

            mostrarApp(usuario);
        }

        });

formLogin.addEventListener('submit', onFormLoginSubmit);

function onFormLoginSubmit(evt) {
    evt.preventDefault();
    login();
}

async function login() {
    let email = document.getElementById('login-email').value;

    let senha = document.getElementById('login-senha').value;

    let resposta = await fetch('http://localhost:3000/api/v1/usuarios/login', 
        {
            method: 'POST',
            body: JSON.stringify({email, senha}),
            headers: {'Content-Type': 'application/json'}
        }
    )

    if (resposta.status == 200){
        let corpoDaResposta = await resposta.json();
    
        sessionStorage.setItem('mysoquenao-token', corpoDaResposta.token);
        sessionStorage.setItem('usuario', JSON.stringify(corpoDaResposta.usuario));

        mostrarApp(corpoDaResposta.usuario);

        carregarAmigos();
    } else if (resposta.status == 500) {
        return alert("Tente novamente mais tarde")
    } else {
        return alert("Falha de autenticação")
    }
    
}

function mostrarApp(usuario) {
    console.log(usuario)

    document.getElementById('registro').style.display = 'none';

    document.getElementById("login").style.display = 'none'

    document.getElementById('app').style.display = 'block';

    document.getElementById('app-nome').innerText = usuario.nome;

    let aEmail = document.getElementById('app-email');
    aEmail.innerText = usuario.email;
    aEmail.setAttribute('href', `mailto:${usuario.email}`);

    let imgAvatar = document.getElementById('app-avatar');
    imgAvatar.setAttribute('alt', `Foto de ${usuario.nome}`)
    imgAvatar.setAttribute('src', `img/avatares/${usuario.foto}`)
}

async function carregarAmigos() {
    let resposta = await fetch(
        'api/v1/amigos',
        {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${sessionStorage.getItem('mysoquenao-token')}`
            }

        }
    )
}