import React, { useRef } from "react";
import logo from "../../../../public/assets/images/darklogo.png";
import Header from "../Header/header";
import ResponsiveSection from '../../common/ResponsiveSection';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Footer from "./footer";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TermsAndConditions() {
  const container = useRef();

  useGSAP(() => {
    // Simple entry animation
    gsap.from(".privacy-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".privacy-content",
        start: "top 90%",
      }
    });

    // Animate sections individually
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 100%",
        }
      });
    });

  }, { scope: container });

  return (
    <div ref={container}>
      <Header />
      <HeaderBackground>
        <Content />
      </HeaderBackground>
    </div>
  );
};

const HeaderBackground = ({ children }) => {
  return <div className='z-[2] section-two relative min-h-screen flex flex-col'>
    <div className="hero-img shrink-0 absolute h-[26lvh] w-full overflow-hidden">
      <img
        src="/assets/images/sub-banner.png"
        alt=""
        className="w-full h-full object-cover object-[0%_35%]"
      />
      <div
        className="
          absolute inset-0
          [background:radial-gradient(circle,rgba(18,18,18,0)_30%,#121212_190%)]
        "
      />
      <div
        className="
        pointer-events-none
        absolute inset-0
        bg-[linear-gradient(to_bottom,_transparent_30%,_#121212_100%)]
        translate-y-[10%]
      "
      />
    </div>
    <div className='second-inner-content mt-[calc(10lvh-16px)] lg:mt-[20lvh] flex flex-col flex-1 p-[10px] pt-[0px]'>
      {children}
    </div>
  </div>
}

const Content = () => {
  return <ResponsiveSection className='bg-white lg:bg-[#F1F1F1] z-[1] flex-1 relative third-section text-[#121212]' >
    <div className=" flex justify-center">
      <div className="w-full p-[30px]">

        {/* Header */}
       <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 gap-6 text-center md:text-left">
  
  {/* Left text */}
  <div className="max-w-4xl flex flex-col items-center md:items-start">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121212] mb-2">
      Terms and Conditions
    </h1>

    <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center md:text-left">
     These Terms govern your use of services provided by ChronicGPT Inc., doing business as Sara AI.
    </p>

    <p className="mt-2 text-sm font-[15px] text-black font-bold">
      Effective Date: January 2026
    </p>
  </div>

  {/* Logo */}
  <img
    src={logo}
    alt="Sara AI"
    className="h-8 md:h-10 object-contain shrink-0 order-first md:order-last"
  />

</div>


        {/* Sections */}
        <div className="space-y-8 text-gray-800 text-sm md:text-base leading-relaxed">

          <section>
            <h2 className=" mb-1 font-bold">01 - No Medical Advice</h2>
            <p>
              Sara AI does not provide medical advice or diagnosis. All medical decisions are made by licensed physicians.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">02 - Eligibility</h2>
            <p>
              Users must be at least 18 years old.</p>
          </section>

          <section>
            <h2 className="font-bold mb-1">03 - AI Limitations</h2>
            <p>
             AI outputs may be inaccurate and should not be relied upon for medical decisions.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">04 - Subscriptions</h2>
            <p>
             Subscription billing is under development. No insurance billing is provided.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">05 - Arbitration</h2>
            <p>
             All disputes will be resolved through binding arbitration with a class-action waiver.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">06 - Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Texas.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">07 - Contact</h2>
            <p>
              ChronicGPT Inc. d/b/a Sara AI  <br/>
              https://www.chronicgpt.com
            </p>
          </section>
           <div className="mt-12 flex justify-center">
  <a
    href="/"
    className="
      inline-flex items-center justify-center
      bg-black text-white font-medium rounded-full
      px-[20px] py-[10px]
      sm:px-[28px] sm:py-[12px]
      md:px-[36px] md:py-[14px]
      transition hover:bg-[#222]
    "
  >
    Back to Home
  </a>
</div>
        </div>
      </div>
    </div>
  </ResponsiveSection >
}
