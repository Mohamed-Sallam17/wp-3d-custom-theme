const ServiceShowcase = ({data})=>{
    return(
        <section className="service-showcase py-8 mt-8 lg:mt-16">
            <div className="container">
                <div>
                    <div className="service-feature__title text-center mb-[80px]">
                        <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                            <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">{data.title.highlighted}</span>
                            <span className="text-3xl lg:text-5xl xl:text-6xl">{data.title.normal}</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-15">
                        {
                            data.images.map((img)=>(
                                <div className="service-showcase__item relative rounded-4xl mx-4 md:my-4">
                                    <img src={img} alt="icon" width={500} height={400} className="w-full h-full relative z-10" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceShowcase;