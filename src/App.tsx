import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { LanguageProvider } from '@/hooks/useLanguage'

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </LanguageProvider>
  )
}

export default App
