const URL_LIST = "http://localhost:8888/api/V1/categories/list";
const URL_PRODUCT = "http://localhost:8888/api/V1/categories/";
const URL_TYPES = "http://localhost:8888/api/V1/categories/types";
let msg =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";
let arrayCategorias = [];
let arrayProdutos = [];
let quantidadeCategorias = 0;

const addElements = () => {
  const sectionCategoriaMenu = document.createElement("section");
  sectionCategoriaMenu.innerHTML = `<ul id="categoriasMenu"></ul>`;
  document.getElementById('sectionChangeableLateral').appendChild(sectionCategoriaMenu);

  const sectionBanner = document.createElement("section");
  sectionBanner.classList.add('banner');
  document.getElementById('sectionChangeableBody').appendChild(sectionBanner);

  const article = document.createElement("article");
  article.innerHTML = `
    <h3 id="titleArticle">Seja Bem Vindo!</h3>
    <p id="textoApresentacao"></p>`
    document.getElementById('sectionChangeableBody').appendChild(article);
    document.getElementById("textoApresentacao").innerHTML = msg;

}

const getCategory = async () => {
  try {
    addElements();
    const res = await fetch(URL_LIST);
    const resJson = res.json();
    resJson.then((data) => {
      arrayCategorias = data.items;
      quantidadeCategorias = arrayCategorias.length

      const itemLista =  document.createElement('li')
        itemLista.classList.add('categoria');
        itemLista.innerHTML = `
            <a href="index.html">PÁGINA INICIAL</a>
        `
        document.getElementById('categorias').appendChild(itemLista);

        const itemListaMenu =  document.createElement('li')
        itemListaMenu.classList.add('categoriaMenu');
        itemListaMenu.innerHTML = `
            <a href="index.html">Página Inicial</a>
        `
        document.getElementById('categoriasMenu').appendChild(itemListaMenu);
    
      for (let i = 0; i < data.items.length; i++) {
        const itemLista =  document.createElement('li')
        itemLista.classList.add('categoria');
        const nomeMenuSuperior = (data.items[i].name).toUpperCase();
        const categoriaPath = data.items[i].path;
        itemLista.innerHTML = `
            <button class="menuSuperior" onclick="trocaCategoria(${i})" type="button">${nomeMenuSuperior}</button>
        `
        document.getElementById('categorias').appendChild(itemLista);

        const itemListaMenu =  document.createElement('li')
        itemListaMenu.classList.add('categoriaMenu');
        itemListaMenu.innerHTML = `
            <button class="menuLateral" onclick="trocaCategoria(${i})" type="button">${data.items[i].name}</button>
        `
        document.getElementById('categoriasMenu').appendChild(itemListaMenu);

      }

      // const contato =  document.createElement('li')
      // contato.classList.add('categoria');
      // contato.innerHTML = `
      //     <a href="#" type="checkbox">CONTATO</a>
      // `
      // document.getElementById('categorias').appendChild(contato);

      // const contatoMenu =  document.createElement('li')
      // contatoMenu.classList.add('categoriaMenu');
      // contatoMenu.innerHTML = `
      //     <a href="contato.html" type="checkbox">Contato</a>
      // `
      // document.getElementById('categoriasMenu').appendChild(contatoMenu);
    });

  } catch (error) {
    console.log(error);
  }
};

const addSectionsLateral = async(index) =>  {
  const roteiro = document.createElement("p");
  roteiro.classList.add('roteiro');
  roteiro.innerHTML = `<a class="pagInicial" href="index.html">Página Inicial</a> > ${arrayCategorias[index].name}`;
  document.getElementById('sectionChangeableLateral').appendChild(roteiro);

  const sectionCategoriaMenu = document.createElement("section");
  sectionCategoriaMenu.innerHTML = `<ul id="categoriasMenuLateral"></ul>`;
  document.getElementById('sectionChangeableLateral').appendChild(sectionCategoriaMenu);

  const res = await fetch(URL_TYPES);
    const resJson = res.json();
    resJson.then((data) => {
      console.log(data.tipos);
      const headerCategorias =  document.createElement('li')
        headerCategorias.classList.add('headerCategoria');
        headerCategorias.innerHTML = `
            <h3 class="tituloFiltre">FILTRE POR</h3>
            <h5 class="tituloCategoria">CATEGORIAS</h5>
        `
      document.getElementById('categoriasMenuLateral').appendChild(headerCategorias);

      for (let i = 0; i < data.tipos.length; i++) {
        const itemListaMenu =  document.createElement('li')
        itemListaMenu.classList.add('categoriaMenu');
        itemListaMenu.innerHTML = `
            <button class="listaTipos" onclick="trocaTipo(${i})" type="button">${data.tipos[i].name}</button>
        `
        document.getElementById('categoriasMenuLateral').appendChild(itemListaMenu);

      }

      const itemListaMenu =  document.createElement('li')
        itemListaMenu.classList.add('headerCategoria');
        itemListaMenu.innerHTML = `
        <h3 id="titleCores">Cores</h3>
        <div id="cores">
            <div class="vermelho"></div>
            <div class="laranja"></div>
            <div class="azul"></div>
            </div>
        `
      document.getElementById('categoriasMenu').appendChild(itemListaMenu);
    })

    addSectionsProducts(arrayCategorias[index].name, index);
}

const addSectionsProducts = async (categoria, index) => {
  const nomeCategoria = document.createElement("p");
  nomeCategoria.innerHTML = `<p class="tituloProdutos">${categoria}</p>`;
  document.getElementById('sectionChangeableBody').appendChild(nomeCategoria);

  const produtos = document.createElement("div");
  produtos.classList.add('selecaoProdutos');
  document.getElementById('sectionChangeableBody').appendChild(produtos);

  const res = await fetch(`${URL_PRODUCT}${index+1}`);
    const resJson = res.json();
      resJson.then((data) => {
        arrayProdutos = data.items
        criaCards(produtos);
    })
}

const criaCards = (produtos) => {
  for (let i = 0; i < arrayProdutos.length; i++) {
    const produto = arrayProdutos[i];
    const nomeProduto = produto.name.toUpperCase();
    let preco = produto.price.toFixed([2])
    preco = preco.toString().replace(".", ",");
    const cardProduto =  document.createElement('div')
    cardProduto.classList.add('card');
    cardProduto.innerHTML = `
        <img class="imgProduto" src="${produto.image}" alt="${produto.name}" />
        <p class="nomeProduto">${nomeProduto}</p>
        <strong class="preco">R$ ${preco}</strong>
        <button class="buttonProduto" type="button">COMPRAR</button>
    `
    produtos.appendChild(cardProduto);
  }
}

const trocaCategoria = async (index) => {
  try {
    removeSectionAnterior()
    document.getElementById("botaoBuscar").style.backgroundColor = "#00A8A9";
    addSectionsLateral(index);
    
  } catch (error) {
    console.log(error.message);
  }
}

const removeSectionAnterior = () => {
  const listaLateral = document.getElementById('sectionChangeableLateral');
  while (listaLateral.hasChildNodes()) {
    listaLateral.removeChild(listaLateral.firstChild);
  }
  const listaBody = document.getElementById('sectionChangeableBody');
  while (listaBody.hasChildNodes()) {
    listaBody.removeChild(listaBody.firstChild);
  }
}

const trocaTipo = () => {

}

const buscar = async () => {
  let retornoPesquisa = [];
  let textoPesquisado = document.querySelector("#textSearch").value.toLowerCase();
  console.log(textoPesquisado);

  for (let index = 0; index < quantidadeCategorias; index++) {
    const res = await fetch(`${URL_PRODUCT}${index+1}`);
      const resJson = res.json();
        resJson.then((data) => {
          arrayProdutos = data.items;
          for (let i = 0; i < arrayProdutos.length; i++) {
            let nomeCompara = arrayProdutos[i].name.toLowerCase();
            if (nomeCompara == textoPesquisado) {
              console.log('é igual')
              retornoPesquisa.push(arrayProdutos[i])
            }
          }
        })
  }

  console.log(retornoPesquisa)

  if (retornoPesquisa.length > 0) {
    const listaBody = document.getElementById('sectionChangeableBody');
    while (listaBody.hasChildNodes()) {
    listaBody.removeChild(listaBody.firstChild);

    const nomeCategoria = document.createElement("p");
    nomeCategoria.innerHTML = `<p class="tituloProdutos">Retorno Pesquisa</p>`;
    document.getElementById('sectionChangeableBody').appendChild(nomeCategoria);

    const produtos = document.createElement("div");
    produtos.classList.add('selecaoProdutos');
    document.getElementById('sectionChangeableBody').appendChild(produtos);

    for (let i = 0; i < retornoPesquisa.length; i++) {
      const produto = retornoPesquisa[i];
      const nomeProduto = produto.name.toUpperCase();
      let preco = produto.price.toFixed([2])
      preco = preco.toString().replace(".", ",");
      const cardProduto =  document.createElement('div')
      cardProduto.classList.add('card');
      cardProduto.innerHTML = `
          <img class="imgProduto" src="${produto.image}" alt="${produto.name}" />
          <p class="nomeProduto">${nomeProduto}</p>
          <strong class="preco">R$ ${preco}</strong>
          <button class="buttonProduto" type="button">COMPRAR</button>
      `
      produtos.appendChild(cardProduto);
    }
  }
  }

  document.querySelector("#textSearch").value = '';
}

getCategory();
