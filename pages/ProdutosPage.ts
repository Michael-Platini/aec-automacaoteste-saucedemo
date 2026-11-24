import { Locator, Page } from '@playwright/test';

// Tela de produtos 
export class ProdutosPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly listaProdutos: Locator;
  readonly iconeCarrinho: Locator;
  readonly contadorCarrinho: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.locator('[data-test="title"]');
    this.listaProdutos = page.locator('[data-test="inventory-item"]');
    this.iconeCarrinho = page.locator('[data-test="shopping-cart-link"]');
    this.contadorCarrinho = page.locator('[data-test="shopping-cart-badge"]');
  }

  // Card de um produto, procurado pelo nome que aparece na tela
  produto(nomeProduto: string): Locator {
    return this.listaProdutos.filter({ hasText: nomeProduto });
  }

  precoDoProduto(nomeProduto: string): Locator {
    return this.produto(nomeProduto).locator('[data-test="inventory-item-price"]');
  }

  botaoRemover(nomeProduto: string): Locator {
    return this.produto(nomeProduto).getByRole('button', { name: 'Remove' });
  }

  async adicionarAoCarrinho(nomeProduto: string) {
    await this.produto(nomeProduto).getByRole('button', { name: 'Add to cart' }).click();
  }

  async abrirCarrinho() {
    await this.iconeCarrinho.click();
  }
}
