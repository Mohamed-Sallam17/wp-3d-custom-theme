import { SITE_CONFIG } from "../utils/siteConfig";
import Button from "./common/Button";


const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="gradient-text text-9xl font-extrabold text-transparent  mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-3 text-white">
        عذراً، الصفحة التي تبحث عنها غير موجودة!
      </h2>
      
      <p className="text-gray-400 max-w-md mb-8">
        ربما تم نقل الصفحة، أو حذفها، أو أن الرابط الذي استخدمته غير صحيح.
      </p>

      <Button 
        primaryText="العودة للرئيسية" 
        primaryHref="/" 
        secondaryText="اكتشف خدماتنا" 
        secondaryHref={`/${SITE_CONFIG.servicesSlug}`} 
        target="_self"
        />

    </section>
  );
};

export default NotFound;