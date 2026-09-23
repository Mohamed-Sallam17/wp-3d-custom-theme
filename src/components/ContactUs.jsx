import themeUrl from "../utils/themeUrl"

function ContactUs() {
    const contactDetails = [
        {
            id:"email",
            icon: `${themeUrl}/assets/home/contact/email.png`,
            text: "hello@wameed.sa",
            link: "mailto:hello@wameed.sa"
        },
        {
            id:"phone",
            icon: `${themeUrl}/assets/home/contact/phone.png`,
            text: "+966 50 000 0000",
            link: "tel:+966500000000"
        },
        {
            id:"address",
            icon: `${themeUrl}/assets/home/contact/location.png`,
            text: "الرياض، المملكة العربية السعودية",
            link: ""
        }
    ]
  return (
    <div className="container">
        <div className="flex items-center justify-center flex-col">
            <div className="block__title text-center mb-8 w-full">
                <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                    <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">تواصل </span>
                    <span className="text-3xl lg:text-5xl xl:text-6xl">معنا</span>
                </h2>
            </div>
            <div className="w-full sm:max-w-[85%] md:max-w-full lg:max-w-7xl">
                <div className="flex justify-center flex-col lg:flex-row w-full gap-4">
                    <div className="flex flex-2 flex-col gap-8 gradient-bg bg-[var(--second-bg-color)] p-8 rounded-4xl">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-4xl font-bold">أخبرنا عن مشروعك</h2>
                            <span className="text-[#9997AC]">املأ البيانات وسيصلك رد من فريقنا خلال يوم عمل واحد.</span>
                        </div>
                        <div className="contact-form">
                            <form action="">
                                <div className="flex flex-col gap-4">
                                    <input type="text" placeholder="الاسم"/>
                                    <input type="number" placeholder="رقم الجوال"/>
                                    <input type="email" placeholder="البريد الالكتروني"/>
                                    <textarea name="" id="" placeholder="رسالتك"></textarea>
                                </div>
                                <button type="submit">ارسال</button>
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-1 gradient-bg bg-[var(--second-bg-color)] flex flex-col gap-8 p-8 rounded-4xl">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="max-w-[50%]">
                                <img src={`${themeUrl}/assets/home/contact/contact-icon.png`} alt="" width="200" height="200" decoding="async" loading="lazy"/>
                            </div>
                            <div className="text-center md:px-8 space-y-2">
                                <h4 className="text-2xl font-semibold">فريقنا بانتظارك</h4>
                                <span className="text-[#9997AC]">نجيب على استفساراتك ونساعدك في اختيار الأنسب لمشروعك.</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {
                                contactDetails.map((item)=>(
                                    <div className="flex items-center gap-2 bg-gradient-to-br from-[#FFFFFF0F] via-[#FFFFFF04] to-[#FFFFFF0A] border border-[#FFFFFF17] rounded-4xl py-2 px-3">
                                        <img src={item.icon} alt="" width="40" height="40" decoding="async" loading="lazy"/>
                                        <a href={item.link}>
                                            <h4 className="text-[#EEECFDD9]">{item.text}</h4>
                                        </a>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs
