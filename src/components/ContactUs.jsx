import { useState } from "react"
import themeUrl from "../utils/themeUrl"
import { SITE_CONFIG } from "../utils/siteConfig"

function ContactUs() {
    const contactDetails = [
        {
            id:"email",
            icon: `${themeUrl}/assets/home/contact/email.png`,
            text: SITE_CONFIG.email,
            link: `mailto:${SITE_CONFIG.email}`
        },
        {
            id:"phone",
            icon: `${themeUrl}/assets/home/contact/phone.png`,
            text: SITE_CONFIG.phoneNumber,
            link: `tel:${SITE_CONFIG.phoneNumber}`
        },
        {
            id:"address",
            icon: `${themeUrl}/assets/home/contact/location.png`,
            text: SITE_CONFIG.address,
            link: SITE_CONFIG.addressLink
        }
    ]


    const domainLink = window.location.origin

    const [formData , setFormData] = useState({
        'name-1': '',
        'phone-1': '',
        'email-1': '',
        'name-2': '',
        'textarea-1': '',
    })
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ loading: true, success: false, error: null });

  // Forminator ID Form
  const FORM_ID = 55;   ///111

  const bodyFormData = new FormData();
  Object.keys(formData).forEach((key) => {
    bodyFormData.append(key, formData[key]);
  });
  bodyFormData.append('form_id', FORM_ID);

try {
  const response = await fetch(`${domainLink}/wp-json/custom/v1/submit-forminator`, {
    method: 'POST',
    body: bodyFormData,
  });

  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (response.ok && data.success) {
      setStatus({ loading: false, success: true, error: null });
      setFormData({
        'name-1': '',
        'phone-1': '',
        'email-1': '',
        'name-2': '',
        'textarea-1': '',
        });
    } else {
      throw new Error(data.message || 'حدث خطأ أثناء الإرسال');
    }
  } else {

    const errorText = await response.text();
    console.error("Server PHP Error:", errorText);
    throw new Error('حدث خطأ في السيرفر (PHP Fatal Error)');
  }
} catch (err) {
  setStatus({ loading: false, success: false, error: err.message });
}
};
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
                <div className="flex justify-center flex-col-reverse lg:flex-row w-full gap-5">
                    <div className="flex flex-2 flex-col gap-8 gradient-bg bg-[var(--second-bg-color)] p-6 md:p-8 rounded-4xl">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-4xl font-bold">أخبرنا عن مشروعك</h2>
                            <span className="text-[#9997AC]">املأ البيانات وسيصلك رد من فريقنا خلال يوم عمل واحد.</span>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                            <div className="">
                                <input 
                                className="bg-[#E1B7E21A]"
                                placeholder="الاسم"
                                type="text" 
                                name="name-1" 
                                value={formData['name-1']} 
                                onChange={handleChange} 
                                required 
                                />
                            </div>

                            <div className="">
                                <input 
                                placeholder="رقم الجوال"
                                type="tel" 
                                dir="rtl"
                                name="phone-1" 
                                value={formData['phone-1']} 
                                onChange={handleChange} 
                                required 
                                />
                            </div>

                            <div>
                                <input 
                                placeholder="البريد الإلكتروني"
                                type="email" 
                                name="email-1" 
                                value={formData['email-1']} 
                                onChange={handleChange} 
                                required 
                                />
                            </div>

                            <div>
                                <textarea 
                                placeholder="رسالتك"
                                name="textarea-1" 
                                rows={6}
                                value={formData['textarea-1']} 
                                onChange={handleChange} 
                                required 
                                />
                            </div>

                            <div>
                                <button type="submit" disabled={status.loading} className="gradient-btn">
                                    {status.loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                                </button>
                            </div>

                            {status.success && <p className="text-green-600">تم الإرسال بنجاح!</p>}
                            {status.error && <p className="text-red-600">{status.error}</p>}
                        </form>

                    </div>
                    <div className="flex flex-1 gradient-bg bg-[var(--second-bg-color)] flex-col gap-8 p-6 md:p-8 rounded-4xl">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="max-w-[50%]">
                                <img src={`${themeUrl}/assets/home/contact/contact-icon.png`} alt="" width="200" height="200" decoding="async" loading="lazy"/>
                            </div>
                            <div className="text-center md:px-8 space-y-2">
                                <h4 className="text-2xl font-semibold">فريقنا بانتظارك</h4>
                                <span className="text-[#9997AC]">نجيب على استفساراتك ونساعدك في اختيار الأنسب لمشروعك.</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {
                                contactDetails.map((item)=>(
                                    <div key={item.id} className="flex items-center gap-2 bg-linear-to-br from-[#FFFFFF0F] via-[#FFFFFF04] to-[#FFFFFF0A] border border-[#FFFFFF17] rounded-4xl py-2 px-3">
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
