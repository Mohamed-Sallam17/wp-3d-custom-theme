
const ServiceHero = ({ data }) => {
  return (
    <section className="service-hero">
      <div className="container">
        <div className="flex justify-center items-center">
          <div className="service-hero__content flex justify-center items-center flex-col flex-1 space-y-2">
              <h2 className="gradient-text text-2xl lg:text-7xl font-bold leading-normal">{data.title}</h2>
              <span className="text-2xl lg:text-7xl font-bold leading-normal">{data.subtitle}</span>
              <div className="flex justify-center items-center gap-4">
                <button className="dark-btn">اكتشف خدماتنا</button>
                <button className="gradient-btn">ابدأ مشروعك بوميض</button>
              </div>
          </div>
          <div className="service-hero__media flex-1">
            <img src={data.image} alt={data.title} width="200px" height="200px"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;