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

//---------------------------API------------------------------

let dadoEntrar = {name: nome}
function entrar() {
const promessaEntrar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dadoEntrar)
promessaEntrar.then(sucesso)
promessaEntrar.catch(erro)}
entrar()
function sucesso(resposta){
    console.log('foi')
}
function erro(resposta){
    if (resposta.response.status===400) {
        nome = prompt("Qual o seu nome")
        dadoEntrar = {name: nome}
        entrar()
    }
} 

//---------------------------API------------------------------

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