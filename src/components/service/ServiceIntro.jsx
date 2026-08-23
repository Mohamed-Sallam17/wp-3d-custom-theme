const ServiceIntro = ({ data }) => {

  return (
    <section className="service-intro">

      <div className="service-intro__image">
        <img
          src={data.image}
          alt={data.title}
          width="600"
          height="500"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="service-intro__content">

        <span>{data.subtitle}</span>

        <h2>{data.title}</h2>

        <p>{data.description}</p>


      </div>

    </section>
  );
};

export default ServiceIntro;