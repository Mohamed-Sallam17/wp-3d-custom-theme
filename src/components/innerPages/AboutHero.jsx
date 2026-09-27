import { aboutHero } from "../../data/aboutHero"
import Button from "../common/Button";

function AboutHero({page}) {
const currentData = aboutHero[page];
  return (
    <div className="container">
        <div className="flex justify-center items-center flex-col gap-8 text-center">

            <div className="content md:max-w-[50%] space-y-8 px-4">
                <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                    <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">{currentData.title?.normal}</span>
                    <span className="gradient-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">{currentData.title?.highlighted}</span>
                </h1>
                <p className="text-[var(--description-color)] lg:text-xl leading-normal">{currentData?.description}</p>
            </div>

            <Button/>

        </div>
    </div>
  )
}

export default AboutHero
