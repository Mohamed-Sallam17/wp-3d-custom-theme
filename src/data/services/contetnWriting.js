import themeUrl from '../../utils/themeUrl';

const contetnWriting ={
  slug: "content-writing",

  title: "كتابة المحتوى ",
  subtitle: "Content Writing",

  hero: {
    title: "Content Writing",
    subtitle: "كتابة المحتوى ",
    image: `${themeUrl}/assets/servicePage/contentwriting/hero.webp`,
  },

  intro: {
    title: "كتابة المحتوى ",
    description:
      " هي عملية إنتاج نصوص رقمية تهدف إلى جذب الجمهور، توصيل المعلومات، وإقناع القارئ بفكرة أو منتج، وتشمل أبرز أنواعها مقالات المدونات، منشورات وسائل التواصل الاجتماعي، والنصوص الإعلانية التسويقية. ",
    image:`${themeUrl}/assets/servicePage/contentwriting/intro.webp`,
  },

  features: {
    title: "الـمهـام",
    items: [
      {
        title: "صياغة الأفكار والعناوين ",
        icon: `${themeUrl}/assets/servicePage/contentwriting/features/feature-1.webp`,
      },
      {
        title: "كتابة المقالات والقصص ",
        icon: `${themeUrl}/assets/servicePage/contentwriting/features/feature-2.webp`,
      },
      {
        title: "التدقيق اللغوي والأسلوبي ",
        icon: `${themeUrl}/assets/servicePage/contentwriting/features/feature-3.webp`,
      },
      {
        title: "إعداد نصوص السوشيال ميديا ",
        icon: `${themeUrl}/assets/servicePage/contentwriting/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "أعمالنا ",
      normal: "الـممـيـزة"
    },
    images: [
      `${themeUrl}/assets/servicePage/contentwriting/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/contentwriting/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/contentwriting/showcase/showcase-3.webp`,
    ],
  },
}

export default contetnWriting;