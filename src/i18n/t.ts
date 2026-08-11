import { translations, type Language, type TranslationKey } from './translations';

/**
 * Framework-free translation lookup for .astro components.
 *
 * `useLanguage().t` only works inside a React tree beneath a LanguageProvider, and React
 * context does not cross Astro island boundaries. Static .astro components therefore take
 * `lang` as a prop and call this instead. Same data, same keys — no provider required.
 *
 *   const tr = useT(Astro.props.lang);
 *   <h2>{tr('featuresTitle')}</h2>
 */
export const t = (lang: Language, key: TranslationKey): string => translations[lang][key];

export const useT = (lang: Language) => (key: TranslationKey) => t(lang, key);
