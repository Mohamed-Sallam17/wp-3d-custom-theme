function Button({ 
  primaryText = "ابدأ مشروعك بوميض", 
  primaryHref = "/", 
  secondaryText = "اكتشف خدماتنا", 
  secondaryHref = "/services" 
}) {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
      <a href={secondaryHref} className="dark-btn w-full md:w-auto">
        {secondaryText}
      </a>
      <a href={primaryHref} className="gradient-btn w-full md:w-auto">
        {primaryText}
      </a>
    </div>
  );
}

export default Button;