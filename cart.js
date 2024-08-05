    
    document.addEventListener('DOMContentLoaded', function() { //Garante que o script seja executado somente após todos os elementos do DOM estarem disponíveis. Permite manipular e acessar os elementos do DOM de forma segura.
    
    displayCartItems();  // Exibe os itens do carrinho quando a página é carregada
    
    document.getElementById('submit').addEventListener('click', function(event) { // Adiciona um evento de clique ao botão.
    event.preventDefault(); 
            
            
    const cart = JSON.parse(localStorage.getItem('carrinho')) || []; // Recupera o carrinho do localStorage ou inicializa um array vazio se não existir
            
            if (cart.length === 0) { // Verifica se o carrinho está vazio
               
                alert('O carrinho está vazio!'); // Exibe um alerta se o carrinho estiver vazio
            } else {
                
                // Limpa o carrinho e exibe uma mensagem de confirmação de compra
                localStorage.removeItem('carrinho'); // Remove o carrinho do localStorage
                alert('Compras finalizadas!'); // Exibe um alerta confirmando a finalização da compra
                location.reload(); // Atualiza a página para remover itens do carrinho da interface
            }
        });
    });
    
    function displayCartItems() {  // Função para exibir os itens do carrinho
        
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];//Recupera o carrinho do localStorage ou inicializa um array vazio se não existir
    const cartItens = document.getElementById('cart-items'); // Obtém o elemento onde os itens serão exibidos
    const totalCarrinho = document.getElementById('total');// Obtém o elemento onde o totalCarrinho será exibido
    
    cartItens.innerHTML = ''; // Limpa os itens anteriores da interface
    let total = 0; // Inicializa a variável para calcular o total
     
    if (cart.length === 0) { // Verifica se o carrinho está vazio
        cartItens.innerHTML = '<p id=carrinhoVazio>O carrinho está vazio !!!!</p>'; // Exibe a mensagem "O carrinho está vazio"
        totalCarrinho.style.display = 'none'; // Esconde a seção do total
        return; // Sai da função
    
    }else{
       
        totalCarrinho.style.display = 'block'; // Exibe a seção do total
    
    }
   
    cart.forEach((item, index) => { // Itera sobre cada item do carrinho
        const formatoBr = Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); //Formata o preço do item para o padrão de moeda BRL
            
    // Cria o HTML para o item do carrinho
    const itemHtml = 
                `<div class="col-md-4 mb-4 px-2">
                         <div class="card">
                         <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p id="card-text">${formatoBr}</p>
                        <button class="btn btn-danger" onclick="removeItem(${index})">Remover</button>
                       </div> 
                    </div>
                 </div>`;
            
            cartItens.innerHTML += itemHtml; // Adiciona o HTML do item à lista de itens do carrinho
            total += parseFloat(item.price); // Adiciona o preço do item ao total
        });
    
        const somaTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });// Formata o total para o padrão de moeda BRL
        totalCarrinho.textContent = `TOTAL: ${somaTotal}`; // Atualiza o total exibido na interface com a palavra "TOTAL"
    }
    
        
        function removeItem(index) { // Função para remover um item do carrinho pelo índice
            let cart = JSON.parse(localStorage.getItem('carrinho')) || []; // Recupera o carrinho do localStorage ou inicializa um array vazio se não existir
            cart.splice(index, 1); // Remove o item do carrinho usando o índice fornecido
            localStorage.setItem('carrinho', JSON.stringify(cart));// Salva o carrinho atualizado no localStorage
       
            displayCartItems();// Atualiza a exibição dos itens do carrinho
    }