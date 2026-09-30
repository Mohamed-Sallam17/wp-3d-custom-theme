import themeUrl from '../../utils/themeUrl'
import { useEffect, useState } from 'react'

function IntroLoader() {
const [visibel, setVisible] = useState(true)
const [closing, setClosing] = useState(false)


useEffect(() => {
    const closeTimer = setTimeout(() => {
        setClosing(true)
    }, 3000)

    const removeTimer = setTimeout(() => {
        setVisible(false)
    }, 3400)

    return () => {
        clearTimeout(closeTimer)
        clearTimeout(removeTimer)
    }
}, [])

if (!visibel) {
    return null
}

return (
    <div
        className={`
            fixed inset-0 z-99
            flex h-full w-full
            items-center justify-center
            bg-black
            opacity-100
            visible
            transition-[opacity,visibility]
            duration-400
            ease-in-out
            ${closing ? 'opacity-0 invisible pointer-events-none' : ''}
        `}
    >
        <img
            src={`${themeUrl}/assets/logo-intro.gif`}
            alt="logo-intro"
            width={400}
            height={100}
        />
    </div>
)
}

export default IntroLoader
