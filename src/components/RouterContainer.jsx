import React, { useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import App from '../App'
import Safeguards from './safeguards/Safeguards'
import Journey from './journey/Journey'
import { useLenis } from 'lenis/react'
import HeaderFooterLayout from './common/Layout/HeaderFooter'
import FooterLayout from './common/Layout/Footer'
import PrivacyPolicy from './common/Footer/Privacypolicy'
import TermsAndConditions from './common/Footer/TermsAndConditions'
import WaitlistModal from './common/JoinCohort/WaitlistModal'

function RouterContainer() {

  const Wrapper = ({ children }) => {
    const location = useLocation()
    const lenis = useLenis()

    useLayoutEffect(() => {
      if (!lenis) return
      lenis.scrollTo(0, { immediate: true })
    }, [location.pathname, lenis])

    return (
      <>
        {children}
        <WaitlistModal />
      </>
    )
  }

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route>
            <Route index path="/" element={<App />} />
            <Route path="/safeguards" element={<Safeguards />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path='/terms' element={<TermsAndConditions/>}/>
          </Route>
          <Route path="/how-it-works" element={<App />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  )
}

export default RouterContainer
