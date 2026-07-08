/* ---------------------------------------------------------------------------
   MEGA MENU — WAI-ARIA disclosure navigation (button + aria-expanded +
   aria-controls; NOT role=menubar). Self-contained and framework-agnostic:
   call initMegaMenu() once, everything else is derived from the markup.

   Progressive enhancement: without JS the panels open via CSS
   (:hover / :focus-within on desktop, statically stacked on mobile) — see the
   `.nav:not(.nav--js)` rules in style.css. This module adds the `nav--js`
   class and takes over with hover intent, one-panel-at-a-time, Escape,
   outside-click, focus management, and the mobile drawer.
   --------------------------------------------------------------------------- */

const OPEN_DELAY = 120; // hover intent before opening
const CLOSE_DELAY = 200; // grace so diagonal travel into the panel survives

export function initMegaMenu() {
  const nav = document.getElementById('nav');
  const links = document.getElementById('nav-links');
  if (!nav || !links) return;

  nav.classList.add('nav--js'); // switch off the CSS-only fallback

  const items = [...links.querySelectorAll('.nav__item')]
    .map((el) => ({
      el,
      trigger: el.querySelector('.nav__trigger'),
      panel: el.querySelector('.nav__panel'),
    }))
    .filter((it) => it.trigger && it.panel);

  const burger = nav.querySelector('.nav__burger');
  const mqDesktop = window.matchMedia('(min-width: 900px)');
  const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  let openItem = null;
  let openTimer = 0;
  let closeTimer = 0;

  const clearTimers = () => {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
  };

  /* one panel open at a time; `item` = null closes everything */
  function setOpen(item) {
    if (openItem === item) return;
    if (openItem) {
      openItem.el.classList.remove('nav__item--open');
      openItem.trigger.setAttribute('aria-expanded', 'false');
    }
    openItem = item;
    if (item) {
      item.el.classList.add('nav__item--open');
      item.trigger.setAttribute('aria-expanded', 'true');
    }
  }

  const closeAll = () => {
    clearTimers();
    setOpen(null);
  };

  /* ---- triggers: click / keyboard (works with or without hover) ---- */
  for (const item of items) {
    item.trigger.addEventListener('click', () => {
      clearTimers();
      setOpen(openItem === item ? null : item);
    });

    // ArrowDown from an open trigger drops focus into the panel
    item.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && openItem === item) {
        const first = item.panel.querySelector('a[href]');
        if (first) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* ---- desktop hover intent ---- */
    item.el.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!mqDesktop.matches || !mqHover.matches) return;
      clearTimers();
      if (openItem === item) return;
      // switching between open panels is near-immediate; first open waits
      openTimer = setTimeout(() => setOpen(item), openItem ? 40 : OPEN_DELAY);
    });
    item.el.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!mqDesktop.matches || !mqHover.matches) return;
      clearTimeout(openTimer);
      if (!openItem) return;
      closeTimer = setTimeout(() => setOpen(null), CLOSE_DELAY);
    });
  }

  /* if a panel is open, moving focus to another trigger follows it */
  links.addEventListener('focusin', (e) => {
    if (!mqDesktop.matches || !openItem) return;
    const item = items.find((it) => it.trigger === e.target);
    if (item && item !== openItem) {
      clearTimers();
      setOpen(item);
    }
  });

  /* focus leaving the nav closes the open panel */
  nav.addEventListener('focusout', (e) => {
    if (!mqDesktop.matches) return;
    if (e.relatedTarget && nav.contains(e.relatedTarget)) return;
    closeAll();
  });

  /* click / tap outside the nav closes any open panel (and the drawer) */
  document.addEventListener('pointerdown', (e) => {
    if (nav.contains(e.target)) return;
    closeAll();
    if (drawerOpen) setDrawer(false);
  });

  /* ---- mobile drawer ---- */
  let drawerOpen = false;
  let prevOverflow = '';

  function setDrawer(open) {
    if (drawerOpen === open) return;
    drawerOpen = open;
    nav.classList.toggle('nav--open', open);
    if (burger) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    // lock body scroll while the drawer is open
    if (open) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow;
      closeAll(); // collapse any expanded accordion section
    }
  }

  burger?.addEventListener('click', () => setDrawer(!drawerOpen));

  // choosing a destination closes the drawer
  links.addEventListener('click', (e) => {
    if (e.target.closest('a[href]') && !mqDesktop.matches) setDrawer(false);
  });

  /* Escape: close panel (desktop) or drawer (mobile), restore focus */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawerOpen) {
        setDrawer(false);
        burger?.focus();
      } else if (openItem) {
        const t = openItem.trigger;
        closeAll();
        t.focus();
      }
      return;
    }
    /* trap focus inside the header while the drawer is open */
    if (e.key === 'Tab' && drawerOpen && !mqDesktop.matches) {
      const focusables = [
        ...nav.querySelectorAll('a[href], button:not([disabled])'),
      ].filter((el) => el.getClientRects().length > 0);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* crossing the breakpoint resets everything */
  mqDesktop.addEventListener('change', () => {
    closeAll();
    setDrawer(false);
  });
}
