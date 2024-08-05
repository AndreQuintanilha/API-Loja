     document.getElementById('consulta').addEventListener('submit', function(event) { // Adiciona um evento de submit ao formulário com o id 'consulta'
     event.preventDefault(); 
    
     const filtro = document.getElementById('filtrar').value; // Obtém o valor do campo de filtro
     const url = `https://api.mercadolibre.com/sites/MLB/search?q=notebooks${filtro}`; // Monta a URL da API com o filtro
    
     if (filtro) { // Verifica se há um filtro aplicado
            
        fetch(url) // Faz uma requisição para a API
            .then(response => response.json()) // Converte a resposta para JSON
            .then(data => {
                    
                    document.getElementById('resultado').textContent = ''; // Limpa a mensagem anterior na área de resultados
    
                    if (data.results.length === 0) {// Verifica caso não tem resultados
                        
                        document.getElementById('resultado').textContent = 'Notebook não encontrado.'; // Exibe uma mensagem indicando que nenhum notebook foi encontrado
                    } else {
                        let produtos = data.results;// Obtém os produtos retornados pela API
                        let produtoHtml = ''; // Inicializa a variável para armazenar o HTML dos produtos
    
                        produtos.slice(0, 12).forEach(produto => {// Limita a exibição aos primeiros 12 produtos e cria o HTML para cada um
                        
                        // Formata o preço para o padrão de moeda BRL
                        const formatoBr = Number(produto.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });  
                        
                        produtoHtml += // Adiciona o HTML do produto à variável produtoHtml
                               
                            `<div class="col-md-4 mb-4 px-2">
                                    <div class="card">
                                        <img src="${produto.thumbnail}" class="card-img-top">
                                        <div class="card-body">
                                            <h5 class="card-title">${produto.title}</h5>
                                            <p id="card-text";>${formatoBr}</p>
                                            <button class="btn btn-secundary add-to-cart" data-id="${produto.id}" data-title="${produto.title}" data-price="${produto.price}">Adicionar ao Carrinho</button>
                                        </div>
                                    </div>
                                </div>`;
                        });
    
                            document.getElementById('resultado').innerHTML = produtoHtml; // Adiciona o HTML dos produtos à área de produtos
                            document.querySelectorAll('.add-to-cart').forEach(button => { // Adiciona eventos de clique aos botões "Adicionar ao Carrinho"
                            
                            button.addEventListener('click', function() {
                            addToCart(button); // Adiciona o produto ao carrinho quando o botão é clicado
                            });
                        });
                    }
                })
                .catch(error => {
                    
                    document.getElementById('resultado').textContent = 'Erro ao buscar notebook.'; // Exibe uma mensagem de erro caso a requisição falhe
                });
        }
    });
    
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];// Inicializa o carrinho com os itens armazenados no localStorage ou um array vazio se não houver itens
    
    function addToCart(resultado) {// Função para adicionar um produto ao carrinho
       
        // Obtém os dados do produto a partir dos atributos do botão
        const id = resultado.getAttribute('data-id');
        const title = resultado.getAttribute('data-title');
        const price = resultado.getAttribute('data-price');
    
        carrinho.push({ id: id, title: title, price: price });// Adiciona o produto ao array do carrinho
    
        localStorage.setItem('carrinho', JSON.stringify(carrinho));// Salva o carrinho atualizado no localStorage
    
        atualizarContadorCarrinho();// Atualiza o contador de itens no carrinho
    }
    
    
    function atualizarContadorCarrinho() { // Função para atualizar o contador de itens no carrinho
       
        const contadorCarrinho = document.getElementById('contadorCarrinho'); // Obtém o elemento que exibe o contador do carrinho
    
        contadorCarrinho.textContent = carrinho.length; // Atualiza o texto do contador com a quantidade de itens no carrinho
    }
    
    atualizarContadorCarrinho(); // Atualiza o contador do carrinho na inicialização
    
    
    
    
   
     
        
