# Site para João Fecchio

Este repositório contém somente o site-presente para João. A skill instalável, seu código, marketplace e releases vivem separadamente em [Evidence-driven Engineering](https://github.com/mSq-b12/evidence-driven-engineering).

## Stack e estrutura

- `site/`: HTML, CSS, JavaScript, favicon e imagens do site.
- `skill-release.json`: repositório da skill e versão publicada que o site recomenda instalar.
- `scripts/build-site.mjs`: gera `dist/` e substitui `{{VERSION}}` pela versão fixada.
- `scripts/serve-site.mjs`: servidor local para prévia.
- `tests/site.test.mjs`: valida o build, os comandos e os botões de copiar.
- `.github/workflows/pages.yml`: testes e deploy automático no GitHub Pages.

O site não contém uma cópia da skill, não precisa de backend e não coleta dados, cookies ou analytics. Os comandos de instalação apontam para uma tag pública e imutável do **outro** repositório.

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

Para conferir a instalação de ponta a ponta sem alterar seu Codex pessoal, use um `CODEX_HOME` descartável, rode os dois comandos mostrados no site e confirme `installed: true` e `enabled: true` em `codex plugin list --json`. Remova somente o diretório descartável depois.

## Publicar

Pushes em `main` executam o workflow que publica `dist/` em <https://msq-b12.github.io/joao-fecchio-site/>. O repositório precisa ter Pages configurado para **GitHub Actions**. Os recursos locais usam caminhos relativos; para um domínio próprio, atualize `canonical`, `og:url` e as imagens sociais absolutas em `site/index.html`.

## Atualizar a versão recomendada

Publique e teste primeiro uma nova tag no repositório da skill. Depois altere `version` em `skill-release.json`, rode os testes e o build, revise o comando gerado e publique este repositório. A publicação da skill e a publicação do site usam commits separados.
