import { test, expect } from '@playwright/test';
import { entraNaLoja } from '../helpers/helper';
import { ProdutosPage } from '../pages/ProdutosPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { produto, cliente } from '../data/massa';

// Entra na loja, coloca o produto no carrinho e vai para o checkout
test.beforeEach(async ({ page }) => {
  const produtosPage = new ProdutosPage(page);
  const carrinhoPage = new CarrinhoPage(page);

  await entraNaLoja(page);
  await produtosPage.adicionarAoCarrinho(produto.nome);
  await produtosPage.abrirCarrinho();
  await carrinhoPage.irParaCheckout();
});

test('CT006 - Validar informações do pedido no checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await expect(checkoutPage.titulo).toHaveText('Checkout: Your Information');
  await checkoutPage.preencherDados(cliente);
  await checkoutPage.continuar();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(checkoutPage.titulo).toHaveText('Checkout: Overview');
  await expect(checkoutPage.itensResumo).toHaveCount(1);
  await expect(checkoutPage.itensResumo.first()).toContainText(produto.nome);
  await expect(checkoutPage.itensResumo.first()).toContainText(produto.preco);
  await expect(checkoutPage.infoPagamento).toHaveText('SauceCard #31337');
  await expect(checkoutPage.infoEntrega).toHaveText('Free Pony Express Delivery!');
  await expect(checkoutPage.subtotal).toHaveText(produto.subtotal);
  await expect(checkoutPage.taxa).toHaveText(produto.taxa);
  await expect(checkoutPage.total).toHaveText(produto.total);
});

test('CT007 - Finalizar compra com sucesso', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const produtosPage = new ProdutosPage(page);

  await checkoutPage.preencherDados(cliente);
  await checkoutPage.continuar();
  await checkoutPage.finalizarCompra();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.mensagemSucesso).toHaveText('Thank you for your order!');
  await expect(produtosPage.contadorCarrinho).not.toBeVisible();
});

test('CT008 - Checkout sem preencher o nome', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.preencherDados({ ...cliente, nome: '' });
  await checkoutPage.continuar();

  await expect(checkoutPage.mensagemErro).toHaveText('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});
