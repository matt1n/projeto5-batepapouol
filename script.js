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
    console.log(resposta.response.status)
}


//---------------------------fim API status------------------------------

function mensagem() {
    if (texto.value!==""){
        main.innerHTML += `<li><div class="mensagem">
            <span ><strong>${nome}</strong> para <strong>Todos</strong>: ${texto.value}</span>
        </div></li>`
    texto.value=""
    let ultimaMensagem = main.children.length-1
    let novaMensagem = main.children[ultimaMensagem]
    novaMensagem.scrollIntoView();
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