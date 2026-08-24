const ServiceFeatures = ({data})=>{
    return(
        <section className="service-features py-8 mt-8 lg:mt-16">
            <div className="container">
                <div className="flex flex-col gap-6">
                    <div className="service-feature__title gradient-text text-center">
                        <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">{data.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {
                            data.items.map((item)=>(
                                <div className="service-feature__item flex flex-col gap-6 px-4 md:px-3 py-10 rounded-4xl">
                                    <div className="service-feature__icon">
                                        <img src={item.icon} alt="icon" width={172} height={172} className="m-auto max-w-[80%] sm:max-w-full" />
                                    </div>
                                    <h2 className="text-center font-bold text-[16px] md:text-2xl lg:text-xl xl:text-3xl leading-normal">{item.title}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ServiceFeatures;