# Automação SauceDemo

Projeto de automação de testes do site https://www.saucedemo.com/ usando Playwright com TypeScript.

Usei o padrão Page Object Model (POM), então cada tela do site tem um arquivo na pasta `pages` com os campos, botões e ações daquela tela. Nos testes eu só chamo essas ações.

## O que foi testado

- Login com sucesso
- Login com usuário bloqueado e com senha errada
- Adicionar produto no carrinho
- Conferir o produto no carrinho
- Conferir as informações do checkout e finalizar a compra
- Tentar continuar o checkout sem preencher o nome

## Pastas

- `pages` - telas do site (Login, Produtos, Carrinho e Checkout)
- `tests` - os testes
- `helpers` - função de login que uso antes dos testes de carrinho e checkout
- `data` - dados usados nos testes

## Como rodar

Primeiro instalar as dependências:

```
npm install
npx playwright install chromium
```

Depois criar um arquivo `.env` com o usuário e senha de teste do site:

```
USUARIO=standard_user
SENHA=secret_sauce
```

E rodar:

```
npm test
```

Se quiser ver o navegador abrindo, usar `npm run test:headed`. Para ver o relatório depois de rodar, usar `npm run relatorio`.
