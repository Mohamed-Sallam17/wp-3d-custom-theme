import themeUrl from "../../utils/themeUrl"


function ServicePortfolio() {
  return (
    <div className="service-gallery fixed w-10 h-10 bottom-6 left-6 z-50 cursor-pointer">
        <img src={`${themeUrl}/assets/gallery-1.svg`} alt="" />
    </div>
  )
}

export default ServicePortfolio
