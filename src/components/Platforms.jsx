import themeUrl from "../utils/themeUrl"

function Platforms() {

  return (
    <div className="platforms">

        <style>{`
        @media(min-width:1024px){        
        .platform-track::before {
          content: "";
          background-image: url('${themeUrl}/assets/home/platforms/star-bg.webp');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 95%;
          height: 95%;
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
          height: 75%;
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
          width: 95%;
          height: 70%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-size: cover;
          background-repeat: no-repeat;
          z-index: -1;
        }
        .platform-track--right::before{
          background-image: url(http://wameed.local/wp-content/themes/wameedcustomtheme/assets/home/platforms/overlay-right.webp);
          left: -5px;
        }
        .platform-track--left::before{
          background-image: url(http://wameed.local/wp-content/themes/wameedcustomtheme/assets/home/platforms/overlay-left.webp);
          right: -5px;
        }
        }

        @media(max-width:1023px){
        .platform-track{
          background-color: #110A2480;
          border: 1px solid #7652D633;
          padding:40px 20px;
          border-radius: 24px;
        }
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
        <div className="flex justify-center">
            <div className="platform-track relative flex flex-col gap-7 lg:gap-0 lg:flex-row justify-between w-full sm:max-w-[85%] md:max-w-full">
                <div className="platform-track--right hidden relative lg:flex flex-2 justify-center" >
                  <div className="flex items-center justify-center w-full space-x-6">
                    <img src={`${themeUrl}/assets/home/platforms/google-icon.webp`} alt="" width={75} height={75} className="w-[60px] xl:w-[75px]"/>
                    <img src={`${themeUrl}/assets/home/platforms/zid-icon.webp`} alt="" width={95} height={95} className="w-[70px] xl:w-[95px]"/>
                    <img src={`${themeUrl}/assets/home/platforms/wordpress2-icon.webp`} alt="" width={120} height={120} className="w-[75px] xl:w-[120px]"/>
                  </div>
                </div>
                <div className="platform-track--center relative flex flex-1 justify-center">
                    <img 
                    src={`${themeUrl}/assets/home/platforms/center-star-icon.png`} 
                    alt="" 
                    width={150} 
                    height={150}
                    className="w-full h-full object-cover max-w-[30%] lg:max-w-[65%]"
                    />
                </div>
                <div className="platform-track--left relative flex flex-2 justify-center" >
                  <div className="flex items-center justify-center w-full space-x-6 ">
                    <img src={`${themeUrl}/assets/home/platforms/wordpress2-icon.webp`} alt="" width={120} height={120} className="w-[65px] lg:w-[75px] xl:w-[120px]"/>
                    <img src={`${themeUrl}/assets/home/platforms/salla2-icon.webp`} alt="" width={95} height={95} className="w-[65px] lg:w-[70px] xl:w-[95px]"/>
                    <img src={`${themeUrl}/assets/home/platforms/shopify-icon.webp`} alt="" width={75} height={75} className="w-[65px] lg:w-[60px] xl:w-[75px]"/>
                    <img src={`${themeUrl}/assets/home/platforms/zid-icon.webp`} alt="" width={75} height={75} className="lg:hidden w-[65px] lg:w-[60px] xl:w-[75px]"/>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Platforms
