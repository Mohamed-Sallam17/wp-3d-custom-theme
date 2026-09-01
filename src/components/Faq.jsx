import {faqData} from '../data/faq'
import themeUrl from '../utils/themeUrl';
import { useState } from 'react';
import '../../styles/css/main.css'

import faqOpen from '../../assets/faq-open.svg'
import faqClose from '../../assets/faq-close.svg'


function Faq() {
    const [openIndex, setOpenIndex] = useState(null)
    const toggleAccordion = (index)=>{
        setOpenIndex(openIndex === index ? null : index)
    }
  return (
    <div className='container'>
        <div className="block__title text-center mb-8">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">الأسئلة </span>
                <span className="text-3xl lg:text-5xl xl:text-6xl">الشائعة</span>
            </h2>
        </div>
        <div className="flex items-center justify-center">
            <div className='flex justify-center items-center flex-col-reverse md:flex-row sm:max-w-[85%] md:max-w-full'>
                <div className='flex flex-3'>
                    <div className="faq-accordion w-full flex flex-col gap-9">
                        {
                            faqData.map((faq, index)=>{
                                const isOpen = openIndex === index;
                                return(
                                    <div className="faq__item bg-[var(--second-bg-color)] px-6 py-4 rounded-4xl" key={index} onClick={()=> toggleAccordion(index)}>
                                        <div className="faq__title w-full flex justify-between items-center">
                                            <h2 className='font-bold text-base md:text-xl lg:text-2xl'>{faq.question}</h2>
                                            {isOpen ? 
                                            (<img src={faqClose} alt="open faq" />) : 
                                            (<img src={faqOpen} alt="open faq" />)}
                                        </div>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                            <p className='text-[var(--description-color)]'>{faq.answer}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='hidden md:flex flex-2'>
                    <img src={`${themeUrl}/assets/home/faq.webp`} alt="" width={500} height={500} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Faq;
