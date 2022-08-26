document.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        const botao = document.querySelector('.icon')
        botao.click()
    }
})

function haha(){
    alert('HAHAHAHAHAHAHAAHAHAHAHAHAHAHAAH CORINGUEI')
}

let nome = prompt("Qual o seu nome")
const main = document.querySelector('.main')
let texto = document.querySelector('.texto')

//---------------------------API entrar------------------------------

let dadoEntrar = {name: nome}
function entrar() {
    const promessaEntrar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dadoEntrar)
    promessaEntrar.then(sucessoEntrar)
    promessaEntrar.catch(erroEntrar)
}
entrar()
function sucessoEntrar(resposta){
    console.log('foi')
}
function erroEntrar(resposta){
    if (resposta.response.status===400) {
        nome = prompt("Qual o seu nome")
        dadoEntrar = {name: nome}
        entrar()
    }
} 

//---------------------------fim API entrar------------------------------
//---------------------------API status------------------------------

function testarStatus() {
    const promessaStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dadoEntrar)
    promessaStatus.then(sucessoStatus)
    promessaStatus.catch(erroStatus)
}
let aaaa = setInterval(testarStatus, 5000)
function sucessoStatus(resposta) {
    console.log('Pai/Mãe tá on')
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
                <span class="hora">${resposta.data[i].time}</span> 
                <span><strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</span>
            </div></li>`
        } else if (resposta.data[i].type==="private_message") {
            main.innerHTML += `<li><div class="mensagem reservado">
                <span class="hora">${resposta.data[i].time}</span> 
                <span><strong>${resposta.data[i].from}</strong> reservadamente para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</span>
            </div></li>`
        } else {
            main.innerHTML += `<li><div class="mensagem status">
                <span class="hora">${resposta.data[i].time}</span> 
                <span><strong>${resposta.data[i].from}</strong> ${resposta.data[i].text}</span>
            </div></li>`
        }
    }
}
setInterval(buscarMensagens, 3000)
function erroMensagem(resposta) {
    console.log('iiii deu erro')
}

//---------------------------fim API busca mensagem------------------------------
//---------------------------API envia mensagem------------------------------

function mandarMensagem(){
    let enviarMensagem = {from: nome, to: "Todos", text: texto.value, type: "message"}
    if (texto.value!==""){
        const promessaEnviaMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', enviarMensagem)
        promessaEnviaMensagem.then(buscarMensagens)
        texto.value= ""
        promessaEnviaMensagem.catch(erroEnviarMensagem)
        function erroEnviarMensagem(resposta){
            console.log(resposta)
        }
    }
}

//---------------------------API envia mensagem------------------------------
function mensagem() {
    if (texto.value!==""){
        main.innerHTML += `<li><div class="mensagem">
            <span ></span><span ><strong>${nome}</strong> para <strong>Todos</strong>: ${texto.value}</span>
        </div></li>`
    texto.value=""
    }

}
function mensagemReservada() {
    if (texto.value!==""){
        main.innerHTML += `<li><div class="mensagem reservado">
            <span ><strong>${nome}</strong> reservadamente para <strong>Todos</strong>: ${texto.value}</span>
        </div></li>`;
    texto.value="";
    }
}