import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProdutosPage } from '../pages/ProdutosPage';


export async function doLogin(page: Page, usuario = process.env.USUARIO, senha = process.env.SENHA) {
  if (!usuario?.trim() || !senha?.trim()) {
    throw new Error(
      'Credenciais de login ausentes. Defina USUARIO e SENHA no .env ou passe usuario e senha.'
    );
  }

  const loginPage = new LoginPage(page);
  await loginPage.acessar();
  await loginPage.fazerLogin(usuario, senha);
}

// Faz login e confirma que caiu na tela de produtos
export async function entraNaLoja(page: Page) {
  await doLogin(page);
  await expect(new ProdutosPage(page).titulo).toHaveText('Products');
}
