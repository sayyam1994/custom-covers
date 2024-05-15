import Image from 'next/image'
import MaxWidthWrapper from '@/components/maxWidthWrapper'

export default function Home() {
  return (
    <div className="bg-slate-50 ">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pt-24 lg:pb-52 sm:pb-32 xl:gap-x-8 xl:pt-32">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" className="w-full" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{' '}
                <span className="bg-purple-600 px-2 text-white">Custom</span>{' '}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                {' '}
                Transform your phone with a{' '}
                <span className="font-semibold">
                  unique, one-of-a-kind
                </span>{' '}
                from CustomCovers. Protect your phone and your memories with a
                custom-made case that reflects your style. Elevate your phone
                case game and say goodbye to generic, mass-produced designs. At
                CustomCovers, we believe in protecting your phone and your
                precious memories.{' '}
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2"></div>
              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
