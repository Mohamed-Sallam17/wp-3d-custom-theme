import themeUrl from '../../utils/themeUrl';


const ServiceIntro = ({ data }) => {

  return (
    <section className="service-intro py-8 mt-8 lg:mt-16">
      <div className="container md:pl-2">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:gap-4">
          <div className="service-intro__media flex justify-center items-center flex-2">
            <div className="">
              <img src={data.image} alt={data.title} width="600" height="400" decoding="async" loading="lazy" className="w-full h-full rounded-2xl"/>
            </div>
          </div>
          <div className="service-intro_content flex justify-center items-center flex-col flex-3 text-center lg:pl-4">
            <div className="space-y-6 md:max-w-[85%] relative">
              <h2 className="service-intro__title font-bold flex flex-col md:block justify-center space-y-2">
                <span className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl">نبذة عن  </span>
                <span className="gradient-text text-3xl lg:text-5xl xl:text-6xl">{data.title}</span>
              </h2>
              <p className="p-5 md:p-2 leading-normal lg:text-2xl">{data.description}</p>
              <img src={`${themeUrl}/assets/star.webp`} alt="star icon" width="50" height="50" decoding="async" loading="lazy"/>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ServiceIntro;