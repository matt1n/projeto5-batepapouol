const telaInicial = document.querySelector('.telaInicial')
const telaCarregamento = document.querySelector('.telaCarregamento')
const chat = document.querySelector('.chat')
let usuarioMarcado = document.querySelector('.main').children[0]
let visibilidadeMarcada = document.querySelector('.tipoMensagem').children[0]
let visibilidade = visibilidadeMarcada.children[0].children[1].innerHTML
let nomeUsuario = usuarioMarcado.children[0].children[1].innerHTML


document.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        if (!chat.classList.contains('oculta')){
            const botao = document.querySelector('.icon')
            botao.click()
        } else {
            const botaoEntrar = document.querySelector('button')
            botaoEntrar.click()
        }
    }
})

function haha(){
    alert('HAHAHAHAHAHAHAAHAHAHAHAHAHAHAAH CORINGUEI')
}

const main = document.querySelector('.main')
let texto = document.querySelector('.texto')
let inputNome = document.querySelector('.entrada')
let nome = ""

//---------------------------API entrar------------------------------

function entrar() {
    
    nome = inputNome.value
    if (nome!==""){
        telaInicial.classList.add('oculta')
        telaCarregamento.classList.remove('oculta')
        dadoEntrar = {name: nome}
        const promessaEntrar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dadoEntrar)
        promessaEntrar.then(sucessoEntrar)
        promessaEntrar.catch(erroEntrar)
    }
}
function sucessoEntrar(resposta){
    telaCarregamento.classList.add('oculta')
    chat.classList.remove('oculta')
}
function erroEntrar(resposta){
    if (resposta.response.status===400) {
        telaCarregamento.classList.add('oculta')
        telaInicial.classList.remove('oculta')
        nome = alert("Esse nome já está em uso, por favor tente outro :3")
    }
} 

//---------------------------fim API entrar------------------------------
//---------------------------API status------------------------------

function testarStatus() {
    if (nome!==""){
        const promessaStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dadoEntrar)
        promessaStatus.then(sucessoStatus)
        promessaStatus.catch(erroStatus)
    }
}
let aaaa = setInterval(testarStatus, 5000)
function sucessoStatus(resposta) {
}
function erroStatus(resposta) {
    clearInterval(aaaa)
    window.location.reload(true)
}

//---------------------------fim API status------------------------------
//---------------------------API busca mensagem------------------------------

function buscarMensagens() {
    const promessaMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessaMensagem.then(sucessoMensagem)
    promessaMensagem.catch(erroMensagem)
}
buscarMensagens()

function sucessoMensagem(resposta) {
    main.innerHTML = ""
    for (i=0; i<resposta.data.length; i++) {
        if (resposta.data[i].type==="message") {
            main.innerHTML += `<li><div class="mensagem">
                <span class="hora">(${resposta.data[i].time})</span> 
                <span><strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</span>
            </div></li>`
        } else if (resposta.data[i].type==="private_message" && 
        (resposta.data[i].from === nome || resposta.data[i].to === nome || resposta.data[i].to === "Todos")) {
           
            main.innerHTML += `<li><div class="mensagem reservado">
                <span class="hora">(${resposta.data[i].time})</span> 
                <span><strong>${resposta.data[i].from}</strong> reservadamente para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</span>
            </div></li>`
        } else {
            main.innerHTML += `<li><div class="mensagem status">
                <span class="hora">(${resposta.data[i].time})</span> 
                <span><strong>${resposta.data[i].from}</strong> ${resposta.data[i].text}</span>
            </div></li>`
        }
    }
    let ultimaMensagem = main.children.length-1
    let novaMensagem = main.children[ultimaMensagem]
    novaMensagem.scrollIntoView();
}
setInterval(buscarMensagens, 3000)
function erroMensagem(resposta) {
    console.log('iiii deu erro')
}

//---------------------------fim API busca mensagem------------------------------
//---------------------------API busca usuario------------------------------

function buscarUsuario(){
    const promessaBuscarParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promessaBuscarParticipantes.then(sucessoBuscarUsuario)
    promessaBuscarParticipantes.catch()
}

const listaUsuarios = document.querySelector('.listaUsuarios')

function sucessoBuscarUsuario(resposta) {
    listaUsuarios.innerHTML=""
    listaUsuarios.innerHTML+=`<li onclick="selecionaContato(this); mudaInput()">
    <div class="iconNome"><ion-icon name="people"></ion-icon>
    <span>Todos</span></div class="iconNome">
    <ion-icon class="check" name="checkmark-outline"></ion-icon>
</li>`
    for (i=0; i<resposta.data.length; i++) {
        listaUsuarios.innerHTML+=`<li data-identifier="participant" onclick="selecionaContato(this); mudaInput()">
        <div class="iconNome"><ion-icon name="person-circle"></ion-icon>
        <span>${resposta.data[i].name}</span></div class="iconNome">
        <ion-icon class="check" name="checkmark-outline"></ion-icon>
    </li>`
    }
}
buscarUsuario()
const para = setInterval(buscarUsuario, 10000)

//---------------------------fim API busca usuario------------------------------
const sobreTela = document.querySelector('.sobreTela')
function apareceSidebar(){
    sobreTela.classList.remove('oculta')
}
function someSidebar() {
    sobreTela.classList.add('oculta')
}

function marcaUsuario(elemento){
    usuarioMarcado = elemento
}
function marcaVisibilidade(elemento){
    visibilidadeMarcada=elemento
}

function selecionaContato(elemento){
    usuarioMarcado = document.querySelector('.listaUsuarios .selecionado')
    const serMarcado = elemento.children[1]
    if (usuarioMarcado!==null){
        usuarioMarcado.classList.remove('selecionado')
    }
    serMarcado.classList.add('selecionado')
    marcaUsuario(elemento)
}

function selecionaVisibilidade(elemento){
    let visibilidadeMarcada = document.querySelector('.tipoMensagem .selecionado')
    const serMarcado = elemento.children[1]

    visibilidadeMarcada.classList.remove('selecionado')
    serMarcado.classList.add('selecionado')
    marcaVisibilidade(elemento)
}

let destinaInput = document.querySelector('.input span')
function mudaInput() {
    visibilidade = visibilidadeMarcada.children[0].children[1].innerHTML
    nomeUsuario = usuarioMarcado.children[0].children[1].innerHTML
    destinaInput.innerHTML = `Enviando para ${nomeUsuario} (${visibilidade})`
    
}

//---------------------------API envia mensagem------------------------------

function mandarMensagem(){
    if (texto.value!=="" && visibilidade==="Público"){
        let enviarMensagem = {from: nome, to: nomeUsuario, text: texto.value, type: "message"}
        const promessaEnviaMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', enviarMensagem)
        promessaEnviaMensagem.then(buscarMensagens)
        texto.value= ""
        promessaEnviaMensagem.catch(erroEnviarMensagem)
        function erroEnviarMensagem(resposta){
            window.location.reload()
        }
    } else {
        let enviarMensagem = {from: nome, to: nomeUsuario, text: texto.value, type: "private_message"}
        const promessaEnviaMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', enviarMensagem)
        promessaEnviaMensagem.then(buscarMensagens)
        texto.value= ""
        promessaEnviaMensagem.catch(erroEnviarMensagem)
        function erroEnviarMensagem(resposta){
            window.location.reload()
        }
    }
}

//---------------------------fim API envia mensagem------------------------------

