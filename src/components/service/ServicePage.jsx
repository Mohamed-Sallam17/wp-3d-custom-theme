import ServiceHero from "./ServiceHero";
import ServiceIntro from "./ServiceIntro";
import ServiceFeatures from "./ServiceFeatures";
import ServiceShowcase from "./ServiceShowcase";


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
      <ServiceFeatures data={data.features}/>
      <ServiceShowcase data={data.showcase}/>
    </main>
  );
};

export default ServicePage;