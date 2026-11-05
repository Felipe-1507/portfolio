(() => {
  const tabs = [...document.querySelectorAll('.portfolio-tab')];
  const panels = [...document.querySelectorAll('.portfolio-panel')];
  const aliases = { '#projetos': 'projetos', '#certificados': 'certificados', '#conquistas': 'conquistas', '#habilidades': 'habilidades', '#tech-stack': 'habilidades' };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function selectPanel(id, { focus = false, animate = false } = {}) {
    if (!panels.some(panel => panel.id === id)) return;
    tabs.forEach(tab => {
      const selected = tab.getAttribute('aria-controls') === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach(panel => {
      panel.hidden = panel.id !== id;
      panel.classList.remove('is-entering');
      if (!panel.hidden && animate && !reduceMotion) panel.classList.add('is-entering');
    });
    if (id === 'projetos') requestAnimationFrame(() => go(ci));
    updateNavigation();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('aria-controls');
      selectPanel(id, { animate: true });
      history.pushState(null, '', `#${id}`);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      const id = tabs[next].getAttribute('aria-controls');
      selectPanel(id, { focus: true });
      history.replaceState(null, '', `#${id}`);
    });
  });

  function restoreHash() {
    const id = aliases[location.hash];
    if (id) {
      selectPanel(id);
      requestAnimationFrame(() => document.getElementById('portfolio').scrollIntoView({ behavior: 'instant' }));
    } else selectPanel('projetos');
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const id = aliases[link.getAttribute('href')];
      if (id) selectPanel(id);
    });
  });
  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('popstate', restoreHash);

  const navLinks = [...document.querySelectorAll('.nav-ul a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function updateNavigation() {
    let current = sections[0];
    const threshold = Math.min(innerHeight * .35, 250);
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    if (Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);

  selectPanel(aliases[location.hash] || 'projetos');
  restoreHash();
})();
