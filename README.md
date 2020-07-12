# Next.JS i18n Example (Experimental)

## Why use

- In the spirit of React, each component has its own set of translations, instead of declaring them in a global `locales` folder. Each component's translation dir is placed under: `/public/translations/`. So, translations for ***Title*** component, will be found under: `/public/translations/Title`.

- Fully dynamic translations

- Doesn't block automatic static optimizations

## Why not use

- Components will load all the translations **only** on the client. They will however be cached using a stale while revalidate cache strategy (using Vercel's [SWR lib](https://github.com/vercel/swr)), so that only the first load will result in a delay. Don't use this example if SEO is a top priority.

- If you don't want to maintain the all the i18n logic yourself.

- Don't want to write a lot of boilerplate

## Files

**1. `pages/_document.tsx`:**

Is only there to add the `lang` property in the `html` tag. Note: due to a limitation of Next.JS, the lang property won't change during client side language transitions because the document object is only rendered on the server.

**2. `pages/_app.tsx`:**

Is only there to add a `div` with a `dir` property. e.g. `rtl` and `ltr`

**3. `utils/i18n.tsx`:**

Has:

- `getI18nProps` --> `getStaticProps` and `getServerSideProps`

- `getI18nStaticPaths` --> `getStaticPaths`

- `withI18n` --> to wrapp all the pages that have components that will use the `useI18n` hook

- `useI18n` --> Returns the language loaded by `withI18n` along with the configs.

- `withPrefetchTranslations` --> Adds a prefetch header so that the user doesn't have to wait for the component to mount in order to download the translations. This however doesn't entirely solve the latency issue because your page won't show the translations until the components actually mount. That's because SWR can only access the prefetched version when the component mounts and the all the JS has been loaded. This can be useful for large translations and large XHR requests in general. But given the atomicity of the translations in this example, it probably won't make much difference in the latency anyway, because the major bottleneck is React, not the translations. NOTE: Neither works on Safari nor Safari IOS.

**4. `i18n.config.ts`:**

Example config:

```TS
const allLanguages: Config = {
  en: {
    name: 'English',
    prefix: 'en',
  },
  ar: {
    name: 'العربية',
    prefix: 'ar',
    direction: 'rtl',
  },
};
```

## Builds on the work done in

- [Vinissimus's next-translate](https://github.com/vinissimus/next-translate)
- [Janus Reith's i18n example](https://codesandbox.io/s/nextjs-i18n-staticprops-new-ouyrb)