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

    }

    get data() {
        let data = new Date(this._data.value);
    }

    get imagem() {

    }

    buscarDados() {
        let xhr = new XMLHttpRequest();
        const input = document.getElementById("data");
        let API_KEY = "gP9xmpKhTuRPySvSsoB3rGNMsqkznLacF9Effufd";
                
        xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${input.value}`, false);
        xhr.addEventListener("load" , () => {
            if(xhr.status == 200) {        
                let dadosAPI = JSON.parse(xhr.responseText);
                let imagem = dadosAPI.url;
                let texto = dadosAPI.explanation;
                this._imagem = imagem;
                this._texto = texto;
                this._data = input.value;
                campoImagem.innerHTML = `<img class="imagem" src="${dadosAPI.url}">`;
                //campoTexto.innerHTML = dadosAPI.explanation;
            }
        })
        xhr.send();
        
    }
}

class NasaController {
    buscarPessoa() {
        
        let info = new Nasa();
        info.buscarDados();
        
        let visualizar = new NasaView(info);
        visualizar.desenhar(campoImagem)
    }

}

// Cuida da vizualização
class NasaView {
    constructor(info)  {
        this._elemento 
    }

    desenhar(elementoPai) {
        elementoPai.append(this._elemento)
    }
}

let controller = new NasaController();

const btn = document.getElementById("procurarImagem");
btn.addEventListener("click", () => {
    controller.buscarPessoa();
})