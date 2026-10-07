// FUNÇÃO PARA PEGAR ELEMENTOS PELO ID
function $(id) {
    return document.getElementById(id);
}

// DATA ATUAL
if ($("dataAtual")) {
    $("dataAtual").textContent =
        "Data: " + new Date().toLocaleDateString("pt-BR");
}

// MENUS
const btnSobre = $("btnSobre");
const menuSobre = $("menuSobre");

const btnContato = $("btnContato");
const menuContato = $("menuContato");

// MENU SOBRE
if (btnSobre && menuSobre) {
    btnSobre.addEventListener("click", function(evento) {
        evento.stopPropagation();

        menuSobre.classList.toggle("ativo");

        if (menuContato) {
            menuContato.classList.remove("ativo");
        }
    });
}

// MENU CONTATO
if (btnContato && menuContato) {
    btnContato.addEventListener("click", function(evento) {
        evento.stopPropagation();

        menuContato.classList.toggle("ativo");

        if (menuSobre) {
            menuSobre.classList.remove("ativo");
        }
    });
}

// FECHAR MENUS AO CLICAR FORA
document.addEventListener("click", function() {
    if (menuSobre) {
        menuSobre.classList.remove("ativo");
    }

    if (menuContato) {
        menuContato.classList.remove("ativo");
    }
});

// TELEFONE
if ($("telefone")) {
    $("telefone").addEventListener("click", function(evento) {
        evento.preventDefault();

        alert("Telefone: (32) 99999-9999");
    });
}

// CADASTRO
const formCadastro = $("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = $("nomeCadastro").value.trim();
        const cpf = $("cpfCadastro").value.trim();
        const endereco = $("enderecoCadastro").value.trim();
        const email = $("emailCadastro").value.trim().toLowerCase();
        const senha = $("senhaCadastro").value;
        const confirmarSenha = $("confirmarSenha").value;
        const mensagem = $("mensagemCadastro");

        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não são iguais.";
            mensagem.style.color = "red";
            return;
        }

        if (localStorage.getItem("usuario_" + email)) {
            mensagem.textContent = "Este email já está cadastrado.";
            mensagem.style.color = "red";
            return;
        }

        const usuario = {
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            email: email,
            senha: senha
        };

        localStorage.setItem(
            "usuario_" + email,
            JSON.stringify(usuario)
        );

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        mensagem.textContent =
            "Cadastro realizado! Entrando...";

        mensagem.style.color = "green";

        setTimeout(function() {
            window.location.href = "site.html";
        }, 700);
    });
}

// LOGIN
const formLogin = $("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const email = $("emailLogin").value.trim().toLowerCase();
        const senha = $("senhaLogin").value;
        const mensagem = $("mensagemLogin");

        const dados = localStorage.getItem(
            "usuario_" + email
        );

        if (!dados) {
            mensagem.textContent =
                "Email ou senha incorretos.";

            mensagem.style.color = "red";
            return;
        }

        const usuario = JSON.parse(dados);

        if (usuario.senha !== senha) {
            mensagem.textContent =
                "Email ou senha incorretos.";

            mensagem.style.color = "red";
            return;
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        mensagem.textContent =
            "Login realizado! Entrando...";

        mensagem.style.color = "green";

        setTimeout(function() {
            window.location.href = "site.html";
        }, 700);
    });
}

// PROTEGER A PÁGINA DE PRODUTOS
if (location.pathname.endsWith("site.html")) {
    if (!localStorage.getItem("usuarioLogado")) {
        window.location.href = "login.html";
    }
}

// MOSTRAR NOME DO USUÁRIO
let usuarioLogado = null;

try {
    usuarioLogado = JSON.parse(
        localStorage.getItem("usuarioLogado") || "null"
    );
} catch (erro) {
    usuarioLogado = null;
}

if ($("nomeUsuario") && usuarioLogado) {
    $("nomeUsuario").textContent = usuarioLogado.nome;
}

// SAIR
if ($("botaoSair")) {
    $("botaoSair").addEventListener("click", function() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    });
}

// PRODUTOS DISPONÍVEIS
function criarProdutosIniciais() {
    let produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "null"
    );

    if (produtos && produtos.length > 0) {
        return;
    }

    produtos = [
        {
            id: 1,
            nome: "Fritadeira a Ar",
            preco: 250,
            categoria: "Eletrodomésticos",
            imagem: "fritadeira a ar.jpg",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 2,
            nome: "Bicicleta",
            preco: 850,
            categoria: "Esportes",
            imagem: "bicicleta.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 3,
            nome: "Câmera",
            preco: 1200,
            categoria: "Eletrônicos",
            imagem: "camera.jpg",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 4,
            nome: "iPhone 13",
            preco: 2800,
            categoria: "Celulares",
            imagem: "iphone13.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 5,
            nome: "Mesa",
            preco: 450,
            categoria: "Móveis",
            imagem: "mesa.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 6,
            nome: "Monitor",
            preco: 900,
            categoria: "Informática",
            imagem: "monitor.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 7,
            nome: "Caderno",
            preco: 35,
            categoria: "Material Escolar",
            imagem: "caderno.jpg",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 8,
            nome: "PlayStation 5",
            preco: 3500,
            categoria: "Games",
            imagem: "playstation5.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 9,
            nome: "Celular Samsung",
            preco: 1500,
            categoria: "Celulares",
            imagem: "samsung.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 10,
            nome: "Sofá",
            preco: 1000,
            categoria: "Móveis",
            imagem: "sofa.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        },
        {
            id: 11,
            nome: "Smart TV",
            preco: 2000,
            categoria: "Eletrônicos",
            imagem: "tv.webp",
            vendedor: "Compraê",
            emailVendedor: "produtos@comprae.com",
            comprado: false
        }
    ];

    localStorage.setItem(
        "produtosComprae",
        JSON.stringify(produtos)
    );
}

// PUBLICAR PRODUTO
const formProduto = $("formProduto");

if (formProduto) {
    formProduto.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const usuario = JSON.parse(
            localStorage.getItem("usuarioLogado")
        );

        const arquivo = $("imagemProduto").files[0];
        const mensagem = $("mensagemProduto");

        if (!usuario) {
            window.location.href = "login.html";
            return;
        }

        if (!arquivo) {
            mensagem.textContent = "Escolha uma imagem.";
            mensagem.style.color = "red";
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function() {
            const produto = {
                id: Date.now(),
                nome: $("nomeProduto").value.trim(),
                preco: Number($("precoProduto").value),
                categoria: $("tipoProduto").value,
                imagem: leitor.result,
                vendedor: usuario.nome,
                emailVendedor: usuario.email,
                comprado: false
            };

            let produtos = JSON.parse(
                localStorage.getItem("produtosComprae") || "[]"
            );

            produtos.push(produto);

            localStorage.setItem(
                "produtosComprae",
                JSON.stringify(produtos)
            );

            formProduto.reset();

            mensagem.textContent =
                "Produto publicado com sucesso!";

            mensagem.style.color = "green";

            mostrarProdutos();
        };

        leitor.readAsDataURL(arquivo);
    });
}

// MOSTRAR PRODUTOS
function mostrarProdutos() {
    const lista = $("listaProdutos");

    if (!lista) {
        return;
    }

    criarProdutosIniciais();

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (!usuario) {
        return;
    }

    const produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "[]"
    );

    const campoBusca = $("buscaProdutos");

    const busca = campoBusca
        ? campoBusca.value.toLowerCase()
        : "";

    lista.innerHTML = "";

    produtos
        .filter(function(produto) {
            return (
                produto.nome.toLowerCase().includes(busca) ||
                produto.categoria.toLowerCase().includes(busca)
            );
        })
        .forEach(function(produto) {
            const card = document.createElement("article");

            card.className = "produto-card";

            let botoes = "";

            if (produto.comprado) {
                botoes =
                    '<button class="botao produto-vendido" disabled>' +
                    'Produto vendido' +
                    '</button>';
            } else if (
                produto.emailVendedor === usuario.email
            ) {
                botoes =
                    '<button class="botao-excluir" onclick="excluirProduto(' +
                    produto.id +
                    ')">' +
                    'Excluir' +
                    '</button>';
            } else {
                botoes =
                    '<button class="botao" onclick="comprarProduto(' +
                    produto.id +
                    ')">' +
                    'Comprar' +
                    '</button>';

                botoes +=
                    '<button class="botao botao-favorito" onclick="tenhoInteresse(' +
                    produto.id +
                    ')">' +
                    '♡ Interesse' +
                    '</button>';
            }

            card.innerHTML =
                '<img src="' +
                produto.imagem +
                '" alt="' +
                produto.nome +
                '">' +

                '<div class="produto-info">' +

                '<span class="categoria">' +
                produto.categoria +
                '</span>' +

                '<h3>' +
                produto.nome +
                '</h3>' +

                '<p class="preco">' +
                'R$ ' +
                produto.preco
                    .toFixed(2)
                    .replace(".", ",") +
                '</p>' +

                '<p>Vendedor: <strong>' +
                produto.vendedor +
                '</strong></p>' +

                '<div class="botoes-produto">' +
                botoes +
                '</div>' +

                '</div>';

            lista.appendChild(card);
        });
}

// PESQUISA
if ($("buscaProdutos")) {
    $("buscaProdutos").addEventListener(
        "input",
        function() {
            mostrarProdutos();
        }
    );
}

// COMPRAR PRODUTO
function comprarProduto(id) {
    let produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "[]"
    );

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (!produto || !usuario) {
        return;
    }

    if (produto.emailVendedor === usuario.email) {
        alert("Você não pode comprar seu próprio produto.");
        return;
    }

    if (produto.comprado) {
        alert("Este produto já foi vendido.");
        return;
    }

    // CRIAR JANELA DE PAGAMENTO
    const fundo = document.createElement("div");

    fundo.className = "janela-pagamento";

    fundo.innerHTML =
        '<div class="caixa-pagamento">' +

        '<button class="fechar-pagamento" onclick="fecharPagamento()">' +
        '×' +
        '</button>' +

        '<h2>Finalizar compra</h2>' +

        '<p class="texto-produto">Você está comprando:</p>' +

        '<h3>' +
        produto.nome +
        '</h3>' +

        '<p class="valor-pagamento">' +
        'R$ ' +
        produto.preco
            .toFixed(2)
            .replace(".", ",") +
        '</p>' +

        '<h3>Escolha a forma de pagamento:</h3>' +

        '<button class="opcao-pagamento" onclick="finalizarPagamento(' +
        produto.id +
        ', \'PIX\')">' +
        '<span>💠</span> PIX' +
        '</button>' +

        '<button class="opcao-pagamento" onclick="finalizarPagamento(' +
        produto.id +
        ', \'Cartão de crédito\')">' +
        '<span>💳</span> Cartão de crédito' +
        '</button>' +

        '<button class="opcao-pagamento" onclick="finalizarPagamento(' +
        produto.id +
        ', \'Boleto\')">' +
        '<span>🧾</span> Boleto' +
        '</button>' +

        '</div>';

    document.body.appendChild(fundo);
}

// FECHAR PAGAMENTO
function fecharPagamento() {
    const janela =
        document.querySelector(".janela-pagamento");

    if (janela) {
        janela.remove();
    }
}

// FINALIZAR PAGAMENTO
function finalizarPagamento(id, formaPagamento) {
    let produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "[]"
    );

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    if (!produto) {
        return;
    }

    const confirmar = confirm(
        "Produto: " +
        produto.nome +
        "\nValor: R$ " +
        produto.preco.toFixed(2).replace(".", ",") +
        "\nPagamento: " +
        formaPagamento +
        "\n\nDeseja confirmar a compra?"
    );

    if (!confirmar) {
        return;
    }

    produto.comprado = true;
    produto.formaPagamento = formaPagamento;

    localStorage.setItem(
        "produtosComprae",
        JSON.stringify(produtos)
    );

    fecharPagamento();

    alert(
        "Compra realizada com sucesso!\n\n" +
        "Forma de pagamento: " +
        formaPagamento
    );

    mostrarProdutos();
}

// TENHO INTERESSE
function tenhoInteresse(id) {
    const produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "[]"
    );

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    if (!produto) {
        return;
    }

    const assunto = encodeURIComponent(
        "Tenho interesse em " + produto.nome
    );

    const texto = encodeURIComponent(
        "Olá! Tenho interesse no produto " +
        produto.nome +
        " anunciado no Compraê."
    );

    window.location.href =
        "mailto:" +
        produto.emailVendedor +
        "?subject=" +
        assunto +
        "&body=" +
        texto;
}

// EXCLUIR PRODUTO
function excluirProduto(id) {
    let produtos = JSON.parse(
        localStorage.getItem("produtosComprae") || "[]"
    );

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    if (!produto || !usuario) {
        return;
    }

    if (produto.emailVendedor !== usuario.email) {
        return;
    }

    if (!confirm("Deseja excluir este produto?")) {
        return;
    }

    produtos = produtos.filter(function(item) {
        return item.id !== id;
    });

    localStorage.setItem(
        "produtosComprae",
        JSON.stringify(produtos)
    );

    mostrarProdutos();
}

// INICIAR
if ($("listaProdutos")) {
    criarProdutosIniciais();
    mostrarProdutos();
}