(() => {
  const config = window.SUBTITLE_BRIDGE_SITE;
  const allowedUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; }
    catch { return false; }
  };
  const links = {download: 'installerUrl', portable: 'portableUrl', release: 'releaseUrl', source: 'sourceUrl'};
  for (const [attribute, key] of Object.entries(links)) {
    if (config && allowedUrl(config[key])) document.querySelectorAll(`[data-${attribute}]`).forEach(a => a.href = config[key]);
  }
  if (config) {
    document.querySelectorAll('[data-version]').forEach(el => el.textContent = config.version);
    document.querySelectorAll('[data-size]').forEach(el => el.textContent = config.installerSize);
  }
  // Three fixed, public examples from the shipped offline dictionary. No requests or tracking.
  const examples = {
    journey: {pronunciation: '/ˈdʒɝni/', part: 'NOUN', meaning: 'ခရီး၊ ခရီးစဉ်'},
    small: {pronunciation: '/smˈɔːl/', part: 'ADJECTIVE', meaning: 'သေးငယ်သော'},
    step: {pronunciation: '/stˈɛp/', part: 'NOUN', meaning: 'ခြေလှမ်း'}
  };
  const card = document.getElementById('demo-card');
  const wordButtons = [...document.querySelectorAll('[data-word]')];
  const close = () => { card.hidden = true; wordButtons.forEach(b => b.setAttribute('aria-pressed', 'false')); };
  wordButtons.forEach(button => button.addEventListener('click', () => {
    const word = button.dataset.word;
    const result = examples[word];
    if (!result) return;
    document.getElementById('demo-word').textContent = word;
    document.getElementById('demo-pronunciation').textContent = result.pronunciation;
    document.getElementById('demo-part').textContent = result.part;
    document.getElementById('demo-meaning').textContent = result.meaning;
    card.hidden = false;
    wordButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.getElementById('demo-announcement')?.replaceChildren(document.createTextNode(`${word}: ${result.meaning}`));
  }));
  document.getElementById('close-demo').addEventListener('click', () => {
    const active = wordButtons.find(b => b.getAttribute('aria-pressed') === 'true');
    close();
    active?.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !card.hidden && document.querySelector('.hero-demo').contains(document.activeElement)) {
      const active = wordButtons.find(b => b.getAttribute('aria-pressed') === 'true');
      close(); active?.focus();
    }
  });
})();
