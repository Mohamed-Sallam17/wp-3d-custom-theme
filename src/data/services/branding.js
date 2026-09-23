import themeUrl from '../../utils/themeUrl';

const branding ={
  slug: "branding",

  title: "الهوية البصرية ",
  subtitle: "Branding",

  hero: {
    title: "Branding",
    subtitle: "الهوية البصرية ",
    image: `${themeUrl}/assets/servicePage/branding/hero.webp`,
  },

  intro: {
    title: "الهوية البصرية ",
    description:
      "عملية صنع صورة فريدة للشركة أو المشروع في عقول الناس، بينما الهوية البصرية (Visual Identity) هي الشكل الخارجي والمرئي الذي يعبر عن هذه الصورة مثل الألوان والرسومات؛ معاً، هما الأساس لجعل مشروعك معروفاً وموثوقاً به ",
    image:`${themeUrl}/assets/servicePage/branding/intro.webp`,
  },

  features: {
    title: "الـمهـام",
    items: [
      {
        title: "تصميم الشعـــــــــــــــــار ",
        icon: `${themeUrl}/assets/servicePage/branding/features/feature-1.webp`,
      },
      {
        title: "اختيار الألوان والخطوط ",
        icon: `${themeUrl}/assets/servicePage/branding/features/feature-2.webp`,
      },
      {
        title: "كتيب الاستخدام (Brand Guidelines) ",
        icon: `${themeUrl}/assets/servicePage/branding/features/feature-3.webp`,
      },
      {
        title: "تطبيقها على سوشيال ميديا وأوراق العمل ",
        icon: `${themeUrl}/assets/servicePage/branding/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "أعمالنا ",
      normal: "الـممـيـزة"
    },
    images: [
      `${themeUrl}/assets/servicePage/branding/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/branding/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/branding/showcase/showcase-3.webp`,
    ],
  },
}

export default branding;