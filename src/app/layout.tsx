import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import dynamic from 'next/dynamic'

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
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background text-foreground">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="flex min-h-screen flex-col items-center">
              {children}
              <Toaster />
              <ConfirmationDialog />
            </main>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
