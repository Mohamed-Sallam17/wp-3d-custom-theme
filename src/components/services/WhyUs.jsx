import themeUrl from "../../utils/themeUrl"

function WhyUs() {
    const featuresData = [
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-1.svg`,
            title: "خبرة مهنية"
        },
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-2.svg`,
            title: "استراتيجيات مخصصة"
        },
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-3.svg`,
            title: "نتائج قابلة للقياس"
        },
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-4.svg`,
            title: "دعم مستمر"
        },
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-5.svg`,
            title: "التزام بالمواعيد"
        },
        {
            icon: `${themeUrl}/assets/servicespage/whyusicons/icon-6.svg`,
            title: "حلول مبتكرة"
        },
    ]
  return (
    <div className="container">
        <div className="flex flex-col justify-center items-center">
            <div className="block__title text-center">
                <h2 className="gradient-text text-3xl lg:text-5xl font-bold mb-8 leading-normal">
                    لـمـــاذا تختــــار خدمـــات وميــض؟
                </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4 ">
                <div className="feature-star flex flex-3 justify-center items-center">
                    <img src={`${themeUrl}/assets/servicespage/whyusicons/star.webp`} alt="star-img" className="max-w-[70%] " />
                </div>
                <div className="features-list flex-2">
                    <div className="space-y-4 w-full md:max-w-[350px]">
                        {
                            featuresData.map((feature)=>(
                                <div className="feature-card gradient-bg flex items-center justify-between md:justify-start bg-[var(--second-bg-color)] rounded-4xl p-4">
                                    <img src={feature.icon} alt="" className="feature-icon max-w-[80px] md:max-w-[50px] me-4"/>
                                    <span className="feature-text font-bold text-xl xl:text-2xl">{feature.title}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhyUs
