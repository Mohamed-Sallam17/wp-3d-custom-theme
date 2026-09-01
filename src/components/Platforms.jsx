function Platforms() {
  return (
    <div className="platforms">
      <div className="container">
        <div className="block__title text-center mb-8">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">الأسئلة</span>
                <span className="text-3xl lg:text-5xl xl:text-6xl">الشائعة</span>
            </h2>
        </div>
        <div className="flex">
            <div className="platform-track">
                <div className="platform-track--left"></div>
                <div className="platform-track--center"></div>
                <div className="platform-track--right"></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Platforms
