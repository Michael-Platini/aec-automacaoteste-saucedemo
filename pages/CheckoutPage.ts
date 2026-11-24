import { Locator, Page } from '@playwright/test';

type DadosCliente = {
  nome: string;
  sobrenome: string;
  cep: string;
};

// Telas do checkout:
export class CheckoutPage {
  readonly page: Page;
  readonly titulo: Locator;

  // Etapa 1 - dados do cliente
  readonly campoNome: Locator;
  readonly campoSobrenome: Locator;
  readonly campoCep: Locator;
  readonly botaoContinuar: Locator;
  readonly mensagemErro: Locator;

  // Etapa 2 - resumo
  readonly itensResumo: Locator;
  readonly infoPagamento: Locator;
  readonly infoEntrega: Locator;
  readonly subtotal: Locator;
  readonly taxa: Locator;
  readonly total: Locator;
  readonly botaoFinalizar: Locator;

  // Etapa 3 - pedido concluído
  readonly mensagemSucesso: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.locator('[data-test="title"]');

    this.campoNome = page.getByPlaceholder('First Name');
    this.campoSobrenome = page.getByPlaceholder('Last Name');
    this.campoCep = page.getByPlaceholder('Zip/Postal Code');
    this.botaoContinuar = page.getByRole('button', { name: 'Continue' });
    this.mensagemErro = page.locator('[data-test="error"]');

    this.itensResumo = page.locator('[data-test="inventory-item"]');
    this.infoPagamento = page.locator('[data-test="payment-info-value"]');
    this.infoEntrega = page.locator('[data-test="shipping-info-value"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.taxa = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.botaoFinalizar = page.getByRole('button', { name: 'Finish' });

    this.mensagemSucesso = page.locator('[data-test="complete-header"]');
  }

  async preencherDados(dados: DadosCliente) {
    await this.campoNome.fill(dados.nome);
    await this.campoSobrenome.fill(dados.sobrenome);
    await this.campoCep.fill(dados.cep);
  }

  async continuar() {
    await this.botaoContinuar.click();
  }

  async finalizarCompra() {
    await this.botaoFinalizar.click();
  }
}
