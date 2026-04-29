import { Inter, Barlow, DM_Sans, Open_Sans, Archivo } from "next/font/google"

const inter    = Inter({    subsets: ["latin"], variable: "--font-inter",    display: "swap" })
const barlow   = Barlow({   subsets: ["latin"], variable: "--font-barlow",   display: "swap", weight: ["300","400","500","600","700"] })
const dmSans   = DM_Sans({  subsets: ["latin"], variable: "--font-dm-sans",  display: "swap" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" })
const archivo  = Archivo({  subsets: ["latin"], variable: "--font-archivo",  display: "swap" })

export default function DroneirosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${barlow.variable} ${dmSans.variable} ${openSans.variable} ${archivo.variable}`}
      style={{ backgroundColor: "#121212" }}
    >
      {children}
    </div>
  )
}
