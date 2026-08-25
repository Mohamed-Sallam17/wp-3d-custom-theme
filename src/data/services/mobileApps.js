import themeUrl from '../../utils/themeUrl';


const mobileApps = {
  slug: "mobile-apps",

  title: "تطبيقات الجوال",
  subtitle: "Mobile Apps",

  hero: {
    title: "Mobile Apps",
    subtitle: "تطبيقات الجوال",
    image: `${themeUrl}/assets/servicePage/mobileapp/hero.webp`,
  },

  intro: {
    title: "تطبيقات الجوال",
    description:
      " برامج حاسوبية مصممة للعمل على الأجهزة الذكية مثل الهواتف والأجهزة اللوحية. تشمل أنواعها الرئيسية: تطبيقات التواصل الاجتماعي، تطبيقات الألعاب، والخدمات المصرفية. تتميز بسهولة التحميل من المتاجر الرقمية وتقديم خدمات سريعة ومباشرة للمستخدمين",
    image:`${themeUrl}/assets/servicePage/mobileapp/intro.webp`,
  },

  features: {
    title: "المميزات",
    items: [
      {
        title: " بناء واجهات مستخدم تفاعلية وسلسة  ",
        icon: `${themeUrl}/assets/servicePage/mobileapp/features/feature-1.webp`,
      },
      {
        title: " ربط التطبيق بقواعد البيانات السحابية وخدمات الـ API ",
        icon: `${themeUrl}/assets/servicePage/mobileapp/features/feature-2.webp`,
      },
      {
        title: " إرسال الإشعارات التنبيهية للمستخدمين بانتظام ",
        icon: `${themeUrl}/assets/servicePage/mobileapp/features/feature-3.webp`,
      },
      {
        title: " فحص الأخطاء البرمجية وإصدار التحديثات للصيانة ",
        icon: `${themeUrl}/assets/servicePage/mobileapp/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "تطبيقاتنا ",
      normal: "الـممـيـزة"
    },
    images: [
      `${themeUrl}/assets/servicePage/mobileapp/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/mobileapp/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/mobileapp/showcase/showcase-3.webp`,
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

export default mobileApps;