const ServiceHero = ({ data }) => {
  return (
    <section className="service-hero py-8 mt-8 lg:mt-16">
      <div className="container">
        <div className="flex gap-8">
          <div className="flex flex-1 justify-center items-center">
            <div className="w-full flex justify-center items-center flex-col gap-6 lg:gap-0 sm:max-w-[85%] md:max-w-full">
              <div className="service-hero__content text-center">
                <h2 className="text-3xl md:text-4xl lg:text-6xl  font-bold leading-normal gradient-text ">{data.title}</h2>
                <span className="text-3xl md:text-4xl lg:text-6xl font-bold leading-normal ">{data.subtitle}</span>
              </div>
              <div className="w-full overflow-hidden flex md:hidden ">
                <img src={data.image} alt={data.title} width="600px" height="500px" decoding="async" className="object-contain w-full h-full block m-auto"/>
              </div>
              <div className="service-hero__action flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
                <button className="dark-btn w-full md:w-auto">اكتشف خدماتنا</button>
                <button className="gradient-btn w-full md:w-auto">ابدأ مشروعك بوميض</button>
              </div>
            </div>
          </div>
          <div className="service-hero__media flex-1 hidden md:flex">
            <div className="w-full overflow-hidden aspect-square lg:aspect-4/3">
              <img src={data.image} alt={data.title} width="600" height="500" decoding="async" className="object-contain w-full h-full block m-auto"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;