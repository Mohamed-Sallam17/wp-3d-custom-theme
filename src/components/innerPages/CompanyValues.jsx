import themeUrl from "../../utils/themeUrl";

const valuesData = [
  {
    id: 1,
    title: "أهدافنا",
    description:
      "نساعد العلامات التجارية على بناء حضور رقمي قوي ومميز نرفع مستوى الوعي بالعلامة التجارية ونوصلها إلى الجمهور المناسب نطور تجربة العميل ونحول المتابعين والزوار إلى عملاء فعليين",
    image: `${themeUrl}/assets/home/vision/goals.webp`,
  },
  {
    id: 2,
    title: "قيمنا",
    description:
      "نؤمن بالابتكار والجودة والشفافية والالتزام ونعمل بروح الشراكة مع عملائنا لنقدم حلولا تسويقية احترافية مبنية على الثقة والتطوير المستمر وتحقيق أفضل النتائج",
    image: `${themeUrl}/assets/home/vision/values.webp`,
  },
  {
    id: 3,
    title: "رؤيتنا",
    description:
      "أن نكون شريكا تسويقيا موثوقا للعلامات التجارية في المملكة والخليج ونساهم في تحويل الأفكار والمشاريع إلى علامات قوية ومؤثرة من خلال حلول مبتكرة واستراتيجيات تحقق نموا حقيقيا ومستداما",
    image: `${themeUrl}/assets/home/vision/visions.webp`,
  },
];

const CompanyValues = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl w-full flex flex-col gap-16 lg:gap-24 mx-auto">
          {valuesData.map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
            >
              <div className="w-full lg:w-1/2 flex justify-center items-center h-[260px] sm:h-[320px] md:h-[380px]">
                <div className="relative w-full h-full max-w-md rounded-2xl overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="500"
                    height="380"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full max-w-full object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative px-4 sm:px-0 flex justify-center">

                <div className="relative z-10 w-full gradient-bg bg-gradient-to-bl from-[#050308] to-[#45296E] rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="gradient-bg bg-[var(--second-bg-color)] text-[#F5F4FC] px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-3xl text-lg md:text-2xl font-bold w-fit">
                      {item.title}
                    </h2>

                    <img
                      src={`${themeUrl}/assets/star.webp`}
                      alt="star icon"
                      width="32"
                      height="32"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyValues;
