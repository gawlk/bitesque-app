// @refresh reload
import { Suspense } from 'solid-js'
// https://www.solidjs.com/
// https://start.solidjs.com/
// https://www.solidjs.com/blog/introducing-solidstart
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'

import './styles/main.css'

export default () => {
  return (
    <Html lang="en">
      <Head>
        <Title>bitesque</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body class="bg-black text-white antialiased selection:bg-orange-800 selection:text-white">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>

        <Scripts />
      </Body>
    </Html>
  )
}
