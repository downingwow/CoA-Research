(() => {
  'use strict';
  const categories = [
    ['addon-request', 'Request an addon', 'Suggest an addon you would like built or added.'],
    ['addon-problem', 'Report an addon problem', 'Tell us what broke and what you expected to happen.'],
    ['aura-request', 'Request a WeakAura', 'Describe the alert or tracker that would help you.'],
    ['aura-problem', 'Report a WeakAura problem', 'Report a broken import, trigger, or display.'],
    ['site-request', 'Request a website feature', 'Suggest a tool, page, or improvement for BoneArchive.'],
    ['site-problem', 'Report a website problem', 'Let us know what page or feature is not working.']
  ];
  function mount() {
    const app = document.querySelector('#app');
    const updates = app && app.querySelector('.home-updates');
    if (!updates || app.querySelector('.home-feedback')) return;
    const section = document.createElement('section');
    section.className = 'home-feedback';
    section.innerHTML =
      '<div class="sectionline"><div><span class="eyebrow">COMMUNITY FEEDBACK</span><h2>Help shape what comes next</h2></div><span class="archive-wordmark">Requests and reports go straight to the project tracker</span></div>' +
      '<p class="home-feedback-intro">Have an addon idea, a WeakAura request, or something that needs fixing? Choose a category and tell us what you have in mind.</p>' +
      '<div class="feedback-categories" role="group" aria-label="What would you like to send?" tabindex="-1">' +
      categories.map(([id, title, description]) => '<button class="feedback-category" type="button" data-feedback-kind="' + id + '" aria-pressed="false"><strong>' + title + '</strong><span>' + description + '</span></button>').join('') +
      '</div><form class="feedback-form">' +
      '<label class="feedback-field">Addon, WeakAura, page, or feature name <span>Optional</span><input name="subject" maxlength="120" placeholder="What is this about?"></label>' +
      '<label class="feedback-field">Details<textarea name="details" rows="5" maxlength="5000" required placeholder="For a problem, include what you clicked and what happened. For a request, describe what you would like it to do."></textarea></label>' +
      '<div class="feedback-submit-row"><button class="button" type="submit">Continue to GitHub →</button><p class="feedback-note">This opens a ready-to-send report in GitHub. A GitHub account is needed to submit it.</p></div>' +
      '<p class="feedback-status" role="status" aria-live="polite"></p></form>';
    updates.insertAdjacentElement('afterend', section);
    let selected = '';
    section.addEventListener('click', event => {
      const button = event.target.closest('[data-feedback-kind]');
      if (!button) return;
      selected = button.dataset.feedbackKind;
      section.querySelectorAll('[data-feedback-kind]').forEach(option => {
        const active = option === button;
        option.classList.toggle('selected', active);
        option.setAttribute('aria-pressed', String(active));
      });
      section.querySelector('.feedback-status').textContent = '';
    });
    section.querySelector('.feedback-form').addEventListener('submit', event => {
      event.preventDefault();
      const status = section.querySelector('.feedback-status');
      if (!selected) {
        status.textContent = 'Choose one of the six categories first.';
        section.querySelector('.feedback-categories').focus();
        return;
      }
      const category = categories.find(([id]) => id === selected);
      const subject = section.querySelector('[name="subject"]').value.trim();
      const details = section.querySelector('[name="details"]').value.trim();
      if (!details) {
        section.querySelector('[name="details"]').focus();
        return;
      }
      const title = '[' + category[1] + ']' + (subject ? ' ' + subject : '');
      const body = [
        '**Category:** ' + category[1],
        subject ? '**Addon / WeakAura / page:** ' + subject : '',
        '',
        '**Details**',
        details,
        '',
        '**Page:** ' + location.href,
        '',
        '_Submitted from the BoneArchive homepage feedback form._'
      ].filter(Boolean).join('\n');
      const issueUrl = new URL('https://github.com/downingwow/CoA-Research/issues/new');
      issueUrl.searchParams.set('title', title);
      issueUrl.searchParams.set('body', body);
      window.open(issueUrl.toString(), '_blank', 'noopener,noreferrer');
      status.textContent = 'Your report is ready in GitHub. Review it there and select Submit new issue.';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
})();