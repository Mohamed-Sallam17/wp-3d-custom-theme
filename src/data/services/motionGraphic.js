import themeUrl from '../../utils/themeUrl';

const motionGraphic ={
  slug: "motion-graphic",

  title: "الـموشن جرافيك ",
  subtitle: "Motion Graphics",

  hero: {
    title: "Motion Graphics",
    subtitle: "الـموشن جرافيك ",
    image: `${themeUrl}/assets/servicePage/motion/hero.webp`,
  },

  intro: {
    title: "الـموشن جرافيك ",
    description:
      "هو فن تحريك الرسوم والصور والأشكال الثابتة أو النصوص وإعطائها الحياة، مع دمجها بالصوت والمؤثرات والتعليق الصوتي؛ بهدف تبسيط الأفكار المعقدة وإيصال رسالة محددة للجمهور بطريقة ممتعة وجذابة وفي وقت قصير. ",
    image:`${themeUrl}/assets/servicePage/motion/intro.webp`,
  },

  features: {
    title: "الـمهـام ",
    items: [
      {
        title: "كتابة السيناريو وتجهيز الفكرة الإبداعية ",
        icon: `${themeUrl}/assets/servicePage/motion/features/feature-1.webp`,
      },
      {
        title: "تصميم المشاهد والعناصر البصرية ",
        icon: `${themeUrl}/assets/servicePage/motion/features/feature-2.webp`,
      },
      {
        title: "تحريك النصوص والرسومات باحترافية ",
        icon: `${themeUrl}/assets/servicePage/motion/features/feature-3.webp`,
      },
      {
        title: "إضافة المؤثرات الصوتية وتسليم الفيديو النهائي ",
        icon: `${themeUrl}/assets/servicePage/motion/features/feature-4.webp`,
      },
    ],
  },

  showcase: {
    title: {
      highlighted: "أعمالنا ",
      normal: "الـممـيـزة"
    },
    images: [
      `${themeUrl}/assets/servicePage/motion/showcase/showcase-1.webp`,
      `${themeUrl}/assets/servicePage/motion/showcase/showcase-2.webp`,
      `${themeUrl}/assets/servicePage/motion/showcase/showcase-3.webp`,
    ],
  },
}

export default motionGraphic;