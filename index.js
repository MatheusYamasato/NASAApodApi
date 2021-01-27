const campoTexto = document.getElementById("campoTexto");
const campoImagem = document.getElementById("campoImagem");
class Nasa {
    // Criaremos com strings vazias para pegarmos  o conteúdo diretamente da requisição da API
    constructor() {
        this._texto = "";
        this._data = "";
        this._imagem = "";
    }    
    get texto() {
        return this._texto;
    }    
    get data() {
        return this._data;
    }    
    get imagem() {
        return this._imagem;
    }    
    buscarDados() {
        let xhr = new XMLHttpRequest();
        const API_KEY = "gP9xmpKhTuRPySvSsoB3rGNMsqkznLacF9Effufd";
        let input = document.getElementById("data");        
        xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${input.value}`, false);
        xhr.addEventListener("load" , () => {
            if(xhr.status == 200) {        
                let dadosAPI = JSON.parse(xhr.responseText);
                let imagem = dadosAPI.url;
                let texto = dadosAPI.explanation;
                this._imagem = imagem;
                this._texto = texto;
                this._data = input.value;
                }
        })
        xhr.send();
    }
}
class NasaController {
    buscarPessoa() {
        // criamos uma nova "pessoa" da NASA para usamos os metodos que definimos na classe model
        let dados = new Nasa();
        dados.buscarDados();   
        
        // chamamos a função do NasaView
        let visualizar = new NasaView(dados);
        visualizar.desenhar();
    }   
}
// Cuida da vizualização
class NasaView {

    constructor(dados) {
        this._texto = document.getElementById("texto");
        this._imagem = document.getElementById("imagem");


        // detalha o conteúdo dos elementos
        this._imagem.src = dados.imagem;
        this._texto.textContent = dados.texto;
    }

    // Determina aonde vai ser inserido os campos
    desenhar() {
        campoImagem.append(this._imagem);
        campoTexto.append(this._texto);
    }
}

let controller = new NasaController();

const btn = document.getElementById("procurarImagem");
btn.addEventListener("click", () => {
    controller.buscarPessoa();
})


// 1ª Dar split no value da data, (-), retorna 3 posições AAAAMMDD

// ---------------- Mais fácil ------------------------
// 2ª Transformar o value da data num new Date("string")  
