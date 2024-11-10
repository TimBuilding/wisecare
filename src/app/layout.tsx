import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Toaster = dynamic(
  () => import('@/components/ui/toaster').then((mod) => mod.Toaster),
  {
    ssr: false,
  },
)

const ConfirmationDialog = dynamic(
  () => import('@/components/confirmation-dialog/confirmation-dialog'),
  {
    ssr: false,
  },
)

const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s - WiseCare',
    default: 'WiseCare Employee Portal',
  },
  description: 'WiseCare Employee Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} style={{ colorScheme: 'dark' }}>
      <body className="bg-background text-foreground">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <ReactQueryProvider>
              <div>
                {children}
                <Toaster />
                <ConfirmationDialog />
              </div>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ReactQueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
