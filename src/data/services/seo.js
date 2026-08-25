import themeUrl from '../../utils/themeUrl';


const seo = {
  slug: "seo",

  title: "تحسين محركات البحث",
  subtitle: "seo",

  hero: {
    title: "seo",
    subtitle: "تحسين محركات البحث",
    image: `${themeUrl}/assets/servicePage/seo/hero.webp`,
  },

  intro: {
    title: "تحسين محركات البحث",
    description:
      " هو عملية تطوير وتعديل مواقع الويب لزيادة عدد الزوار المجانيين وتحسين ترتيب الموقع في نتائج البحث مثل جوجل. ويتكون من ثلاثة أقسام أساسية: تحسين المحتوى والكلمات المفتاحية، وبناء الروابط الخلفية، وضبط الجانب التقني للموقع.",
    image:`${themeUrl}/assets/servicePage/seo/intro.webp`,
  },

  features: {
    title: "الـمهـام",
    items: [
      {
        title: " تحليل كلمات مفتاحية",
        icon: `${themeUrl}/assets/servicePage/seo/features/feature-1.webp`,
      },
      {
        title: " تحسين هيكـــل الـموقع",
        icon: `${themeUrl}/assets/servicePage/seo/features/feature-2.webp`,
      },
      {
        title: " تقارير ترتيــــب الـموقع",
        icon: `${themeUrl}/assets/servicePage/seo/features/feature-3.webp`,
      },
      {
        title: " التقارير والتحليلات ",
        icon: `${themeUrl}/assets/servicePage/seo/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "أرقام ",
      normal: "تتحدث عنا"
    },
    images: [
      "${themeUrl}/assets/servicePage/seo/showcase/showcase-1.webp",
      "${themeUrl}/assets/servicePage/seo/showcase/showcase-2.webp",
      "${themeUrl}/assets/servicePage/seo/showcase/showcase-3.webp",
    ],
  },

  partners: {
    title: "شركاؤنا",
    logos: [
      "/assets/images/services/mobile-apps/partner-1.webp",
      "/assets/images/services/mobile-apps/partner-2.webp",
      "/assets/images/services/mobile-apps/partner-3.webp",
    ],
  },

  contact: {
    title: "تواصل معنا",
    description: "لديك مشروع؟ دعنا نساعدك في تنفيذه.",
  },
};

export default seo;