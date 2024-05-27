/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import { CaseColour } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import { cn } from '@/lib/utils'

const PhonePreview = ({
  croppedImageUrl,
  colour
}: {
  croppedImageUrl: string
  colour: CaseColour
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0
  })

  const handleResize = () => {
    const { height, width } = ref.current!.getBoundingClientRect()
    setRenderedDimensions({ height, width })
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  let caseBackgroundColour = 'bg-zinc-950'
  if (colour === 'blue') caseBackgroundColour = 'bg-blue-950'
  if (colour === 'rose') caseBackgroundColour = 'bg-rose-950'

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
            caseBackgroundColour
          )}
          src={croppedImageUrl}
        />
      </div>

      <div className="relative h-full w-full z-40">
        <img
          alt="phone"
          src="/clearphone.png"
          className="pointer-eveents-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  )
}

export default PhonePreview
