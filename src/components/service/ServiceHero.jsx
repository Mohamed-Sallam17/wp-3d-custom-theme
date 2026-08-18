const ServiceHero = ({ data }) => {
  return (
    <section className="service-hero">
      <div className="service-hero__content">
        <span className="service-hero__subtitle">
          {data.subtitle}
        </span>

        <h1 className="service-hero__title">
          {data.title}
        </h1>

        <p className="service-hero__description">
          {data.description}
        </p>
      </div>

      <div className="service-hero__image">
        <img
          src={data.image}
          alt={data.title}
        />
      </div>
    </section>
  );
};

export default ServiceHero;