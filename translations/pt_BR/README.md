# Resource Ajax

[![licence mit](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://hemersonvianna.mit-license.org/)
[![issues](https://img.shields.io/github/issues/resource-solutions/resource-js-ajax.svg?style=flat-square)](https://github.com/resource-solutions/resource-js-ajax/issues)

## Traduções

* [ORIGINAL](https://github.com/resource-solutions/resource-js-ajax/)

## Introdução

> Denominado JavaScript assíncrono + XML enquanto não era uma tecnologia em si, mas um termo empregado em 2005 por Jesse James Garrett descreve uma "nova" aproximação ao uso de um número de tecnologias recentes juntas, incluindo: HTML ou XHTML, Cascading Style Sheets, JavaScript, The Document Object Model, XML, XSLT, e o mais importante: objeto XMLHttpRequest.
> Quando essas tecnologias são combinadas no modelo AJAX, aplicações web são capazes de fazer rapidamente atualizações incrementais para a interface do usuário sem recarregar a página inteira do navegador. Isso torna a aplicação mais rápida e sensível às ações do usuário.

> Embora o X em AJAX corresponda ao XML, JSON é mais utilizado que o XML atualmente devido às suas vantagens, como ser mais leve e uma parte do JavaScript. Ambos (JSON e XML) são utilizados ​​para obter informações do pacote no modelo AJAX.

> [MDN](https://developer.mozilla.org/pt-BR/docs/AJAX)


AJAX não é uma linguagem de programação. Nem é um software. AJAX é um paradigma de programação - uma técnica.

Os navegadores modernos tem um objeto embutido chamado XMLHttpRequest. Este objeto torna-se bastante fácil para o JavaScript se comunicar com o servidor.

## AJAX usando JavaScript puro

### Passos: 
#### 1. Criar uma instância do objeto XMLHttpRequest

Para criar uma instância de XHR, você simplesmente precisa atribuir a uma variável o método `XMLHttpRequest()` com o operador `new` para criar a instância. Então, vamos criar uma instância da seguinte forma:

```javascript
var xhr = new XMLHttpRequest();
```

#### 2. Use o método open() do XHR para especificar que tipo de dados que você deseja

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

Esta função, basicamente substitui o HTML encontrado no `<div> container` com o texto buscado do servidor.

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

## Contribuindo

- Faça o fork!
- Crie a sua branch feature: `git checkout -b my-new-feature`
- Faça o commit das suas alterações: `git commit -m 'Add some feature'`
- Faça o push para o servidor: `git push origin my-new-feature`
- E realize o pull request

## Log

Verifique os [Releases](https://github.com/resource-solutions/resource-js-ajax/releases) ver detalhado o log de alterações.

## Licença

[MIT license](http://hemersonvianna.mit-license.org/) © Hemerson Vianna
