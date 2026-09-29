import { SITE_CONFIG } from "../../utils/siteConfig"
import themeUrl from "../../utils/themeUrl"

function ServicesGallery() {
    
    const serviceImages = [
        {
            image: `${themeUrl}/assets/servicespage/gallery/mediabuying.webp`,
            link: `/${SITE_CONFIG.servicesSlug}/media-buying`,
            alt: "mediabuying"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/motion.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/motion-graphic`,
            alt: "motion"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/graphic.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/branding`,
            alt: "graphic-design"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/content.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/content-writing`,
            alt: "content"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/mobileapp.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/mobile-apps`,
            alt: "mobileapp"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/seo-1.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/seo`,
            alt: "seo"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/cro.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/cro`,
            alt: "cro"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/uiux.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/ui-ux`,
            alt: "uiux"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/buildingwebsite.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/building-websites`,
            alt: "buildingwebsite"
        },
        {
            image: `${themeUrl}/assets/servicespage/gallery/socialmedia.webp`,
            link:`/${SITE_CONFIG.servicesSlug}/social-media`,
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
