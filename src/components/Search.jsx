"use client"
import { useState, useEffect } from 'react'
import searchIcon from '/public/search.svg'
import Image from 'next/image'
import { store } from '@/store'




export default function Search() {
  const [search, setSearch] = useState('')
  const {fetchAllPages, loadedPages, fetchPages } = store()


useEffect(() => {
  fetchAllPages()
},[fetchAllPages])


useEffect(() => {
  const wordsArray = search?.split(/\s+/);
  const sortPagesByTagOrSearch = () => {
    if (!search) {
      return loadedPages.data;
    }
   

    // Filter the original array to get objects containing the keyword
    if (search) {
      // return loadedPages.data.filter(page => page.title.toLowerCase().includes(wordsArray) || page.about.includes(wordsArray));
      const newArray = loadedPages.data.filter(page => wordsArray.some(word =>  page.brandName.toLowerCase().includes(word) || page.brandDescription.includes(word) ));
      return newArray
    }
    if (!search) {
      return loadedPages.data;
    }
    if (search) {
      return loadedPages.data.filter(page => page.title.toLowerCase().includes(wordsArray));
    }
    return loadedPages.data;
  }

  fetchPages(sortPagesByTagOrSearch());
console.log(sortPagesByTagOrSearch())

}, [fetchPages, loadedPages.data, search]);




  return (
    <div className='flex gap-2 p-2 bg-white w-[80%] tablet:!w-[50%] max-w-[400px] border-grey-50 rounded-lg hover:border-myGreen-400 border'>
        <Image src={searchIcon} alt="search icon"  width="24px"height='24px'/>
        <input type="text" placeholder='Search for a pagedeck' value={search} onChange={e => setSearch(e.target.value)} className='outline-none w-full' />
    </div>
  )
}
