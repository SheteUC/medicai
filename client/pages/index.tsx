import Image from 'next/image'
import { Inter } from 'next/font/google'
import { UserButton } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl='/'>

      </UserButton>
    </div>
  )
}
