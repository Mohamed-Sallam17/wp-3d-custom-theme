import themeUrl from "../../utils/themeUrl"

function ServicesGallery() {

    const serviceImages = [
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
        `${themeUrl}/assets/servicespage/gallery/seo.webp`,
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
                        <img src={image} alt="" />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ServicesGallery
