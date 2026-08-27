import {faqData} from '../data/faq'
import themeUrl from '../utils/themeUrl';
import { useState } from 'react';
import '../../styles/css/main.css'

function Faq() {
    const [openIndex, setOpenIndex] = useState(null)
    const toggleAccordion = (index)=>{
        setOpenIndex(openIndex === index ? null : index)
    }
  return (
    <div className='container'>
      <div className='flex justify-center items-center'>
        <div className='flex flex-3'>
            <div className="faq-accordion w-full flex flex-col gap-9">
                {
                    faqData.map((faq, index)=>{
                        const isOpen = openIndex === index;
                        return(
                            <div className="faq__item bg-[var(--second-bg-color)] p-4 rounded-4xl" key={index} onClick={()=> toggleAccordion(index)}>
                                <div className="faq__title w-full flex justify-between items-center">
                                    <h2 className='font-bold text-2xl'>{faq.question}</h2>
                                    <span className='text-[#8B5CF6] font-bold text-xl'>{isOpen ? '-' : '+'}</span>
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
        <div className='flex flex-2'>
            <div>
                <img src={`${themeUrl}/assets/home/faq.webp`} alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Faq;
