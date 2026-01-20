import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ReactLenis from 'lenis/react';
import RouterContainer from './components/RouterContainer.jsx';
import 'large-small-dynamic-viewport-units-polyfill';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        smooth: true,
        lerp: 0.1,
        smoothTouch: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        touchMultiplier: 2,


      }}>

      <RouterContainer />
    </ReactLenis>
  </StrictMode>
)
