import { Locator, Page } from '@playwright/test';

// Tela do carrinho: 
export class CarrinhoPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly itensCarrinho: Locator;
  readonly botaoCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.locator('[data-test="title"]');
    this.itensCarrinho = page.locator('[data-test="inventory-item"]');
    this.botaoCheckout = page.getByRole('button', { name: 'Checkout' });
  }

  item(nomeProduto: string): Locator {
    return this.itensCarrinho.filter({ hasText: nomeProduto });
  }

  quantidadeDoItem(nomeProduto: string): Locator {
    return this.item(nomeProduto).locator('[data-test="item-quantity"]');
  }

  precoDoItem(nomeProduto: string): Locator {
    return this.item(nomeProduto).locator('[data-test="inventory-item-price"]');
  }

  async irParaCheckout() {
    await this.botaoCheckout.click();
  }
}
