# Artefato de evidência: redesign do site para João

## Diagnóstico observado

O site atual é legível e tem copy pessoal, instalação real, HTML semântico e fallback de cópia. O visual, porém, fica estático depois da primeira foto: carta, cinco linhas do método e bloco de instalação parecem peças separadas. O botão principal envia direto à instalação; “Conhecer o método” aponta para `#metodo` e pula a mensagem de Braian. O método é descrito como sistema, mas mostrado como lista.

## Alternativas avaliadas

1. **Artefato de evidência (escolhida):** um instrumento gráfico de cinco canais une abertura, carta, método e entrega. Mantém a identidade papel/grafite/verde, ganha profundidade e movimento com CSS, SVG e JavaScript pequeno. Melhor equilíbrio entre presente, engenharia e desempenho.
2. **Laboratório de provas:** diffs reais e cadernos de evidência. Alta credibilidade técnica, mas menor emoção para uma entrega pessoal.
3. **Carta que vira máquina:** letras se transformam em circuitos. Forte intimidade, porém risco maior de legibilidade e responsividade.

O briefing delega explicitamente a escolha da direção e pede execução contínua; a alternativa 1 é a decisão de produto para esta rodada.

## Tese visual

Uma peça de engenharia feita para uma pessoa: papel frio, grafite profundo, verde de precisão, metal escovado e cinco canais que representam os cinco estágios reais da skill. O nome “João Fecchio” faz parte da composição do artefato, não é um token trocável num template. O caderno fotográfico existente passa a representar a origem física da ideia, não a imagem principal da abertura.

Leitura: redesign narrativo para um desenvolvedor específico, com linguagem editorial-industrial. `DESIGN_VARIANCE=9`, `MOTION_INTENSITY=7`, `VISUAL_DENSITY=5`. Um único tema claro com superfícies de grafite como objetos, não alternância arbitrária de tema. Cantos predominantemente retos; verde é o único acento.

## Narrativa e interação

1. **Abertura:** João vê uma inscrição pessoal em tipografia grande e um artefato de cinco canais em perspectiva. O único convite da primeira viewport é “Conhecer o método”. Não há CTA de instalação nem seu equivalente disfarçado.
2. **Carta (`#carta`):** o link leva suavemente ao início da mensagem existente de Braian, dá foco ao título sem provocar segundo salto e funciona como âncora sem JavaScript. Cabeçalho e margem de scroll não cobrem a primeira linha. A carta permanece o capítulo mais silencioso e legível.
3. **Construção:** a pergunta da carta se converte num percurso factual, sem inventar datas ou memórias: documentação pública, extração de princípios, criação da skill, revisão adversarial, benchmarks, refinamento V2/V3. O caderno e fragmentos reais da metodologia dão materialidade.
4. **Método (`#metodo`):** cinco estágios da skill viram um circuito visual. Clique, teclado ou toque num estágio atualiza um painel de consequência prática e a indicação do canal selecionado. Todos os textos ficam acessíveis sem JavaScript.
5. **Evidência:** uma demonstração curta contrapõe um palpite a uma investigação e uma verificação. É exemplo de fluxo, não métrica inventada ou terminal falso.
6. **Entrega (`#entrega`):** os cinco canais se fecham numa inscrição final para João; só então aparecem os dois comandos oficiais fixados em `skill-release.json`, botões de copiar, confirmação no Codex e fallback manual. O primeiro uso vem como epílogo após os comandos.

## Motion e artefato

- Linguagem: revelar por máscara/transformação curta, não fades indiferenciados. Entrada 600-800 ms, estado do circuito 350-500 ms, resposta de botão 160-220 ms, curva `cubic-bezier(.22,1,.36,1)`.
- Sem scroll-jacking, autoplay de som ou animação infinita. Observadores de interseção só atualizam classes/progresso sem medir layout a cada frame.
- Cursor fino altera a iluminação/perspectiva do artefato apenas em ponteiros precisos; teclado e touch recebem os mesmos controles de método. Nenhum cursor customizado.
- O artefato é CSS/SVG progressivo; imagem gerada de material pode servir como camada estática, mas não é requisito para leitura nem para instalação. Sem WebGL, Three.js, React ou dependência de animação. CSS 3D é suficiente para dar massa ao objeto e evita bundle grande.
- `prefers-reduced-motion: reduce` desliga percurso, parallax e reveals, mantém o diagrama estático e usa navegação instantânea. Sem JavaScript, todas as seções e comandos continuam presentes.

## Contratos preservados

- Português brasileiro e a mensagem pessoal sem histórias inventadas.
- Nome público do site e canonical/OG atuais.
- Marketplace `mSq-b12/evidence-driven-engineering@v{{VERSION}}`, comando `codex plugin add evidence-driven-engineering@evidence-driven-engineering`, feedback/fallback de clipboard, link para documentação e aviso de que o navegador não confirma a instalação.
- Favicon, imagem social, skip link, foco visível, semântica e easter egg JF.
- Repositórios separados: este contém apenas site; o da skill contém plugin/release. Nenhum commit do redesign altera a skill.

## Critérios de aceitação

- Hero não contém “Começar instalação”, outro convite de instalação nem link primário para `#entrega`.
- “Conhecer o método” vai para `#carta`; a carta vem antes da construção e do método. Navegação por mouse, teclado, touch e sem JS preserva essa ordem.
- O método é visual/interativo sem esconder informação de leitores de tela ou sem JS.
- Comandos do final continuam exatos e uma instalação isolada da tag permanece verificável.
- Inspeção em 320, 390, 768, 1024 e 1440 px, foco/zoom, preferência por movimento reduzido, console e recursos sem erro. Renderizar, identificar ao menos um problema, corrigir e renderizar outra vez.
- Orçamento: zero dependências de runtime; JavaScript de página abaixo de 25 KB não comprimidos; primeira viewport sem asset visual acima de 500 KB; nenhuma animação de layout contínua. Medir pesos reais e relatar limites de métricas de campo.

## Referências de repertório

- [Visual Rambling: Dithering](https://visualrambling.space/dithering-part-1/) mostra visuais que evoluem para explicar, não só decorar.
- [The Pudding: responsive scrollytelling](https://pudding.cool/process/responsive-scrollytelling/) inspira a adaptação mobile sem sequestrar a rolagem.
- [Linear: latest design refresh](https://linear.app/now/behind-the-latest-design-refresh) inspira fazer a estrutura apoiar o conteúdo principal.

Nenhuma composição ou animação dessas referências será copiada.
