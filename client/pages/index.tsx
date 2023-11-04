import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen items-center justify-center p-24 ${inter.className}`}>
      <p className="text-2xl font-semibold">
        Hello, World!
      </p>
    </main>
  );
}