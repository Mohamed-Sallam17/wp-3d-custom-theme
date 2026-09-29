import { SITE_CONFIG } from '../../utils/siteConfig';

function Button({ 
  primaryText = "ابدأ مشروعك بوميض", 
  primaryHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}`, 
  secondaryText = "اكتشف خدماتنا", 
  secondaryHref = `/${SITE_CONFIG.servicesSlug}`,
  target='_blank'
}) {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
      <a href={secondaryHref} className="dark-btn w-full md:w-auto">
        {secondaryText}
      </a>
      <a href={primaryHref} target={target} className="gradient-btn w-full md:w-auto">
        {primaryText}
      </a>
    </div>
  );
}

export default Button;