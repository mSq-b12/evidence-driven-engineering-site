# Evidence-driven Engineering — site oficial da Skill

Site público de apresentação e instalação de [Evidence-driven Engineering](https://github.com/mSq-b12/evidence-driven-engineering), uma skill independente para orientar agentes em tarefas de engenharia de software.

Este repositório publica somente o site estático. A skill canônica, o plugin, o marketplace e as releases são mantidos separadamente no repositório do produto; não copie nem publique o pacote por aqui.

## Stack e estrutura

- `site/`: HTML, CSS, JavaScript, favicon e imagens do site.
- `skill-release.json`: repositório da skill e versão publicada que o site recomenda instalar.
- `scripts/build-site.mjs`: gera `dist/` e substitui `{{VERSION}}` pela versão fixada.
- `scripts/serve-site.mjs`: servidor local para prévia.
- `tests/site.test.mjs`: valida o build, os comandos e os botões de copiar.
- `.github/workflows/pages.yml`: testes e deploy automático no GitHub Pages.

O site não contém uma cópia da skill, não precisa de backend e não coleta dados, cookies ou analytics. Os comandos apontam para a tag pública fixada em `skill-release.json`. A publicação da Skill e a publicação deste site são mudanças separadas.

## Rodar localmente

Com Node.js 22 ou mais recente, execute na raiz deste repositório:

```sh
node scripts/build-site.mjs
node scripts/serve-site.mjs
```

Abra `http://127.0.0.1:4173/`. Não abra `site/index.html` diretamente: o build ainda precisa resolver o marcador da versão.

## Verificar

```sh
node --test
node scripts/build-site.mjs
```

O primeiro comando cadastra o marketplace; ele não instala o plugin. Instale-o pela tela Plugins do Codex ou, nas versões de CLI que oferecem o comando, por `codex plugin add`. O projeto da Skill documenta atualização e remoção em [installation.md](https://github.com/mSq-b12/evidence-driven-engineering/blob/main/docs/installation.md). Smoke tests devem usar um `CODEX_HOME` temporário, sem alterar o perfil habitual do usuário.

## Publicar

Pushes em `main` com mudanças nos caminhos monitorados executam os testes, geram `dist/` e publicam em <https://msq-b12.github.io/evidence-driven-engineering-site/>. O GitHub Pages precisa estar configurado para **GitHub Actions**. Recursos locais usam caminhos relativos. Se mudar domínio ou nome do repositório, atualize URL canônica e metadados sociais em `site/index.html`.

## Atualizar a versão recomendada

Publique e teste primeiro uma nova tag no repositório da skill. Depois altere `version` em `skill-release.json`, rode os testes e o build, revise o comando gerado e publique este repositório. A publicação da skill e a publicação do site usam commits separados.
