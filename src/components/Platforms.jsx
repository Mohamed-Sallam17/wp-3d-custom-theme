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
        .platform-track--center::before,
        .platform-track--center::after{
          content: "";
          background-image: url(http://wameed.local/wp-content/themes/wameedcustomtheme/assets/home/platforms/line.webp);
          width: 10px;
          height: 80%;
          background-size: contain;
          position: absolute;
          background-repeat: no-repeat;
          display: inline-block;
          top: 50%;
          transform: translateY(-50%);
        }
        .platform-track--center::before{
          right: 0;
        }
        .platform-track--center::after{
          left: 0;
        }
        .platform-track--right::before,
        .platform-track--left::before
        {
          content: "";
          width: 100%;
          height: 70%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-size: cover;
          background-repeat: no-repeat;
        }
        .platform-track--right::before{
          background-image: url(http://wameed.local/wp-content/themes/wameedcustomtheme/assets/home/platforms/overlay-left.webp);
          right: 0;
        }
        .platform-track--left::before{
          background-image: url(http://wameed.local/wp-content/themes/wameedcustomtheme/assets/home/platforms/overlay-right.webp);
          left: 0;
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
            <div className="platform-track relative flex flex-col lg:flex-row justify-between w-full">
                <div className="platform-track--left relative flex flex-2 justify-center" >
                  <div className="flex items-center justify-center">
                    <img src={`${themeUrl}/assets/home/platforms/wordpress-icon.webp`} alt="" width={100} height={100}/>
                    <img src={`${themeUrl}/assets/home/platforms/salla-icon.webp`} alt="" width={100} height={100}/>
                  </div>
                </div>
                <div className="platform-track--center relative flex flex-1 justify-center">
                    <img 
                    src={`${themeUrl}/assets/home/platforms/star-icon.webp`} 
                    alt="" 
                    width={150} 
                    height={150}
                    className="w-full h-full object-cover max-w-[65%]"
                    />
                </div>
                <div className="platform-track--right relative flex flex-2 justify-center">
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
