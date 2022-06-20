let inputNome = document.getElementById('nome');

let inputEmail = document.getElementById('email');

let inputSenha = document.getElementById('senha');

let inputConfirma = document.getElementById('confirmacao');

let inputFile = document.getElementById('foto');

let form = document.getElementById('formularioCadastro');

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

function mostrarApp(usuario) {
    console.log(usuario)

    document.getElementById('registro').style.display = 'none';

    document.getElementById('app').style.display = 'block';

    document.getElementById('app-nome').innerText = usuario.nome;

    let aEmail = document.getElementById('app-email');
    aEmail.innerText = usuario.email;
    aEmail.setAttribute('href', `mailto:${usuario.email}`);

    let imgAvatar = document.getElementById('app-avatar');
    imgAvatar.setAttribute('alt', `Foto de ${usuario.nome}`)
    imgAvatar.setAttribute('src', `img/avatares/${usuario.foto}`)
}

let amigos = [
    {
        id: 1,
        nome: "Wendel", 
        email: "wendel@digitalhouse.com",
        foto: "palha.jpg"
        
    },
    {
        id: 2,
        nome: "Sérgio",
        email: "sergio@digitalhouse.com",
        foto: "peixeira.jpg"
    },
    {
        id: 3,
        nome: "Silvia",
        email: "silvia@digitalhouse.com",
        foto: "rh.png"
    }
]

let listaDeAmigos = document.getElementById("listaDeAmigos");

let string = '';

for (let i = 0; i < amigos.length; i++) {
    const amigo = amigos[i];
    string += `
        <article>
            <img src="img/${amigo.foto}" alt="Foto de ${amigo.nome}">
            <span>${amigo.nome}</span>
            <a href="mailto:${amigo.email}">${amigo.email}</a>
        </article>
    `
}


listaDeAmigos.innerHTML += string;