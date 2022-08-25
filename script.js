document.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        const botao = document.querySelector('.icon')
        botao.click()
    }
})

function haha(){
    alert('HAHAHAHAHAHAHAAHAHAHAHAHAHAHAAH CORINGUEI')
}

const nome = prompt("Qual o seu nome")
const main = document.querySelector('.main')
let texto = document.querySelector('.texto')

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
            <span ><strong>${nome}</strong> para <strong>Todos</strong>: ${texto.value}</span>
        </div></li>`;
    texto.value="";
    }
}