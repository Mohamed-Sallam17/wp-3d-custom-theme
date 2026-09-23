import themeUrl from '../../utils/themeUrl';

const buildingWebsites ={
  slug: "building-websites",

  title: "إنشاء المتاجر الإلكترونية",
  subtitle: "Building Websites",

  hero: {
    title: "Building Websites",
    subtitle: "إنشاء المتاجر الإلكترونية",
    image: `${themeUrl}/assets/servicePage/buildingwebsites/hero.webp`,
  },

  intro: {
    title: "إنشاء الـمتاجر الإلكترونية",
    description:
      "  هو عملية بناء وتطوير واجهات المستخدم وتجربة المستخدم لعرض المنتجات وبيعها عبر الإنترنت. تشمل العناصر الأساسية لتحقيق ذلك واجهة مستخدم جذابة وسرعة تصفح عالية والتوافق مع الهواتف الذكية",
    image:`${themeUrl}/assets/servicePage/buildingwebsites/intro.webp`,
  },

  features: {
    title: "المميزات",
    items: [
      {
        title: " تطوير واجهة مستخدم جذابة ",
        icon: `${themeUrl}/assets/servicePage/buildingwebsites/features/feature-1.webp`,
      },
      {
        title: "إعداد طرق الدفع والشحن ",
        icon: `${themeUrl}/assets/servicePage/buildingwebsites/features/feature-2.webp`,
      },
      {
        title: "ربط الـمتجر مع أدوات التسويق ",
        icon: `${themeUrl}/assets/servicePage/buildingwebsites/features/feature-3.webp`,
      },
      {
        title: "تطبيقها على سوشيال ميديا وأوراق العمل ",
        icon: `${themeUrl}/assets/servicePage/buildingwebsites/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "مواقع ",
      normal: "بنيت بحب"
    },
    images: [
      `${themeUrl}/assets/servicePage/buildingwebsites/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/buildingwebsites/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/buildingwebsites/showcase/showcase-3.webp`,
    ],
  },
}

export default buildingWebsites;