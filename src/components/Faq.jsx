import {faqData} from '../data/faq'
import themeUrl from '../utils/themeUrl';

import '../../styles/css/main.css'

function Faq() {
    const [isOpen, setIsOpen] = useState()
  return (
    <div className='container'>
      <div className='flex justify-center items-center'>
        <div className='flex flex-3'>
            <div className="faq-accordion flex flex-col gap-9">
                {
                    faqData.map((faq,index)=>(
                        <div className="faq__item bg-[var(--second-bg-color)] p-4 rounded-3xl" key={index}>
                            <div className="faq__title flex justify-between mb-4">
                                <h2>{faq.question}</h2>
                                <span>+</span>
                            </div>
                            <div className="faq__content">
                                <p className='text-[var(--description-color)]'>{faq.answer}</p>
                            </div>
                        </div>
                    ))
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
