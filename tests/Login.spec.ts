import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProdutosPage } from '../pages/ProdutosPage';
import { usuarioBloqueado } from '../data/massa';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.acessar();
});

test('CT001 - Login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const produtosPage = new ProdutosPage(page);

  await loginPage.fazerLogin(process.env.USUARIO!, process.env.SENHA!);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(produtosPage.titulo).toHaveText('Products');
  await expect(produtosPage.listaProdutos.first()).toBeVisible();
});

test('CT002 - Login com usuário bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.fazerLogin(usuarioBloqueado.usuario, usuarioBloqueado.senha);

  await expect(loginPage.mensagemErro).toContainText('Sorry, this user has been locked out.');
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test('CT003 - Login com senha inválida', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.fazerLogin(process.env.USUARIO!, 'senha_errada');

  await expect(loginPage.mensagemErro).toContainText('Username and password do not match any user in this service');
});
