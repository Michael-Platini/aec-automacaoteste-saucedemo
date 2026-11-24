import { test, expect } from '@playwright/test';
import { entraNaLoja } from '../helpers/helper';
import { ProdutosPage } from '../pages/ProdutosPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { produto } from '../data/massa';

test.beforeEach(async ({ page }) => {
  await entraNaLoja(page);
});

test('CT004 - Adicionar produto ao carrinho', async ({ page }) => {
  const produtosPage = new ProdutosPage(page);

  await produtosPage.adicionarAoCarrinho(produto.nome);

  await expect(produtosPage.contadorCarrinho).toHaveText('1');
  await expect(produtosPage.botaoRemover(produto.nome)).toBeVisible();
});

test('CT005 - Validar produto dentro do carrinho', async ({ page }) => {
  const produtosPage = new ProdutosPage(page);
  const carrinhoPage = new CarrinhoPage(page);

  await produtosPage.adicionarAoCarrinho(produto.nome);
  await produtosPage.abrirCarrinho();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(carrinhoPage.titulo).toHaveText('Your Cart');
  await expect(carrinhoPage.itensCarrinho).toHaveCount(1);
  await expect(carrinhoPage.item(produto.nome)).toBeVisible();
  await expect(carrinhoPage.quantidadeDoItem(produto.nome)).toHaveText('1');
  await expect(carrinhoPage.precoDoItem(produto.nome)).toHaveText(produto.preco);
});
