import { defaultLanguage } from '@/languageConfig';

export const sameLang = /* groq */ `
  lang == $lang
`;

// The drafts perspective normalizes _id, so also check _originalId (the draft id it resolved).
export const notDraft = /* groq */ `
  !(_id in path("drafts.**")) && !(_originalId in path("drafts.**"))
`;

export const fixPreviewForDrafts = /* groq */ `
  ((defined(lang) && ${sameLang}) || (!defined(lang) && $lang == "${defaultLanguage.name}"))
`;
