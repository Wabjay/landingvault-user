import Image from 'next/image'
import Link from 'next/link'
import { createSlug } from './slug'
import { Page } from '../../types'

const PageCard = ({ page }: { page: Page }) => {
  // Ensure the page and its properties exist before using them
  const { brandName, pageCoverImage, componentType } = page;

  // Provide fallback images or content
  const imageUrl = pageCoverImage || '/path/to/default-image.jpg';  // Default image if no cover image is provided
  const slug = createSlug(brandName || 'default'); // Fallback to a default slug if no brandName
  const tag = createSlug(componentType[0] || 'tag'); // Fallback to a default slug if no brandName
  const components = "landing-page"


  return (
    <div className="w-full max-w-[264px] flex h-[auto] hover:bg-gray-50 text-16 font-medium focus:outline-none mb-6">
      <Link href={`/${components}/${tag}/${slug}`} className="flex flex-col text-left gap-y-2 tablet:max-w-[528px]">
        {/* Image section with fallback */}
        <Image
          src={imageUrl}
          alt={brandName ? `${brandName} logo` : 'No image available for this brand'}
          width={264}
          height={278}
          className="w-[264px] h-[278px] object-cover" // Ensure image covers the space properly
        />
        <div className="p-2">
          <p className="font-semibold w-full max-w-[255px] text-16 text-[#2E2E27] mb-1">
            {brandName || 'Unnamed Brand'}
          </p>
          <p className="text-16 text-[#64645F] font-normal underline">
            {brandName || 'No Brand Name'}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default PageCard
