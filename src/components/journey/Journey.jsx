import React, { useRef } from 'react'
import Header from '../common/Header/header';
import Footer from '../common/Footer/footer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import JoinCohort from '../common/JoinCohort/JoinCohort';
import { HeaderBackground } from '../safeguards/Safeguards';
import { cn, isIOS } from '../../helpers/utils';
import HoverCards from '../common/Framer/HoverCards';
import ResponsiveSection from '../common/ResponsiveSection';
import { MAX_WIDTH } from '../constants/css-classes';

gsap.registerPlugin(useGSAP)

const CARD_DATA = [
  {
    position: "01",
    title: "Your MD sets your clinical goals.",
    // logo: "/assets/images/safeguards/card-1-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-1.png",
    text: `After sign-up, your own physician (or one you choose on the platform) reviews your labs, medications, history, and current biomarkers.
           They set measurable 3–6 month goals — for HbA1c, weight, LDL, blood pressure, sleep, and more.
           These goals become the medical blueprint for your AI Doctor.`
  },
  {
    position: "02",
    title: "You create your own AI Doctor.",
    // logo: "/assets/images/safeguards/card-2-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-2.png",
    text: `You choose how you want to interact: text, voice notes, or a human-like video avatar.
           Pick your language, tone, and frequency of check-ins.
           Your AI Doctor learns your communication style and is available 24/7.`
  },
  {
    position: "03",
    title: "Your devices connect and your data flows in automatically.",
    // logo: "/assets/images/safeguards/card-3-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-3.png",
    text: `We provide essential wearables for free (sleep/activity tracker, CGM for diabetes, BP cuff for hypertension) or integrate your existing devices.
           Your glucose, sleep, activity, heart rate, medications, and meals stream in continuously.
           Your AI Doctor now has your real-world health signals.`
  },
  {
    position: "04",
    title: "Your AI Doctor builds a digital model of your body.",
    // logo: "/assets/images/safeguards/card-4-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-4.jpg",
    text: `It studies how you respond to food, stress, sleep, activity, and medications — minute by minute.
           It translates your doctor’s goals into daily targets for sleep, nutrition, activity, and medication.
           This creates your personalized baseline and learning model.`
  },
  {
    position: "05",
    title: "You receive daily individualized guidance.",
    // logo: "/assets/images/safeguards/card-5-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-5.jpg",
    text: `Your AI Doctor watches your body in real time and sends timely, specific micro-interventions:
           what to adjust, when to rest, how to pace meals, when to hydrate, or when to move.
           You also have twice-weekly check-ins that replace the dashboard clutter you’re used to.`
  },
  {
    position: "06",
    title: "A clinician supervises everything and steps in when needed.",
    // logo: "/assets/images/safeguards/card-6-icon.png",
    img: "/assets/images/journey/horizontal-cards/card-6.png",
    text: `Physicians review your progress, validate recommendations, adjust your plan, and handle escalations.
           If your AI Doctor detects a red flag or predicts risk, it arranges a telehealth visit or alerts your MD immediately.
           When it’s time for a routine appointment, your AI Doctor sends your progress summary to your physician.`
  }
];


function Journey() {
  const container = useRef();
  // ================== DURATIONS ==================
  // Common
  const HEADER_HIDE_DURATION = 2
  const FLEX_GAP_DURATION = 1.5
  const HEADER_FADE_DURATION = 1.2

  // Desktop-specific
  const CARD2_DESKTOP_DURATION = 1.25
  const SECTION_COLLAPSE_DESKTOP_DURATION = 2
  const JOIN_COHORT_DESKTOP_DURATION = 1.5
  const DESKTOP_CARD_SCROLL_DELAY = 0

  // Mobile-specific
  const CARD_SCROLL_MOBILE_DURATION = 4
  const SECTION_COLLAPSE_MOBILE_DURATION = 4
  const JOIN_COHORT_MOBILE_DURATION = 2.5
  const MOBILE_CARD_SCROLL_DELAY = 0.4
  const JOIN_COHORT_MOBILE_DELAY = 2.5

  let scrollTrigger = null
  let normInstance;
  ScrollTrigger.normalizeScroll(false)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia();

    const t1 = gsap.timeline()
    const cards = gsap.utils.toArray(".card");
    const cards2 = gsap.utils.toArray(".card-2");

    // ------------------ MOBILE ------------------
    mm.add("(max-width: 1023px)", () => {
      let offset = -20;
      const gap = 40;
      const lastIndex = cards.length - 1;

      cards.forEach((card, i) => {
        const label = `card-anim-${i}`;
        t1.addLabel(label,);

        if (i === 0) {
          t1.to(".section-two-header",
            { height: 0, autoAlpha: 0, duration: HEADER_HIDE_DURATION, ease: "none", },
            label
          );
          t1.to(".section-two-child",
            { paddingTop: 0, duration: FLEX_GAP_DURATION, ease: "none", },
            label
          );
          t1.to(".section-two-child .flex-container",
            { gap: 0, duration: FLEX_GAP_DURATION, ease: "none", },
            label
          );
        }

        t1.to(".card",
          { y: -offset, ease: "none", duration: CARD_SCROLL_MOBILE_DURATION, },
          label
        );

        const cardHeight = card.offsetHeight || card.getBoundingClientRect().height;
        console.log("cardHeight1",cardHeight)
        offset += cardHeight + gap;
      });


      t1.addLabel("inBetweenAnim", ">+=0.5")

      t1.fromTo(".header",
        { background: "#12121200", duration: 0.15, ease: "none", delay: MOBILE_CARD_SCROLL_DELAY },
        { background: "#121212", duration: 0.15, ease: "none", delay: MOBILE_CARD_SCROLL_DELAY },
        "inBetweenAnim"
      );


      t1.to(".section-two", {
        height: 0,
        overflow: "hidden",
        autoAlpha: 0.1,
        duration: SECTION_COLLAPSE_MOBILE_DURATION,
        padding: 0,
        border: 0,
        ease: "none",
        delay: MOBILE_CARD_SCROLL_DELAY
      }, "inBetweenAnim");

      t1.to(".section-three", {
        marginTop: 64,
        duration: SECTION_COLLAPSE_MOBILE_DURATION / 3,
        delay: SECTION_COLLAPSE_MOBILE_DURATION - 1
      }, "inBetweenAnim")

      let offset2 = 0;
      let gap2 = 80

      cards2.forEach((card, i) => {
        const labelName = `card2-mobile-${i}`;
        t1.addLabel(labelName, );

        if (i === 0) {
          t1.to(".section-three-child .flex-container", {
            gap: 0,
            duration: HEADER_HIDE_DURATION
          }, labelName)
          t1.to(".section-three-header",
            { height: 0, padding: 0, margin: 0, autoAlpha: 0, duration: HEADER_HIDE_DURATION, ease: "none", delay: MOBILE_CARD_SCROLL_DELAY },
            labelName
          );
        }


        t1.to(".card-2",
          { y: -offset2, ease: "none", duration: CARD_SCROLL_MOBILE_DURATION, delay: i == 0 ? 4 : 0 },
          labelName
        );

        const cardHeight = card.offsetHeight || card.getBoundingClientRect().height;
        console.log("cardHeight2",cardHeight)
        offset2 += cardHeight + gap2;
      });
      t1.addLabel("inBetweenAnim2", ">+=0.5")

      t1.to(".section-three", {
        height: 0,
        overflow: "hidden",
        autoAlpha: 0.1,
        duration: SECTION_COLLAPSE_MOBILE_DURATION,
        padding: 0,
        border: 0,
        margin: 0,
        ease: "none",
        delay: MOBILE_CARD_SCROLL_DELAY

      }, "inBetweenAnim2");

      // t1.addLabel("fifthAnim", ">")
      // t1.to(".join-cohort",
      //   { y: "-226", autoAlpha: 1, duration: JOIN_COHORT_MOBILE_DURATION, ease: "none" },
      //   "fifthAnim"
      // );
    });

    // ------------------ DESKTOP ------------------
    mm.add("(min-width: 1024px)", () => {
      t1.to(".section-two",
        { height: "10lvh", duration: SECTION_COLLAPSE_DESKTOP_DURATION, autoAlpha: 0, ease: "none", }
      );

      cards2.forEach((card, i) => {
        t1.to(card,
          { y: `-${i * 100}%`, boxShadow: "0px -5px 80px rgba(0,0,0,0.8)", ease: "none", duration: CARD2_DESKTOP_DURATION, }
        );
      });

      t1.addLabel("inBetweenAnim", ">")
      t1.fromTo(".header",
        { background: "linear-gradient(to bottom, rgba(18,18,18,1), rgba(18,18,18,0.7), transparent)", duration: 0.15, ease: "none", },
        { background: "#121212", duration: 0.15, ease: "none", },
        "inBetweenAnim"
      );

      t1.to(".section-two",
        { height: 0, duration: SECTION_COLLAPSE_DESKTOP_DURATION, padding: 0, border: 0, ease: "none", },
        "inBetweenAnim"
      );

      t1.to(".section-three",
        { height: 0, duration: SECTION_COLLAPSE_DESKTOP_DURATION, padding: 0, border: 0, ease: "none", }
      );

      t1.addLabel("thirdAnim")
      t1.to(".section-three-header",
        { autoAlpha: 0.75, duration: HEADER_FADE_DURATION, ease: "none", },
        "thirdAnim"
      );

      t1.to(".section-two",
        { height: 0, autoAlpha: 0, border: 0, padding: 0, duration: 0.2, ease: "none", },
        "thirdAnim"
      );

      // t1.addLabel("fifthAnim", ">");
      // t1.to(".join-cohort",
      //   { y: "-20lvh", autoAlpha: 0.6, duration: JOIN_COHORT_DESKTOP_DURATION, ease: "none", },
      //   "fifthAnim"
      // );
    });

    t1.addLabel("fifthAnim", ">");


    mm.add("(min-width: 1024px)", () => {
      t1.to(".join-cohort", {
        autoAlpha: 1,
        // y: "-20lvh",
        height: "85lvh",
        duration: 0.1,
        ease: "none",
      }, "fifthAnim");
    });

    mm.add("(max-width: 1023px)", () => {
      t1.to(".join-cohort", {
        autoAlpha: 1,
        // y: "-226",
        height: "70lvh",
        duration: 0.1,
        ease: "none",
      }, "fifthAnim");
    });

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    let isOn = false;


    scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: 2,
      animation: t1,
      pinSpacing: false,
      // markers: true,
      invalidateOnRefresh: true,

      onUpdate: self => {
        const atBottom = self.progress >= 0.999;

        if (atBottom && !isOn && ScrollTrigger.isTouch) {
          isOn = true;
          normInstance = ScrollTrigger.normalizeScroll({
            allowNestedScroll: true,
            lockAxis: false,
          });
          console.log("normalizeScroll ON");
        }

        if (!atBottom && isOn) {
          isOn = false;
          ScrollTrigger.normalizeScroll(false)
          normInstance.kill();
          normInstance = null;
          console.log("normalizeScroll OFF");
        }
      }

    });

    ScrollTrigger.refresh();
  }, { scope: container.current })


  return (
    <div className={cn('container mx-auto text-[#121212]', MAX_WIDTH)} ref={container}>
      <Header />
      <HeaderBackground>
        <Second />
      </HeaderBackground>
      <div className='flex flex-col flex-1 section-three h-[calc(100lvh-64px)] lg:mt-0'>
        <SectionThree />
      </div>
      <JoinCohort />
      <Footer />
    </div>
  )
}


const Second = () => {
  return <ResponsiveSection className='flex-1 flex flex-col bg-white z-[1] relative section-two-child text-[#121212] overflow-hidden'>
    <div className='flex-container flex-1 flex flex-col gap-[24px] lg:gap-[10px] 2xl:gap-[10px]'>
      <div className='flex flex-col'>
        <div className='section-two-header flex lg:items-center flex-col lg:flex-row gap-[12px] lg:gap-2'>
          <div className='flex-1 text-[32px] lg:text-[40px] leading-[36px] md:leading-normal font-semibold '>
            Your Journey With ChronicGPT
          </div>
          <div className='text-[16px] leading-[22px] text-[#4A4A4A] flex-1 font-medium'>
            Your AI Doctor combines three essential functions to provide continuous, intelligent care.
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center relative z-[1] flex overflow-x-auto hide-scrollbar">
        <div className='card-container flex flex-col gap-[40px] lg:gap-[58px] lg:hidden'>
          {CARD_DATA.map((card) => (
            <Card
              key={card.position}
              position={card.position}
              title={card.title}
              logo={card.logo}
              img={card.img}
              className="group"
            >
              {card.text}
            </Card>
          ))}
        </div>
        <div className='flex-1 hidden lg:flex lg:flex-col lg:justify-center'>
          <HoverCards cards={CARD_DATA} />

        </div>
      </div>

    </div>
  </ResponsiveSection>
}

const Card = ({ title, logo, img, children, position = "01", className }) => (
  <div className={cn('h-fit overflow-hidden flex flex-col-reverse lg:flex-col card w-full bg-white shadow-[0px_10px_20px_0px_#0000000A] rounded-[30px] lg:rounded-[60px] [@media(max-height:896px)]:px-[16px] [@media(max-height:896px)]:py-[20px] px-[20px] py-[24px] lg:p-[24px] border border-[1px] border-[#B0B0B0] flex [@media(max-height:896px)]:gap-[10px] gap-[24px] lg:gap-[20px]', className)}>
    <div className='flex-1 flex flex-col gap-[16px]'>
      <div className='[@media(max-height:896px)]:h-[160px] h-[288px] lg:h-[204px] rounded-[30px] lg:rounded-[40px] overflow-hidden'>
        <img src={img} className='w-full h-full object-cover rounded-[30px] lg:rounded-[24px]' />
      </div>
      <div className='flex flex-col gap-[8px]'>
        <div className='font-bold [@media(max-height:896px)]:text-[20px] text-[24px] lg:text-[20px] flex flex-col gap-[8px]'>
          <div>{title}</div>
        </div>
        <div className='card-children text-[16px] leading-[24px]'>
          {children}
        </div>
      </div>
    </div>
    <div className='font-roboto flex items-end lg:items-center lg:gap-[8px] [@media(max-height:896px)]:gap-1 [@media(max-height:896px)]:text-[32px] [@media(max-height:896px)]:leading-[36px] text-[50px] leading-[42px] lg:text-[32px] lg:leading-normal'>
      <div>
        {position}
      </div>
      <div className="flex flex-col justify-end [@media(max-height:896px)]:text-[13px] text-[16px] leading-[26px] font-thin text-[#121212] uppercase">//step</div>
    </div>
  </div>
)

const SectionThree = () => (
  <ResponsiveSection className='text-white relative z-[4] section-three-child lg:h-lvh overflow-hidden mx-[10px] flex flex-col gap-[32px] border border-[5px] border-white pt-0'>

    <div className='flex-container flex flex-col gap-[40px] lg:gap-[24px] px-[5px] lg:p-[24px] lg:pt-0'>
      <div className='relative lg:z-[2] pt-[8px] lg:pt-[24px] flex items-center bg-[#121212] section-three-header flex-col lg:flex-row gap-[4px]'>
        <div className='flex-1 text-[32px] lg:text-[30px] xl:text-[36px] leading-[36px] lg:leading-normal font-semibold'>No Surprises. No Fine Print. <br className='hidden lg:inline-block' /> Just the Truth.</div>
        <div className='flex-1 text-[16px] leading-[22px] font-medium'>We believe in complete transparency. Here's exactly what you get with ChronicGPT, what your insurance already covers, and what's optional.</div>
      </div>
      <div className='relative z-[1] flex flex-col gap-[20px] lg:gap-[40px]'>
        <Card2
          title="Included with ChronicAI"
          subtitle="(Everything here is part of the subscription)"
          img="/assets/images/journey/card-1.jpg"
        >
          <li>Your own AI Doctor</li>
          <li>Daily guidance & weekly check-ins</li>
          <li>24/7 messaging & support</li>
          <li>Continuous monitoring of patterns</li>
          <li>Integration with your existing wearables</li>
          <li>Essential starter devices, if needed (sleep/activity tracker, condition-specific sensor)</li>
        </Card2>

        <Card2
          title="Covered by Your Insurance"
          subtitle="(Things your existing doctor or insurance already covers)"
          img="/assets/images/journey/card-2.jpg"
        >
          <li>Routine lab tests</li>
          <li>Imaging and results</li>
          <li>Prescription medications</li>
          <li>In-person doctor visits</li>
          <li>Many telehealth visits with clinicians</li>
        </Card2>

        <Card2
          title="User’s Choice"
          subtitle="(Completely optional add-ons; not required)"
          img="/assets/images/journey/card-3.jpg"
        >
          <li>Additional specialty sensors</li>
          <li>Non-standard lab panels</li>
          <li>Extra or premium services</li>
          <li>Any advanced devices not included in starter kit</li>
        </Card2>
      </div>
    </div>
  </ResponsiveSection>
)

const Card2 = ({ title, subtitle, img, children }) => (
  <div className='max-h-[820px] lg:h-auto card-2 rounded-[30px] lg:rounded-[40px] bg-[#2A2A2A] p-[20px] lg:p-[40px] flex flex-col lg:flex-row gap-[32px]'>
    <div className='flex-1 flex flex-col gap-[20px] lg:gap-[24px]'>
      <div>
        <div className='font-bold lg:font-semibold text-[20px] lg:text-[24px] leading-[30px] lg:leading-[40px]'>{title}</div>
        <div className='text-[16px] leading-[22px] lg:leading-[28px]'>{subtitle}</div>
      </div>
      <div className='flex flex-col gap-[8px] px-[20px] text-[16px] leading-[24px] lg:leading-[28px]'>
        {children}
      </div>
    </div>
    <div className="flex-1 relative h-[246px] lg:h-[328px] lg:min-h-auto rounded-[24px] overflow-hidden">
      <img
        src={img}
        alt=""
        className="w-full h-full object-cover object-center rounded-[16px] lg:rounded-[24px]"
      />
    </div>
  </div>
)
export default Journey