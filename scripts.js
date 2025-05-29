const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})


// funcionalidade de leitura dos arquivos
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name });
        }
        leitor.onerror = () => {
            reject('Erro na leitura do arquivo ${arquivo.name}')
        };

        leitor.readAsDataURL(arquivo);
    })
};

// // pré-visualização de arquivo
// document.getElementById('imageInput').addEventListener('change', function(event) {
//     const file = event.target.files[0]; // Pegando o arquivo selecionado pelo usuário
//     if (file) {
//         const reader = new FileReader(); // Criando uma instância do FileReader
//         reader.onload = function(e) {
//             const preview = document.getElementById('preview');
//             preview.src = e.target.result; // Atribuindo o resultado da leitura como fonte da imagem de pré-visualização
//             preview.style.display = 'block'; // Tornando a pré-visualização visível
//         };
//         reader.readAsDataURL(arquivo); // Lendo o arquivo como um Data URL
//     }
// });


// promessa assincrona upload do arquivo
const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0]; // Pegando o arquivo selecionado pelo usuário
    if (arquivo) {
        try {
             conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); // Lendo o conteúdo do arquivo
            imagemPrincipal.src = conteudoDoArquivo.url; // Atualizando a imagem principal com o conteúdo lido
            nomeDaImagem.textContent = conteudoDoArquivo.nome; // Atualizando o nome da imagem
        } catch (erro) {
            console.error("Erro na leitura do arquivo"); // Tratando erros de leitura
        }
    }
});

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault(); // Impede o envio do formulário
        const tagTexto = inputTags.value.trim(); // Obtém o texto da tag e remove espaços extras
        if (tagTexto !=="") {
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(tagNova); // Adiciona a nova tag à lista
            inputTags.value = ""; // Limpa o campo de entrada
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement; // Obtém o elemento pai (li) da imagem clicada
        listaTags.removeChild(tagQueQueremosRemover); // Remove a tag da lista
    }
});


// document.getElementById('imageUpload').addEventListener('change', function(event) {
//     var file = event.target.files[0];
//     // Agora temos o arquivo e podemos fazer mais validações
// });

// if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
//     alert('Por favor, selecione uma imagem PNG ou JPEG.');
//     return;
// }

// // Vamos limitar o tamanho a 2MB
// if (file.size > 2 * 1024 * 1024) {
//     alert('A imagem deve ter no máximo 2MB.');
//     return;
// }

