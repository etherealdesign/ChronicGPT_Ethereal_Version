import React, { useRef } from 'react'
import Header from '../common/Header/header';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import JoinCohort from '../common/JoinCohort/JoinCohort';
import ResponsiveSection from '../common/ResponsiveSection';
import { cn, isIOS } from '../../helpers/utils';
import { MAX_WIDTH } from '../constants/css-classes';
import Footer from '../common/Footer/footer';

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function Safeguards() {
  const container = useRef();

  let scrollTrigger = null
  let normInstance;
  ScrollTrigger.normalizeScroll(false)
  gsap.defaults({
    ease: "none"
  })
  useGSAP(() => {

    const SPEED = 1;

    const DUR = {
      HEADER_HIDE: 0.5 * SPEED,
      CARDS: 2 * SPEED,
      SECOND_SECTION: 2 * SPEED,
      THIRD_SECTION: 2 * SPEED,
      BUILD_FADE: 2 * SPEED,
      HEADER_BG: 2 * SPEED,
      BETWEEN_DELAY: 2 * SPEED,
      JOIN_SECTION_DESKTOP: 2 * SPEED,
      JOIN_SECTION_MOBILE: 2 * SPEED,
    };

    const LAYOUT = {
      MOBILE_GAP: 24,
      DESKTOP_MARGIN_TOP: 0,
    };

    // ==========================

    const t1 = gsap.timeline();
    const mm = gsap.matchMedia();
    const cards = gsap.utils.toArray(".card");

    mm.add("(min-width: 1024px)", () => {
      const BASE_SCALES = [];
      const AUTO_ALPHAE = [];

      cards.forEach((card, i) => {
        const scale = 0.85 + (i / 8);
        const autoAlpha = 1 - (i / 4);
        BASE_SCALES[i] = scale;
        AUTO_ALPHAE[i] = autoAlpha;
        gsap.set(card, {
          scale,
          autoAlpha,
          marginTop: (i + 1) * LAYOUT.DESKTOP_MARGIN_TOP
        });
      });

      t1.addLabel("cardsAnimation");

      cards.slice(1).forEach((card, i) => {
        const labelName = `card-anim-${i}`;
        t1.addLabel(labelName, `>+=${DUR.BETWEEN_DELAY}`);

        if (i === 0) {
          t1.to(".safeguards-header", {
            height: 0,
            autoAlpha: 0,
            duration: DUR.HEADER_HIDE
          }, labelName);
        }

        t1.to(cards, {
          yPercent: -100 * (i + 1),
          ease: "none",
          scale: index => (index <= i ? 0.85 : BASE_SCALES[index - (i + 1)]),
          autoAlpha: 1,
          duration: DUR.CARDS
        }, labelName);
      });
    });

    mm.add("(max-width: 1023px)", () => {
      t1.addLabel("cardsAnimationMobile", `>+=${DUR.BETWEEN_DELAY}`);

      cards.forEach(card => {
        gsap.set(card, { scale: 1, autoAlpha: 1 });
      });

      cards.slice(1).forEach((card, i) => {
        const labelName = `card-anim-mobile-${i}`;
        t1.addLabel(labelName,);

        if (i === 0) {
          t1.to(".safeguards-header", {
            height: 0,
            autoAlpha: 0,
            duration: DUR.HEADER_HIDE
          }, labelName);
        }

        t1.to(
          cards,
          {
            yPercent: -100 * (i + 1),
            y: `-=${LAYOUT.MOBILE_GAP * i}`,
            ease: "none",
            duration: DUR.CARDS
          },
          labelName
        );
      });
    });


    // ==========================
    // SECTION TRANSITIONS
    // ==========================

    t1.addLabel("secondAnim", `>+=${DUR.BETWEEN_DELAY}`);

    t1.to(".second-inner-content", {
      height: 0,
      autoAlpha: 0,
      duration: DUR.SECOND_SECTION,

    }, "secondAnim");

    mm.add("(min-width: 1024px)", () => {
      t1.to(".section-two", {
        height: "20lvh",
        duration: DUR.SECOND_SECTION,
      }, "secondAnim");
    })

    mm.add("(max-width: 1023px)", () => {
      t1.to(".section-two", {
        height: "calc(10lvh - 16px)",
        duration: DUR.SECOND_SECTION,
      }, "secondAnim");

    })


    t1.addLabel("thirdAnim", `>+=${DUR.BETWEEN_DELAY}`);

    t1.to(".section-two", {
      height: 0,
      autoAlpha: 0,
      duration: DUR.THIRD_SECTION,

    }, "thirdAnim")

    t1.to(".build-for-trust", {
      height: "100lvh",
      duration: DUR.THIRD_SECTION,
    }, "thirdAnim");


    t1.addLabel("inBetweenAnim", `>+=${DUR.BETWEEN_DELAY}`);

    t1.to(".build-for-trust", {
      height: 0,
      autoAlpha: 0,
      padding:0,
      border:0,
      duration: DUR.BUILD_FADE,
    }, "inBetweenAnim");

    t1.fromTo(".header",
      {
        background:
          "linear-gradient(to bottom, rgba(18,18,18,1), rgba(18,18,18,0.7), transparent)"
      },
      {
        background: "#121212",
        duration: DUR.HEADER_BG,
        delay: 0.2,
        ease: "none",
      },
      "inBetweenAnim"
    );

    t1.addLabel("fifthAnim", `>+=${DUR.BETWEEN_DELAY}`);

    mm.add("(min-width: 1024px)", () => {
      t1.to(".join-cohort", {
        height: "85lvh",
        duration: DUR.JOIN_SECTION_DESKTOP,
        ease: "none",
      }, "fifthAnim");
    });

    mm.add("(max-width: 1023px)", () => {
      t1.to(".join-cohort", {
        autoAlpha: 1,
        height: "70lvh",
        duration: DUR.JOIN_SECTION_MOBILE,
        ease: "none",
      }, "fifthAnim");
    });

    // ==========================
    // SCROLLTRIGGER NORMALIZE
    // ==========================

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    let isOn = false;
    let normInstance = null;

    scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: 2,
      // markers: true,
      animation: t1,
      pinSpacing: false,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const atBottom = self.progress >= 0.999;

        if (atBottom && !isOn && ScrollTrigger.isTouch) {
          isOn = true;
          normInstance = ScrollTrigger.normalizeScroll({
            allowNestedScroll: true,
            lockAxis: false,
          });
        }

        if (!atBottom && isOn) {
          isOn = false;
          ScrollTrigger.normalizeScroll(false);
          normInstance?.kill();
          normInstance = null;
        }
      }
    });
  }, { scope: container.current });


  return (
    <div className={cn('mx-auto', MAX_WIDTH)} ref={container}>
      <Header />
      <HeaderBackground>
        <Third />
      </HeaderBackground>
      <BuildForTrust />
      <JoinCohort />
      <Footer />
    </div>
  )
}

export const HeaderBackground = ({ children }) => {
  return <div className='z-[2] section-two relative h-lvh overflow-hidden flex flex-col'>
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

const Third = () => {
  return <ResponsiveSection className='bg-white lg:bg-[#F1F1F1] z-[1] flex-1 relative third-section text-[#121212] overflow-hidden' >

    <div className='flex flex-col gap-[20px] 3xl:gap-[40px]'>
      <div className='safeguards-header flex-1 flex flex-col gap-[20px]'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
          <div className='flex-1 text-[32px] lg:text-[40px] font-semibold '>
            Safeguards you deserve
          </div>
          <div className='flex-1 font-medium text-[16px]'>
            Your AI Doctor is designed with multiple layers of protection to ensure your safety, privacy, and the highest standard of care.
          </div>
        </div>
      </div>
      <div className='relative z-[1] flex flex-col gap-[40px] lg:gap-0'>
        <Card title="Your data stays yours" logo="/assets/images/safeguards/card-1-icon.png" img="/assets/images/safeguards/card-1.jpg">
          Your health data is encrypted, never sold, and never shared without your permission. You decide what ChronicGPT Inc. can access and what it cannot.
        </Card>
        <Card title="Built for safety first" logo="/assets/images/safeguards/card-2-icon.png" img="/assets/images/safeguards/card-2.jpg">
          AI Doctor is designed to avoid harmful or risky recommendations. Anything uncertain, unusual, or outside its scope immediately triggers clinician review.
        </Card>
        <Card title="Transparent and in your control" logo="/assets/images/safeguards/card-3-icon.png" img="/assets/images/safeguards/card-3.jpg">
          You can see what the AI Doctor sees, why it makes a recommendation, and who else can access your data. No black boxes, no hidden decisions.
        </Card>
        <Card title="AI Doctor is medically validated" logo="/assets/images/safeguards/card-4-icon.png" img="/assets/images/safeguards/card-4.png">
          Every AI Doctor is continuously reviewed by licensed physicians. It follows clinical guidelines, double-checks itself, and escalates to a human doctor whenever needed.
        </Card>
        <Card title="Fully compliant with US healthcare laws" logo="/assets/images/safeguards/card-5-icon.png" img="/assets/images/safeguards/card-5.jpg">
          ChronicGPT Inc complies with HIPAA, tele-health regulations, and all relevant AI-in-health safeguards. You are using a medically governed product, not a hobby experiment.
        </Card>
        <Card title="Human doctors stand behind every action" logo="/assets/images/safeguards/card-6-icon.png" img="/assets/images/safeguards/card-6.jpg">
          AI Doctor is never alone. It works alongside real physicians who monitor safety, review complex situations, and support your care whenever needed.
        </Card>
      </div>
    </div>
  </ResponsiveSection >
}

const Card = ({ title, logo, img, children }) => (
  <div className='card bg-[#F1F1F1] h-[460px] md:h-auto lg:bg-white shadow-[0px_10px_20px_0px_#0000000A] rounded-[28px] lg:rounded-[40px] p-[24px] border border-[1px] border-[#B0B0B0] flex flex-col-reverse lg:flex-row gap-[20px] lg:gap-[60px]'>
    <div className='flex-1 flex flex-col lg:justify-between gap-[6px]'>
      <div className='flex items-center gap-[8px] lg:gap-[20px]'>
        <img src={logo} alt="" className='w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]' />
        <div className='text-[20px] lg:text-[28px] font-bold lg:font-medium'>
          {title}
        </div>
      </div>
      <div className='text-[16px] pt-1 lg:text-[20px] lg:pt-0 '>
        {children}
      </div>
    </div>
    <div className='flex-1'>
      <div className='h-[200px] lg:h-[300px] xl:h-[320px] rounded-[24px] overflow-hidden'>
        <img src={img} className='w-full h-full object-cover rounded-[24px]' />
      </div>
    </div>
  </div>
)

const BuildForTrust = () => (
  <div className='build-for-trust h-[90lvh] bg-transparent rounded-[30px] lg:rounded-[54px] overflow-hidden flex flex-col border border-[5px] border-white '>
    <div className="relative h-[310px] sm:h-[260px] lg:h-[420px] rounded-[24px] lg:rounded-[52px] overflow-hidden [@media(width:768px)_and_(height:1024px)]:h-[900px] [@media(width:1920px)_and_(height:1080px)]:h-[600px] [@media(width:2560px)_and_(height:1440px)]:h-[900px]">

      {/* Mobile image */}
      <img
        src="assets/images/sub-banner.png"
        alt=""
        className="w-full h-full object-cover object-center rounded-[24px] lg:rounded-[52px] block sm:hidden "
      />

      {/* Tablet & Desktop image */}
      <img
        src="/assets/images/safeguards/safeguards-bg-v2.png"
        alt=""
        className="w-full h-full object-cover object-center rounded-[24px] lg:rounded-[52px] hidden sm:block"
      />

    </div>

    <div className='flex-1 flex flex-col lg:justify-center gap-[14px] sm:gap-[24px] sm:text-center px-[10px] py-[18px] sm:py-[24px] lg:p-[24px]sm:pb-[32px] @media(width:768px)_and_(height:1024px)]:mt-[90px]'>
      <div className='text-[34px] lg:text-[36px] w-[92%] mx-auto sm:w-[100%] font-semibold max-[380px]:text-[24px]'>Built for Trust</div>
      <div className='text-[16px] flex flex-col gap-[8px] w-[92%] mx-auto sm:w-[100%]'>
        <div className='font-medium max-[380px]:text-[13px] text-[15px] leading-[20px] lg:text-[16px] lg:leading-normal xl:leading-[35px] 2xl:leading-[40px] [@media(width:768px)_and_(height:1024px)]:leading-[40px] @media(width:768px)_and_(height:1024px)]:w-[80%] m-auto sm:w-[96%] mx-auto '>
          We know you can only trust a system that is medically sound, transparent, and accountable. ChronicGPT is built so that your AI Doctor never acts alone. Your human doctor sets your health goals, licensed physicians oversee your progress, and every recommendation your AI Doctor makes is traceable, explainable, and grounded in real clinical reasoning. You are always informed, always in control, and never navigating your health alone.
        </div>
        <div className='font-bold pt-[8px] lg:pt-0 max-[380px]:text-[14px]'>
          How we keep you safe:
        </div>
        <div className='font-medium max-[380px]:text-[13px] text-[15px] leading-[20px] lg:text-[16px] lg:leading-normal [@media(width:768px)_and_(height:1024px)]:leading-[40px] [@media(width:768px)_and_(height:1024px)]:w-[80%] m-auto xl:leading-[40px] 2xl:leading-[40px]'>
          <div><span className='font-semibold'> Clinical Oversight: </span> Physicians review your clinical trace and intervene whenever needed.</div>
          <div><span className='font-semibold'> Transparent Decisions: </span> You always see why your AI Doctor recommended something — no black boxes.</div>
          <div><span className='font-semibold'> Your Data Stays Yours: </span> Fully encrypted, never sold, never shared for ads, and always under your control.</div>
        </div>
      </div>
    </div>

  </div>
)

export default Safeguards