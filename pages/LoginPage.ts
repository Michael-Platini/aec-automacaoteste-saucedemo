import { expect, Locator, Page } from '@playwright/test';

// Tela de login: https://www.saucedemo.com/
export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;
  readonly mensagemErro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.getByPlaceholder('Username');
    this.campoSenha = page.getByPlaceholder('Password');
    this.botaoLogin = page.getByRole('button', { name: 'Login' });
    this.mensagemErro = page.locator('[data-test="error"]');
  }

  async acessar() {
    await this.page.goto('/');
    await expect(this.botaoLogin).toBeVisible();
  }

  async fazerLogin(usuario: string, senha: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
    await this.botaoLogin.click();
  }
}
