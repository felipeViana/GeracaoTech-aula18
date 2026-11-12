const API_URL = 'http://localhost:3001';

async function carregarProdutos() {
    const mensagem = document.getElementById('mensagem');

    try {
        mensagem.textContent = 'Carregando produtos...';

        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os produtos.');
        }

        const produtos = await resposta.json();

        renderizarProdutos(produtos);

        mensagem.textContent = '';
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);

        mensagem.textContent = 'Não foi possível carregar os produtos. Tente novamente mais tarde.';
    }
}

function renderizarProdutos(produtos) {
    const lista = document.getElementById('lista-produtos');
    const mensagem = document.getElementById('mensagem');

    lista.replaceChildren();

    if (produtos.length === 0) {
        mensagem.textContent = 'Nenhum produto encontrado.';
        return;
    }

    produtos.forEach((produto) => {
        const item = document.createElement('li');
        item.classList.add('produto');

        const nome = document.createElement('h3');
        nome.textContent = produto.nome;

        const preco = document.createElement('p');
        preco.textContent = produto.preco;

        item.append(nome, preco);
        lista.appendChild(item);
    });
}

carregarProdutos();