const ServiceHero = ({ data }) => {
  return (
    <section className="service-hero mt-8 lg:mt-20">
      <div className="container">
        <div className="flex gap-8">
          <div className="flex justify-center items-center flex-col flex-1 gap-6 lg:gap-0">
            <div className="service-hero__content">
              <h2 className="gradient-text text-3xl md:text-5xl xl:text-7xl font-bold leading-tight xl:leading-normal">{data.title}</h2>
              <span className="text-3xl md:text-5xl xl:text-7xl font-bold leading-tight xl:leading-normal">{data.subtitle}</span>
            </div>
            <div className="w-full overflow-hidden aspect-4/3 flex lg:hidden">
              <img src={data.image} alt={data.title} width="600px" height="500px" decoding="async" className="object-contain w-full h-full block"/>
            </div>
            <div className="service-hero__action flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
              <button className="dark-btn w-full">اكتشف خدماتنا</button>
              <button className="gradient-btn w-full">ابدأ مشروعك بوميض</button>
            </div>
          </div>
          <div className="service-hero__media flex-1 hidden lg:flex">
            <div className="w-full overflow-hidden aspect-4/3">
              <img src={data.image} alt={data.title} width="600" height="500" decoding="async" className="object-contain w-full h-full block"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;