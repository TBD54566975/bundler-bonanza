import { useEffect } from 'react'
import { testDwn } from '@/app/lib/dwn-sdk-test'

export default function Component() {
  console.log('hi dwn');
  
  useEffect(() => {
    (async () => testDwn())()
  }, [])

  return (
    <>
      <p>Hi Dwn</p>
    </>
  )
}