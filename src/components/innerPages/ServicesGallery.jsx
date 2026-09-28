import themeUrl from "../../utils/themeUrl"

function ServicesGallery() {
    
    const servicesSlug = "services"
    const serviceImages = [
        {
            image: `${themeUrl}/assets/servicespage/gallery/mediabuying.webp`,
            link: `/${servicesSlug}/media-buying`,
            alt: "mediabuying"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/motion.webp`,
            link:`/${servicesSlug}/motion-graphic`,
            alt: "motion"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/graphic.webp`,
            link:`/${servicesSlug}/branding`,
            alt: "graphic-design"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/content.webp`,
            link:`/${servicesSlug}/content-writing`,
            alt: "content"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/mobileapp.webp`,
            link:`/${servicesSlug}/mobile-apps`,
            alt: "mobileapp"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/seo-1.webp`,
            link:`/${servicesSlug}/seo`,
            alt: "seo"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/cro.webp`,
            link:`/${servicesSlug}/cro`,
            alt: "cro"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/uiux.webp`,
            link:`/${servicesSlug}/ui-ux`,
            alt: "uiux"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/buildingwebsite.webp`,
            link:`/${servicesSlug}/building-websites`,
            alt: "buildingwebsite"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/socialmedia.webp`,
            link:`/${servicesSlug}/social-media`,
            alt: "socialmedia"
        },

    ]

  return (
    <div className='container'>
        <div className="block__title lg:hidden">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            أعمالنا وخدماتنا
          </h2>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4">
            {
                serviceImages.map((item)=>(
                    <div className="gallery-item w-[45%] md:w-[30%]">
                        <a href={item.link}>
                            <img src={item.image} alt={item.alt} />
                        </a>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ServicesGallery
