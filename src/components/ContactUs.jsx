// import React, { useEffect } from "react";

// function ContactUs({ formId, formHtml }) {
//   useEffect(() => {
//     // التأكد من وجود سكريبت Forminator بعد رندر الـ HTML وإعادة تفعيله
//     if (formHtml) {
//       setTimeout(() => {
//         // Forminator بيوفر Global Object لتشغيل الفورم ديناميكياً
//         if (window.ForminatorFront && window.ForminatorFront.init) {
//           window.ForminatorFront.init();
//         } else if (window.jQuery) {
//           // إعادة ربط أحداث Forminator عبر jQuery لو متاح
//           window.jQuery(document).trigger("forminator:form:loaded");
//         }
//       }, 100);
//     }
//   }, [formHtml]);

//   return (
//     <section className="contact-us-section py-16 text-white">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <div className="block__title text-center mb-10">
//           <h2 className="text-3xl lg:text-5xl font-bold flex items-center justify-center gap-2">
//             تواصل معنا <span className="text-purple-400">✦</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
//           {/* الكارت الأيسر: معلومات التواصل */}
//           <div className="lg:col-span-5 p-8 bg-[var(--second-bg-color)] border border-white/10 rounded-3xl flex flex-col items-center text-center justify-between">
//             <div className="w-full flex flex-col items-center">
//               <div className="w-24 h-24 mb-6 border-2 border-purple-500/30 rounded-2xl flex items-center justify-center bg-purple-500/10">
//                 <span className="text-4xl">🎧</span>
//               </div>
//               <h3 className="text-2xl font-bold mb-2">فريقنا بانتظارك</h3>
//               <p className="text-gray-400 text-sm max-w-xs mb-8">
//                 نجيب على استفساراتك ونساعدك في اختيار الأنسب لمشروعك.
//               </p>
//             </div>

//             <div className="w-full space-y-3 text-sm">
//               <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
//                 <span className="text-gray-300">hello@wameed.sa</span>
//                 <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">✉️</span>
//               </div>
//               <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
//                 <span className="text-gray-300" dir="ltr">+966 50 000 0000</span>
//                 <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">📞</span>
//               </div>
//               <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
//                 <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
//                 <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">📍</span>
//               </div>
//             </div>
//           </div>

//           {/* الكارت الأيمن: فورمة Forminator */}
//           <div className="lg:col-span-7 p-8 bg-[var(--second-bg-color)] border border-white/10 rounded-3xl flex flex-col justify-between">
//             <div>
//               <h3 className="text-2xl font-bold mb-2">أخبرنا عن مشروعك</h3>
//               <p className="text-gray-400 text-sm mb-6">
//                 املأ البيانات وسيوصلك رد من فريقنا خلال يوم عمل واحد.
//               </p>

//               <div
//                 className="forminator-custom-wrapper"
//                 dangerouslySetInnerHTML={{ __html: formHtml || "" }}
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default ContactUs;