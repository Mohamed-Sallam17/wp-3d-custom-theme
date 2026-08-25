import themeUrl from '../../utils/themeUrl';


const socialMedia = {
  slug: "social-media",

  title: "تحسين محركات البحث",
  subtitle: "Social Media",

  hero: {
    title: "Social Media",
    subtitle: "السوشيال ميديا",
    image: `${themeUrl}/assets/servicePage/socialmedia/hero.webp`,
  },

  intro: {
    title: "السوشيال ميديا",
    description:
      "  هي صناعة المحتوى البصري لمنصات التواصل الاجتماعي، وتشمل المنشورات، والقصص، والإعلانات المموّلة. تهدف هذه التصاميم إلى جذب انتباه الجمهور، وبناء هوية العلامة التجارية، وزيادة التفاعل والمبيعات.",
    image:`${themeUrl}/assets/servicePage/socialmedia/intro.webp`,
  },

  features: {
    title: "المميزات",
    items: [
      {
        title: " إنشاء خطة محتوى شهري",
        icon: `${themeUrl}/assets/servicePage/socialmedia/features/feature-1.webp`,
      },
      {
        title: " تصميم منشورات وقصص احترافية",
        icon: `${themeUrl}/assets/servicePage/socialmedia/features/feature-2.webp`,
      },
      {
        title: " إدارة التعليقات والرسائل",
        icon: `${themeUrl}/assets/servicePage/socialmedia/features/feature-3.webp`,
      },
      {
        title: "  تقارير تحليـــــل الأداء ",
        icon: `${themeUrl}/assets/servicePage/socialmedia/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "تصميماتنا ",
      normal: "الـممـيـزة"
    },
    images: [
      "${themeUrl}/assets/servicePage/socialmedia/showcase/showcase-1.webp",
      "${themeUrl}/assets/servicePage/socialmedia/showcase/showcase-2.webp",
      "${themeUrl}/assets/servicePage/socialmedia/showcase/showcase-3.webp",
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

export default socialMedia;