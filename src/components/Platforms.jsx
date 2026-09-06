import themeUrl from "../utils/themeUrl"

function Platforms() {

  return (
    <div className="platforms">

        <style>{`
        .platform-track::before {
          content: "";
          background-image: url('${themeUrl}/assets/home/platforms/star-bg.webp');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .platform-track--center::before{
          content: "";
          background-image: url('${themeUrl}/assets/home/platforms/line-bg.webp');
        }
      `}
  </style>

      <div className="container">
        <div className="block__title text-center mb-8">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">شركاء </span>
                <span className="text-3xl lg:text-5xl xl:text-6xl">نجاحنا</span>
            </h2>
        </div>
        <div className="flex">
            <div className="platform-track relative flex flex-col lg:flex-row justify-between w-full gap-8">
                <div className="platform-track--left flex flex-2 justify-center" >
                  <div className="flex items-center justify-center">
                    <img src={`${themeUrl}/assets/home/platforms/wordpress-icon.webp`} alt="" width={100} height={100}/>
                    <img src={`${themeUrl}/assets/home/platforms/salla-icon.webp`} alt="" width={100} height={100}/>
                  </div>
                </div>
                <div className="platform-track--center flex flex-1 justify-center">
                    <img 
                    src={`${themeUrl}/assets/home/platforms/star-icon.webp`} 
                    alt="" 
                    width={200} 
                    height={200}
                    />
                </div>
                <div className="platform-track--right flex flex-2 justify-center">
                  <div className="flex items-center justify-center">
                    <img src={`${themeUrl}/assets/home/platforms/wordpress-icon.webp`} alt="" width={100} height={100}/>
                    <img src={`${themeUrl}/assets/home/platforms/salla-icon.webp`} alt="" width={100} height={100}/>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Platforms
