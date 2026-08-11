/**
 * FAQ filtering without React.
 *
 * This replaced a useState/useMemo/useEffect trio plus a Radix Accordion, which together
 * pulled react-dom onto /hilfe for a text filter. The questions are native <details>, so
 * every answer is in the DOM and indexable whether or not this script ever runs — the
 * page is fully usable with JS disabled, just unfiltered.
 */
const norm = (value: string) => value.trim().toLowerCase();

const init = () => {
  const input = document.querySelector<HTMLInputElement>('[data-faq-search]');
  const clear = document.querySelector<HTMLButtonElement>('[data-faq-clear]');
  const empty = document.querySelector<HTMLElement>('[data-faq-empty]');
  const sections = [...document.querySelectorAll<HTMLDetailsElement>('[data-faq-section]')];
  if (!input || sections.length === 0) return;

  const apply = () => {
    const q = norm(input.value);
    let visibleSections = 0;

    for (const section of sections) {
      const questions = [...section.querySelectorAll<HTMLDetailsElement>('[data-faq-item]')];
      let visibleQuestions = 0;

      for (const question of questions) {
        const haystack = norm(question.textContent ?? '') + ' ' + norm(section.dataset.faqTitle ?? '');
        const match = q === '' || haystack.includes(q);
        question.hidden = !match;
        // Reveal the answer directly on a search hit; there is no point making someone
        // expand a result they just searched for.
        question.open = match && q !== '';
        if (match) visibleQuestions += 1;
      }

      section.hidden = visibleQuestions === 0;
      if (visibleQuestions > 0) {
        visibleSections += 1;
        if (q !== '') section.open = true;
      } else {
        section.open = false;
      }
    }

    if (empty) empty.hidden = visibleSections > 0;
    if (clear) clear.hidden = q === '';
  };

  input.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    input.value = '';
    for (const section of sections) section.open = false;
    apply();
    input.focus();
  });

  apply();
};

init();
