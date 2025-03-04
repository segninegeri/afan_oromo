import type React from "react"
import type { Metadata } from "next/types"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Afan Oromo Learning | For Children",
  description: "Interactive platform for children to learn Afan Oromo language",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}

