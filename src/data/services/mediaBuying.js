import themeUrl from '../../utils/themeUrl';

const mediaBuying ={
  slug: "media-buying",

  title: "إدارة الحملات الإعلانية ",
  subtitle: "Media Buying",

  hero: {
    title: "Media Buying",
    subtitle: "إدارة الحملات الإعلانية ",
    image: `${themeUrl}/assets/servicePage/mediabuying/hero.webp`,
  },

  intro: {
    title: "إدارة الحملات الإعلانية ",
    description:
      "هي عملية تخطيط وتنفيذ ومراقبة الإعلانات المدفوعة عبر الإنترنت للوصول إلى الجمهور المستهدف وتحقيق أهداف محددة. تشمل المراحل الأساسية لتنظيم أي حملة ناجحة: تحديد الأهداف بوضوح، تحليل الجمهور المستهدف بدقة، واختيار المنصات الإعلانية المناسبة ",
    image:`${themeUrl}/assets/servicePage/mediabuying/intro.webp`,
  },

  features: {
    title: "الـمهـام",
    items: [
      {
        title: "تحديد الجمهور المستهدف ",
        icon: `${themeUrl}/assets/servicePage/mediabuying/features/feature-1.webp`,
      },
      {
        title: "إدارة ومراقبة الميزانية ",
        icon: `${themeUrl}/assets/servicePage/mediabuying/features/feature-2.webp`,
      },
      {
        title: "تصميم المحتوى الإبداعي ",
        icon: `${themeUrl}/assets/servicePage/mediabuying/features/feature-3.webp`,
      },
      {
        title: "التحليل والتحسين ",
        icon: `${themeUrl}/assets/servicePage/mediabuying/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "أرقام",
      normal: "تتحدث عنا"
    },
    images: [
      `${themeUrl}/assets/servicePage/mediabuying/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/mediabuying/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/mediabuying/showcase/showcase-3.webp`,
    ],
  },
}

export default mediaBuying;