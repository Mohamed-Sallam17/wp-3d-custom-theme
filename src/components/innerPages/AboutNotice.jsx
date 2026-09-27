import themeUrl from "../../utils/themeUrl"

function AboutNotice() {
  return (
    <div className="container md:pl-2">
        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
            <div className="service-intro_content flex justify-center items-center flex-col flex-3 text-center lg:pl-4">
                <div className="space-y-6 w-full md:max-w-[85%] relative">
                <h2 className="service-intro__title font-bold flex flex-col items-start space-y-2">
                    <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl leading-normal">نأخذ بيدك من</span>
                    <span className="gradient-text text-2xl sm:text-4xl lg:text-5xl xl:text-6xl ms-[35%] leading-normal"> القاع إلى أعلى قمة</span>
                </h2>
                </div>
            </div>
            <div className="service-intro__media flex justify-center items-center flex-2">
                <div className="">
                    <img src={`${themeUrl}/assets/helpyou.webp`}  alt="notice-img" width="600" height="400" decoding="async" loading="lazy" className="w-full h-full rounded-2xl"/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default AboutNotice
