import React, { useRef } from "react";
import logo from "../../../../public/assets/images/darklogo.png";
import Header from "../Header/header";
import ResponsiveSection from '../../common/ResponsiveSection';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// import { useNavigate } from "react-router-dom";


gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PrivacyPolicy() {
  const container = useRef();
  // const navigate = useNavigate();

  useGSAP(() => {
    
    // Simple entry animation
    gsap.from(".privacy-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".privacy-content",
        start: "top 80%",
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
          start: "top 85%",
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
      <di
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
      <div className="w-full p-[25px]">

        {/* Header */}
       <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 gap-6 text-center md:text-left">
  
  {/* Left text */}
  <div className="max-w-4xl flex flex-col items-center md:items-start">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121212] mb-2">
      Privacy Policy
    </h1>

    <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center md:text-left">
      This Privacy Policy explains how ChronicGPT Inc., doing business as Sara AI (“Sara AI,” “we,” “us,” or “our”),
      collects, uses, discloses, and protects information when you access or use our website, applications and
      related services available at https://www.chronicgpt.com (collectively, the “Services”).
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
            <h2 className=" mb-1 font-bold">01 - Our Role and Purpose</h2>
            <p>
              Sara AI is a technology platform designed to help individuals organize health data, understand patterns,
              and receive personalized, non-clinical insights related to chronic condition management and wellness.
              Sara AI does not provide medical advice, diagnosis, or treatment. All medical decisions, including prescribing
              or modifying medications, are made solely by licensed physicians engaged by you.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">02 - Eligibility</h2>
            <p>
              The Services are intended only for individuals who are eighteen (18) years of age or older.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">03 - HIPAA-Aligned Data Protection</h2>
            <p>
              Sara AI is not a Covered Entity or Business Associate under HIPAA. However, due to the sensitive nature of
              health-related data, we voluntarily design and operate our systems using administrative, technical, and
              organizational safeguards aligned with HIPAA Security Rule principles.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">04 - Information We Collect</h2>
            <p>
              We may collect account information, health-related data you provide, wearable and device data, manually entered
              information, uploaded personal health records, and technical usage data.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">05 - Use of Information</h2>
            <p>
              We use information to operate and improve the Services, generate non-medical insights, maintain security,
              and communicate with users.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">06 - AI Disclaimer</h2>
            <p>
              AI-generated outputs may contain inaccuracies and are provided for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">07 - Data Sharing</h2>
            <p>
              We do not sell personal data. Information may be shared with service providers, authorized healthcare professionals,
              or as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">08 - Data Security</h2>
            <p>
              We employ industry-standard safeguards, including encryption and access controls, but no system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">09 - Geographic Scope</h2>
            <p>
              The Services are intended for users in the United States and India.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-1">10 - Contact</h2>
            <p>
              ChronicGPT Inc. d/b/a Sara AI <br />
              <a href="https://www.chronicgpt.com" className="underline">
                https://www.chronicgpt.com
              </a>
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
