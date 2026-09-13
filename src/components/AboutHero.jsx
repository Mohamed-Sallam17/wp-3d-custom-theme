function AboutHero() {
  return (
    <div className="container">
        <div className="flex justify-center items-center flex-col gap-8 text-center">
            <div className="content max-w-[50%] space-y-8">
                <h1 className="font-bold text-4xl lg:text-6xl xl:text-8xl leading-normal">
                    من هي <span className="gradient-text">وميض</span>
                </h1>
                <p className="text-[var(--description-color)] lg:text-xl leading-normal">
                    في عالم تتسابق فيه العلامات التجارية على الظهور، نحن من يُضيء لك الطريق — من تصميم الهوية إلى بناء المتجر وإطلاق حملاتك التسويقية.
                </p>
            </div>
            <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full">
                <a href="#" className="dark-btn inline-block w-full md:w-auto">
                    <span className="">اكتشف خدماتنا</span>
                </a>
                <a href="" className="gradient-btn inline-block w-full md:w-auto">
                    <span className="">ابدأ مشروعك بوميض</span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default AboutHero
