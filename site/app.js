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

const storyLink = document.querySelector('[data-story-link]');
storyLink?.addEventListener('click', () => {
  window.requestAnimationFrame(() => document.getElementById('process-title')?.focus({ preventScroll: true }));
});

const artifact = document.querySelector('[data-artifact]');
if (artifact && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pendingFrame = false;
  artifact.addEventListener('pointermove', (event) => {
    if (pendingFrame) return;
    pendingFrame = true;
    window.requestAnimationFrame(() => {
      const rect = artifact.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 5;
      const y = ((event.clientY - rect.top) / rect.height - .5) * -5;
      artifact.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
      artifact.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
      pendingFrame = false;
    });
  });
  artifact.addEventListener('pointerleave', () => {
    artifact.style.setProperty('--tilt-x', '0deg');
    artifact.style.setProperty('--tilt-y', '0deg');
  });
}

const methodInstrument = document.querySelector('[data-method-instrument]');
const stepReadout = document.querySelector('[data-step-readout]');
for (const stage of document.querySelectorAll('[data-step]')) {
  stage.addEventListener('toggle', () => {
    if (!stage.open || !methodInstrument || !stepReadout) return;
    const step = Number(stage.dataset.step);
    if (!Number.isInteger(step) || step < 1 || step > 5) return;
    methodInstrument.style.setProperty('--step', String(step));
    stepReadout.textContent = String(step).padStart(2, '0');
  });
}

const storyProgress = document.querySelector('[data-story-progress]');
if (storyProgress) {
  let progressFrame = false;
  const updateProgress = () => {
    if (progressFrame) return;
    progressFrame = true;
    window.requestAnimationFrame(() => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, window.scrollY / range));
      storyProgress.style.transform = `scaleX(${value})`;
      progressFrame = false;
    });
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}
