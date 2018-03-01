# Resource Ajax

[![licence mit](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://hemersonvianna.mit-license.org/)
[![issues](https://img.shields.io/github/issues/descco-tools/knowledge-ajax.svg?style=flat-square)](https://github.com/descco-tools/knowledge-ajax/issues)

## Traduções

* [ORIGINAL](https://github.com/descco-tools/knowledge-ajax/)

## Introdução

> Denominado JavaScript assíncrono + XML enquanto não era uma tecnologia em si, mas um termo empregado em 2005 por Jesse James Garrett descreve uma "nova" aproximação ao uso de um número de tecnologias recentes juntas, incluindo: HTML ou XHTML, Cascading Style Sheets, JavaScript, The Document Object Model, XML, XSLT, e o mais importante: objeto XMLHttpRequest.
> Quando essas tecnologias são combinadas no modelo AJAX, aplicações web são capazes de fazer rapidamente atualizações incrementais para a interface do usuário sem recarregar a página inteira do navegador. Isso torna a aplicação mais rápida e sensível às ações do usuário.

> Embora o X em AJAX corresponda ao XML, JSON é mais utilizado que o XML atualmente devido às suas vantagens, como ser mais leve e uma parte do JavaScript. Ambos (JSON e XML) são utilizados ​​para obter informações do pacote no modelo AJAX.

> [MDN](https://developer.mozilla.org/pt-BR/docs/AJAX)


AJAX não é uma linguagem de programação. Nem é um software. AJAX é um paradigma de programação - uma técnica.

Os navegadores modernos tem um objeto embutido chamado XMLHttpRequest. Este objeto torna-se bastante fácil para o JavaScript se comunicar com o servidor.

## AJAX usando JavaScript puro

### Passos (GET): 
#### 1. Criar uma instância do objeto XMLHttpRequest

Para criar uma instância de XHR, você simplesmente precisa atribuir a uma variável o método `XMLHttpRequest()` com o operador `new` para criar a instância. Então, vamos criar uma instância da seguinte forma:

```javascript
var xhr = new XMLHttpRequest();
```

#### 2. Use o método open() do XHR para especificar que tipo de dados você deseja

O método `open()` é usado para especificar o tipo de dado que quer a partir do servidor. Recebe três argumentos: tipo de pedido, o local do arquivo no servidor e o indicador assíncrono.

 - **request** ‐ É o tipo de solicitação que será enviado para o servidor. Permite o valor `GET` ou `POST`. Em termos simples, `GET` é algo para recuperar a partir do servidor. `POST` serve para enviar algo para o servidor.
 - **url** ‐ É a URL do arquivo no servidor. Pode ser uma URL estática, URL relativa ou simplesmente o caminho da pasta que contém a página web.
 - **async** ‐ Isto é usado para determinar se o pedido deve ser executado de forma assíncrona. Ele permite o valor "verdadeiro" ou "falso". Verdadeiro é para execução assíncrona. Falso é para a execução síncrona.

```javascript
// open(request, url, async);
xhr.open('GET', 'source/test.txt', true);   
```

#### 3. Criar uma função para utilizar os resultados

Um objeto XHR tem muitas variáveis embutidas em que ele armazena dados recuperados do servidor. Uma dessas variáveis é o `responseText`. Geralmente contém qualquer informação de texto recuperado do servidor.

Quando chamamos `xhr.open()`, ele vai buscar a informação de texto armazenados em `test.txt` e armazená-lo em sua variável `responseText`. Assim, para acessar os dados, nós simplesmente temos que chamar `xhr.responseText`.

Nosso objetivo é preencher `<div id="container">` com o novo texto lido a partir do servidor, usamos o `document.getElementById()`. Então, vamos criar uma função anônima como segue:

```javascript
function() {
  document.getElementById("container").innerHTML = xhr.responseText;
}
```

Esta função, basicamente substitui o HTML encontrado no `<div> container` com o texto buscado no servidor.

#### 4. Use o método send() do XHR para enviar o pedido

O método `send()` é usado para enviar a solicitação para o servidor. Ele não leva nenhum parâmetro, para que você simplesmente chamá-lo da seguinte forma:

```javascript
xhr.send(null);
```

#### 5. Receber a resposta

O XHR tem duas propriedades que são utilizados para indicar uma resposta do servidor. O primeiro é `readyState`, e o segundo é `status`.

A propriedade `readyState` representa como a solicitação está progredindo. Ele retorna um valor numérico, numerados de `0` até `4`, que indicam diferentes estados de progresso.

 - 0 - Pedido não inicializado
 - 1 - Ligação estabelecida com o servidor
 - 2 - Pedido recebido pelo servidor
 - 3 - Servidor está processando a solicitação
 - 4 - O pedido foi processado, e a resposta está pronta

A propriedade `status` indica se o pedido foi executado com sucesso.

 - 200 - Pedido executado com sucesso e a resposta entregue
 - 404 - Página não encontrada

Você pode acessar essas propriedades referenciando a partir da variável XHR da seguinte forma: `xhr.readyState` ou` xhr.status`.
Antes de recuperar qualquer outra variável do XHR como `responseText`, devemos garantir que o `readyState` é `4` e o `status` é `200`.

#### Exemplo dos passos acima

No exemplo a função `initXhr()`, apenas serve para demonstrar o que era preciso ser feito para dar suporte para o IE anterior ao 7. Essa função pode ser desconsiderada e usar apenas:

```javascript
var xhr = new XMLHttpRequest();
```
 
Confira o [script.js](https://github.com/knowledge-solutions/knowledge-ajax/blob/master/source/script.js).

### Passos (POST):

A diferença para o tipo `POST` é apenas o método `setRequestHeader()`(Define o cabeçalho para uma solicitação HTTP) e a utilização de parâmetros no método `send()`.

```javascript
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// <input id="example" name="name" type="text">
xhr..send(document.getElementById("example").value); 

// or

// var file = 'hemersonvianna.io';
// var name = 'Hemerson Vianna';
// var data = "file=" + url + "&name=" + name;
xhr..send(data); 
```

## Observações

Temos que falar de mais algumas variáveis:

**responseXml** - mantém um arquivo XML carregado, o método de DOM permite extrair dados.

**onreadystatechange** - propriedade que leva uma função como valor que é invocado quando o evento `readystatechange` é despachado.


Há muitas variáveis e métodos disponíveis no objeto `XMLHttpRequest`, mas a maioria não tem suporte a todos os navegadores (IE :/). Foram apresentados os básicos para um bom funcionamento em todos os navegadores.


## Mais exemplos

 - [JSON](https://github.com/knowledge-solutions/knowledge-ajax/blob/master/source/more-examples/json/)
 - [XML](https://github.com/knowledge-solutions/knowledge-ajax/blob/master/source/more-examples/xml/)
 - [jQuery](https://github.com/knowledge-solutions/knowledge-ajax/blob/master/source/more-examples/jquery/)

## Instalação para os exemplos

Requer [Node.js](https://nodejs.org/en/) instalado na máquina

```
npm install
```

Rotas:
- text - [http://localhost:9000/](http://localhost:9000/)
- json - [http://localhost:9000/json](http://localhost:9000/json)
- xml - [http://localhost:9000/xml](http://localhost:9000/xml) 
- jquery - [http://localhost:9000/jquery](http://localhost:9000/jquery)

## Bibliotecas Ajax

 - [SuperAgent](http://smalljs.org/ajax/superagent/)
 - [Razaxjs](https://github.com/razaibi/razaxjs)
 - [Aja.js](http://krampstudio.com/aja.js/)
 - [Wjs](https://github.com/weeger/wjs)
 - [Marmottajax](https://github.com/dimitrinicolas/marmottajax)
 - [Nanoajax](https://github.com/yanatan16/nanoajax)
 - [psQuery](https://github.com/pseudosavant/psQuery)
 - [ajax](https://github.com/ForbesLindesay/ajax)
 - [Reqwest](https://github.com/ded/Reqwest)
 - [majaX.js](https://github.com/SimonWaldherr/majaX.js)
 - [qwest](https://github.com/pyrsmk/qwest)
 - [http.js](https://github.com/organic-scholar/http.js)
 - [intercooler.js](http://intercoolerjs.org/)

## Contribuindo

- Faça o fork!
- Crie a sua branch feature: `git checkout -b my-new-feature`
- Faça o commit das suas alterações: `git commit -m 'Add some feature'`
- Faça o push para o servidor: `git push origin my-new-feature`
- E realize o pull request

## Log

Verifique os [Releases](https://github.com/descco-tools/knowledge-ajax/releases) ver detalhado o log de alterações.

## Licença

[MIT license](http://hemersonvianna.mit-license.org/) © Hemerson Vianna
