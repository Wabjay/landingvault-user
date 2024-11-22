"use client"
import { useState, useEffect } from 'react'
import searchIcon from '/public/search.svg'
import Image from 'next/image'
import { store } from '@/store'

export default function Search() {
  const [search, setSearch] = useState('')
  const [typing, setTyping] = useState(false)
  const { fetchAllPages, loadedPages, fetchPages } = store()

  useEffect(() => {
    fetchAllPages()
  }, [fetchAllPages])

  useEffect(() => {
    const wordsArray = search?.split(/\s+/)
    const sortPagesByTagOrSearch = () => {
      if (!search) {
        return loadedPages.data
      }

      // Filter the original array to get objects containing the keyword
      if (search) {
        const newArray = loadedPages.data.filter(page =>
          wordsArray.some(
            word =>
              page.brandName.toLowerCase().includes(word) ||
              page.brandDescription.includes(word)
          )
        )
        return newArray
      }
      return loadedPages.data
    }

    fetchPages(sortPagesByTagOrSearch())
    console.log(sortPagesByTagOrSearch())
  }, [fetchPages, loadedPages.data, search])

  // Handle focus/typing state
  const handleFocus = () => {
    setTyping(true)
  }

  const handleBlur = () => {
    setTyping(false)
  }

  return (
    <div
      className={`flex gap-2 p-2 bg-white w-[80%] rounded-lg max-w-[600px] border ${
        typing
          ? 'border-blue-400 shadow-buttonFocus bg-white hover:bg-white'
          : 'border-grey-50 hover:bg-grey-10 hover:border-grey-50'
      }`}
      onMouseLeave={handleBlur} // Set typing to false on mouseout
    >
      <Image src={searchIcon} alt="search icon" width="24px" height="24px" />
      <input
        type="text"
        placeholder="Search for a pagedeck"
        value={search}
        onFocus={handleFocus} // Set typing to true on focus
        onBlur={handleBlur} // Set typing to false on blur
        onChange={e => setSearch(e.target.value)}
        className="outline-none w-full"
      />
    </div>
  )
}
