import ServiceHero from "./ServiceHero";
import ServiceIntro from "./ServiceIntro";


import { services } from "../../data/services";

import "../../../styles/css/servicePage.css"

const ServicePage = ({ serviceSlug }) => {

  const data = services[serviceSlug];

  if (!data) {
    return null;
  }

  return (
    <main className="service-page">
      <ServiceHero data={data.hero} />
      <ServiceIntro data={data.intro}/>
    </main>
  );
};

export default ServicePage;