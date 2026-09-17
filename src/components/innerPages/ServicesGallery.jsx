import themeUrl from "../../utils/themeUrl"

function ServicesGallery() {

    const serviceImages = [
        `${themeUrl}/assets/servicespage/gallery/mediabuying.webp`,
        `${themeUrl}/assets/servicespage/gallery/motion.webp`,
        `${themeUrl}/assets/servicespage/gallery/graphic.webp`,
        `${themeUrl}/assets/servicespage/gallery/content.webp`,
        `${themeUrl}/assets/servicespage/gallery/mobileapp.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo-1.webp`,
        `${themeUrl}/assets/servicespage/gallery/cro.webp`,
        `${themeUrl}/assets/servicespage/gallery/uiux.webp`,
        `${themeUrl}/assets/servicespage/gallery/buildingwebsite.webp`,
        `${themeUrl}/assets/servicespage/gallery/socialmedia.webp`,
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
                serviceImages.map((image)=>(
                    <div className="gallery-item w-[45%] md:w-[30%]">
                        <a href="#">
                            <img src={image} alt="" />
                        </a>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ServicesGallery
