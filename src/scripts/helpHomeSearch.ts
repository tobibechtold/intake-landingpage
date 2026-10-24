/**
 * Search on the help home. Reads the inline JSON index (titles and short answers of the
 * topics with content in this language) and lists matching topics above the area lists.
 * Without JavaScript the area lists show every topic, so nothing is lost.
 */
import { searchTopics } from '@/lib/helpSearch';

interface IndexItem {
  id: string;
  title: string;
  short: string;
  href: string;
}

const init = () => {
  const input = document.querySelector<HTMLInputElement>('[data-help-search]');
  const clear = document.querySelector<HTMLButtonElement>('[data-help-clear]');
  const results = document.querySelector<HTMLElement>('[data-help-results]');
  const list = document.querySelector<HTMLUListElement>('[data-help-results-list]');
  const empty = document.querySelector<HTMLElement>('[data-help-empty]');
  const topics = document.querySelector<HTMLElement>('[data-help-topics]');
  const source = document.querySelector<HTMLScriptElement>('[data-help-index]');
  if (!input || !results || !list || !source) return;

  let index: IndexItem[] = [];
  try {
    index = JSON.parse(source.textContent ?? '[]');
  } catch {
    return;
  }
  const byId = new Map(index.map((item) => [item.id, item]));

  const row = (item: IndexItem) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.className =
      'block rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55';
    const title = document.createElement('span');
    title.className = 'block font-semibold text-foreground';
    title.textContent = item.title;
    const short = document.createElement('span');
    short.className = 'mt-1 block text-sm leading-6 text-foreground/50';
    short.textContent = item.short;
    link.append(title, short);
    li.append(link);
    return li;
  };

  const apply = () => {
    const query = input.value.trim();
    const searching = query !== '';
    const ids = searching ? searchTopics(index, query) : [];
    list.replaceChildren(...ids.flatMap((id) => (byId.has(id) ? [row(byId.get(id)!)] : [])));
    results.hidden = !searching;
    if (empty) empty.hidden = ids.length > 0;
    if (topics) topics.hidden = searching;
    if (clear) clear.hidden = !searching;
  };

  input.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    input.value = '';
    apply();
    input.focus();
  });
  apply();
};

init();
