import themeUrl from '../../utils/themeUrl';

const uiUx ={
  slug: "ui-ux",

  title: "تصميم واجهه الـمستخدم",
  subtitle: "UI UX Design",

  hero: {
    title: "UI UX Design",
    subtitle: "تصميم واجهه الـمستخدم",
    image: `${themeUrl}/assets/servicePage/uiux/hero.webp`,
  },

  intro: {
    title: "تصميم واجهه الـمستخدم",
    description:
      "هو عملية بناء المظهر المرئي والتفاعلي للمنتجات الرقمية، ويشمل تحديد الألوان، الأزرار، والخطوط. يهدف هذا المجال إلى جعل التفاعل بين الإنسان والآلة سهلاً، سريعاً، وممتعاً ",
    image:`${themeUrl}/assets/servicePage/uiux/intro.webp`,
  },

  features: {
    title: "المميزات",
    items: [
      {
        title: "تصميم واجهة مستخدم جذابة ",
        icon: `${themeUrl}/assets/servicePage/uiux/features/feature-1.webp`,
      },
      {
        title: "تسهيل التنقل داخل المتجر ",
        icon: `${themeUrl}/assets/servicePage/uiux/features/feature-2.webp`,
      },
      {
        title: "تصميم متجاوب يعمل بكفاءة على كل الأجهزة ",
        icon: `${themeUrl}/assets/servicePage/uiux/features/feature-3.webp`,
      },
      {
        title: "تحسين خطوات الشراء والدفع ",
        icon: `${themeUrl}/assets/servicePage/uiux/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "مواقع ",
      normal: "صممت بحب"
    },
    images: [
      `${themeUrl}/assets/servicePage/uiux/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/uiux/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/uiux/showcase/showcase-3.webp`,
    ],
  },
}

export default uiUx;