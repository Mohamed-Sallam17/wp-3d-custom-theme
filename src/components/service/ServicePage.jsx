import ServiceHero from "./ServiceHero";

const ServicePage = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <main className="service-page">
      <ServiceHero data={data.hero} />
    </main>
  );
};

export default ServicePage;