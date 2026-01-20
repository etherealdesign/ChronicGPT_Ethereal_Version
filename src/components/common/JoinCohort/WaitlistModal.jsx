import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { motion, AnimatePresence } from "framer-motion"
import AppDialog from '../Dialog/AppDialog'
import FormInput from '../Form/FormInput'
import { HiOutlineXCircle } from "react-icons/hi2";
import FormTextArea from '../Form/FormTextArea';
import logo from "../../../../public/assets/images/darklogo.png";
import thankimage from "../../../../public/assets/images/thankyou.png";
import FormMultiSelect from '../Form/FormMultiSelect';

function WaitlistModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)
    const [primaryCondition, setPrimaryCondition] = useState([])
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})

    // Check for #join hash to open waitlist modal
    useEffect(() => {
        if (location.hash === '#join') {
            setOpen(true)
            // Clean up the hash after modal opens using navigate to keep Router in sync
            navigate(location.pathname + location.search, { replace: true })
        }
    }, [location, navigate])

    const validatePhone = (phone) => {
        // Basic phone validation: at least 10 digits, may include + and spaces/parentheses
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({}) // Clear previous errors

        // Get form data
        const formDataObj = new FormData(e.target)
        const firstName = formDataObj.get('first-name')
        const lastName = formDataObj.get('last-name')
        const email = formDataObj.get('email')
        const phone = formDataObj.get('phone')

        const newErrors = {}

        // Basic validation
        if (!firstName) newErrors.firstName = "First name is required"
        if (!lastName) newErrors.lastName = "Last name is required"
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!validateEmail(email)) {
             newErrors.email = "Please enter a valid email address (e.g., mail@example.com)"
        }

        // Validate phone number
        if (phone && !validatePhone(phone)) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Store form data for thank you display
        const userData = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            primaryCondition: formDataObj.getAll('primary-condition[]'),
            additionalInfo: formDataObj.get('additional-information')
        }
        setFormData(userData)

        // For development, just simulate success sine Netlify forms work only when deployed
        if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
                setShowThankYou(true)
            }, 400) // Fast response
            return
        }

        // For production, submit to Netlify
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataObj).toString()
            })

            if (response.ok) {
                setShowThankYou(true)
            } else {
                setErrors({ submit: 'There was an error submitting the form. Please try again.' })
            }
        } catch (error) {
            console.error('Form submission error:', error)
             setErrors({ submit: 'There was an error submitting the form. Please try again.' })
        }
    }


    return (
        <AppDialog
            trigger={<span className="hidden"></span>}
            open={open}
            contentClassName="max-h-[90lvh] lg:!max-h-fit lg:!w-[90vw]"
            onOpenChange={setOpen}>
            
            <div className='flex flex-col lg:flex-row sm:gap-[24px] h-[85lvh] w-[80vw] p-[2px] lg:gap-0 w-full items-stretch text-[#121212] lg:pr-[48px] relative'>
                <AnimatePresence mode='wait'>
                {!showThankYou ? (
                    <motion.div
                        key="form-view"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col lg:flex-row w-full h-full gap-[24px] lg:gap-0'
                    >
                        {/* Left Column */}
                        <div className='lg:flex-1 flex flex-col gap-[5px] sm:gap-[15px] '>
                            <img src={logo} alt="logo" className=" w-[155px] h-[45px] w-[155px] h-[45px] sm:w-[230px] sm:h-[60px] " />
                            <div className='flex flex-col gap-[0px] sm:gap-[8px]'>
                                <div className='text-[24px] lg:text-[30px] font-bold'>Join the Waitlist</div>
                            </div>
                            <div className='text-[16px] leading-[20px] lg:text-[38px] lg:leading-[42px] font-thin'>
                                Be among the first to experience personalized AI Doctor care
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className='flex-1 shrink-0 flex flex-col lg:px-[80px] w-full justify-center relative overflow-y-auto h-full custom-scrollbar'>
                                {/* Custom Error UI - White Box */}
                                <AnimatePresence>
                                {Object.keys(errors).length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-0 left-0 right-0 z-10 bg-white border border-red-200 rounded-lg shadow-lg p-4 mb-4 mx-4 lg:mx-[80px]"
                                    >
                                        <div className="flex items-start gap-3">
                                            <HiOutlineXCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-semibold text-red-600">Please check the following:</p>
                                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                                    {Object.values(errors).map((err, idx) => (
                                                        <li key={idx}>{err}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form name="waitlist" method="POST" data-netlify="true" className='flex flex-col gap-[20px] sm:gap-[16px] lg:gap-[32px] h-full px-2 [@media(min-width:2000px)]:justify-center' onSubmit={handleSubmit}>
                                <input type="hidden" name="form-name" value="waitlist" />
                                <div className='flex flex-row gap-[12px] lg:gap-[24px]'>
                                    <FormInput
                                        label="First Name"
                                        id="first-name"
                                        name="first-name"
                                        placeholder="First name"
                                        className={`w-full ${errors.firstName ? 'border-red-500' : ''}`}
                                    />
                                    <FormInput
                                        label="Last Name"
                                        id="last-name"
                                        name="last-name"
                                        placeholder="Last name"
                                        className={`w-full ${errors.lastName ? 'border-red-500' : ''}`}
                                    />
                                </div>

                                    <FormInput
                                        label="Phone Number"
                                        id="phone"
                                        name="phone"
                                        placeholder="+1 (469) 850-9205"
                                        className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                                    />

                                    <FormInput
                                        label="Email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                                    />
                               

                                <FormMultiSelect
                                    label="Primary Condition(s) (Optional)"
                                    id="primary-condition"
                                    options={[
                                        { label: "Diabetes", value: "diabetes" },
                                        { label: "Hypertension", value: "hypertension" },
                                        { label: "Obesity", value: "obesity" },
                                        { label: "COPD", value: "copd" },
                                        { label: "Cardiovascular Conditions", value: "cardiovascular" },
                                        { label: "Other Chronic Conditions", value: "other" },
                                    ]}
                                    onValueChange={setPrimaryCondition}
                                    currentValues={primaryCondition}
                                />

                                <FormTextArea
                                    label="Additional Information (Optional)"
                                    id="additional-information"
                                    name="additional-information"
                                    placeholder="Tell us about your health goal..."
                                    className={"w-full border-[0px]"}
                                    rows={2}
                                />
                                <button type="submit" className='cursor-pointer bg-[#121212] text-white rounded-[12px] px-[16px] py-[10px] text-[18px] min-w-[320px] font-semibold hover:bg-gray-800 transition-colors duration-200'>Request</button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="thank-you-view"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col lg:flex-row w-full h-full gap-[24px] lg:gap-0'
                    >
                        {/* Left Column - Thank You Image */}
                        <div className='hidden lg:flex flex-1 flex-col h-full justify-between'>
                            <div className='self-start w-full hidden lg:block'>
                                <img src={logo} alt="ChronicGPT Inc" className="w-[160px] lg:w-[180px] object-contain" />
                            </div>
                            <div className='flex-1 flex items-center justify-center w-full my-6 lg:my-0 hidden lg:flex'>
                                <img src={thankimage} alt="Success" className='w-[60%] lg:w-[80%] object-contain' />
                            </div>
                        </div>

                        {/* Right Column - Thank You Content */}
                        <div className='flex-1 flex flex-col lg:px-[80px] w-full justify-center'>
                            <div className='flex flex-col justify-center items-center text-center lg:items-start lg:text-left w-full'>
                                {/* Logo (mobile) */}
                                <div className='w-full flex justify-center mb-4 lg:hidden'>
                                    <img src={logo} alt="ChronicGPT Inc" className="w-[140px] object-contain" />
                                </div>

                                <h2 className='text-[28px] lg:text-[36px] leading-[1.2] font-bold text-[#121212] mb-2'>
                                    Thank You!
                                </h2>

                                <p className='text-[#666666] text-[16px] lg:text-[18px] leading-[1.5] font-light mb-6'>
                                    Your waitlist request has been submitted successfully.
                                </p>

                                {/* Image (mobile) */}
                                <div className='flex items-center justify-center w-full my-4 lg:hidden'>
                                    <img src={thankimage} alt="Success" className='w-[60%] object-contain' />
                                </div>

                                {/* Your Information */}
                                <div className='mb-10 w-full flex justify-center lg:justify-start'>
                                    <div className='w-full max-w-[320px] text-left'>
                                        <h3 className='text-[18px] font-bold text-[#121212] mb-4 text-center lg:text-left'>
                                            Your Information
                                        </h3>

                                        <div className='flex flex-col gap-[12px]'>
                                            <div className="text-[16px] text-[#666666] flex items-start gap-2">
                                                <span className="font-medium text-[#121212] whitespace-nowrap">Name:</span>
                                                <span className="font-light ">{formData.firstName} {formData.lastName}</span>
                                            </div>

                                            <div className="text-[16px] text-[#666666] flex items-start gap-2">
                                                <span className="font-medium text-[#121212] whitespacep">Email:</span>
                                                <span className="font-light">{formData.email}</span>
                                            </div>

                                            <div className="text-[16px] text-[#666666] flex items-start gap-2">
                                                <span className="font-medium text-[#121212] whitespace-nowrap">Phone:</span>
                                                <span className="font-light ">{formData.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowThankYou(false)
                                        setOpen(false)
                                    }}
                                    className='w-full bg-[#121212] text-white py-3.5 rounded-[12px] font-medium text-[16px] transition-all hover:bg-gray-900 active:scale-[0.98]'
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </AppDialog>
    )
}

export default WaitlistModal;
