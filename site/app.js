const copyButtons = document.querySelectorAll('[data-copy]');

for (const button of copyButtons) {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-copy');
    const command = document.getElementById(id);
    const status = document.querySelector(`[data-copy-status="${id}"]`);
    if (!command || !status) return;

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(command.textContent.trim());
      status.textContent = 'Comando copiado. Cole no terminal e execute.';
      button.textContent = 'Copiado';
      window.setTimeout(() => { button.textContent = 'Copiar'; }, 2400);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(command);
      selection?.removeAllRanges();
      selection?.addRange(range);
      command.focus();
      status.textContent = 'Não consegui copiar automaticamente. O comando está selecionado: copie com Ctrl+C ou ⌘+C.';
    }
  });
}

const installLink = document.querySelector('[data-install-link]');
installLink?.addEventListener('click', () => {
  window.setTimeout(() => document.getElementById('install-title')?.focus({ preventScroll: true }), 100);
});

const seal = document.getElementById('gift-seal');
const note = document.getElementById('gift-note');
seal?.addEventListener('click', () => {
  const open = seal.getAttribute('aria-expanded') === 'true';
  seal.setAttribute('aria-expanded', String(!open));
  note.hidden = open;
  if (!open) note.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
});
