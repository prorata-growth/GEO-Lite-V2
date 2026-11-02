import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Design-system globals (tokens, typography, fonts, every component's CSS
// module) come first so this project's own index.css still wins on ties —
// its `body` rule keeps the v1 screens' background rather than adopting
// the DS page token.
import 'design-system/dist-lib/design-system.css'
import './ds-pins.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
