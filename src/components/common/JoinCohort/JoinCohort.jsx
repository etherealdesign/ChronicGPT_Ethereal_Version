import React from 'react'
import Separator from '../Separator'

function JoinCohort() {
    return (
        <div className='bg-[#121212] w-full h-vh rounded-t-[54px] overflow-hidden relative z-[5] join-cohort'>
            <div className='flex flex-col gap-[20px] lg:gap-0 lg:flex-row items-center h-full'>
                <div className='pt-[60px] lg:pt-[100px] flex-1 img-container lg:self-stretch relative overflow-hidden'>
                    <img
                        src="/assets/images/bottom-banner.png"
                        alt=""
                        className='w-full h-full object-cover'
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
                </div>
                <div className='flex-1 px-[20px] pb-[20px] lg:p-[40px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center text-center text-white'>
                        <div className='flex flex-col items-center gap-[16px] lg:gap-[6px]'>
                            <p className='flex justify-center items-center w-fit text-[14px] lg:text-[16px] px-[14px] py-[6px] pb-[4px] rounded-[40px] text-white font-bold bg-[#CBCBCB33]'>Limited Spots Available</p>
                            <h2 className='text-[30px] lg:text-[40px] leading-[34px] lg:leading-[52px] font-semibold'>Be part of the first <br className='lg:hidden' /> cohort.</h2>
                            <p className='text-[16px] lg:text-[20px] font-medium leading-[24px] g:leading-[28px]'>
                                Get full access, all setup support, and early-user <br className='hidden lg:inline' /> advantages.
                            </p>
                        </div>

                        <div className='py-[20px] lg:py-[40px] w-full'>
                            <Separator variant='v2' />
                        </div>

                        <div className='flex flex-col sm:gap-[16px] items-center'>
                            <button 
                                onClick={() => window.location.hash = 'join'}
                                className='cursor-pointer bg-white rounded-[12px] px-[16px] py-[10px] text-[18px] text-[#121212] min-w-[320px] font-semibold '
                            >
                                Join first cohort
                            </button>
                            <p className='text-[16px] font-normal'>Takes less than 30 seconds. No commitment required.</p>

                        </div>
                    </div>

                </div>
            </div>


        </div >
    )
}

export default JoinCohort