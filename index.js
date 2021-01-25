let xhr = new XMLHttpRequest();
let input = document.getElementById("data");
let btn = document.getElementById("procurarImagem");
let container = document.getElementById("container");

xhr.addEventListener("load" , () => {
    let dadosAPI = JSON.parse(xhr.responseText);
    let data = dadosAPI.date;
    console.log(data);
    let imagem = document.createElement("img");
    imagem.textContent = dadosAPI.count;
    document.getElementById("container").append(imagem);

})

btn.addEventListener("click", () => {
    xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`, false);
    xhr.send();
})