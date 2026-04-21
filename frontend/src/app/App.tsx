import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/CreatePassword-1/svg-v47m63igwc';
import imgBackground from '../imports/CreatePassword-1/cbc0bb16c827dbdffd9f4504fe5ec208bec37ff5.png';
import API_BASE_URL from '@/config';

const questions = [
  {
    id: 1,
    question: "What is the primary goal of the app, and what specific problem does it aim to solve for students?",
    options: [
      "Organize and manage academic tasks (assignments, exams, classes, etc.)",
      "Provide a platform for communication and collaboration between students and teachers",
      "Track academic progress and provide insights for improvement"
    ]
  },
  {
    id: 2,
    question: "How do you want the overall look and feel of the app to be?",
    options: [
      "Simple and clean, with a focus on functionality and usability",
      "Bold and colorful, using vibrant tones to energize and motivate students",
      "Sleek and modern, with a professional and polished design aesthetic"
    ]
  },
  {
    id: 3,
    question: "What is your preference for UI elements and animations?",
    options: [
      "Subtle animations (smooth transitions, fading in/out) with flat UI elements",
      "Interactive elements with bold animations (buttons that pop, hover effects)",
      "No animations, focus on static, straightforward elements for simplicity"
    ]
  },
  {
    id: 4,
    question: "What type of visual style and overall user experience do you want the app to have (minimalist, vibrant, professional, etc.)?",
    options: [
      "Minimalist and clean with a focus on simplicity and ease of use",
      "Bright, vibrant, and engaging with bold colors to motivate students",
      "Professional and academic with a more structured, traditional look"
    ]
  },
  {
    id: 5,
    question: "How do you measure success for the app, and what key performance indicators (KPIs) would you like to track?",
    options: [
      "User engagement (daily/weekly active users)",
      "Task completion rates (how often students complete assignments or tasks)",
      "Retention and return rate (how many students continue using the app over time)"
    ]
  }
];

function BackgroundOrbs() {
  return (
    <div className="-translate-y-1/2 absolute h-[421px] left-[-9px] top-[calc(50%+0.5px)] w-[472px]">
      <div className="absolute inset-[-76.01%_-67.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1112 1061">
          <g id="Frame 2147242020">
            <g filter="url(#filter0_fn_1_64)" id="Ellipse 40" opacity="0.57">
              <ellipse cx="617.5" cy="495" fill="var(--fill-0, #A2E84D)" rx="174.5" ry="173" />
            </g>
            <g filter="url(#filter1_fn_1_64)" id="Vector 7887" opacity="0.57">
              <path d={svgPaths.p5471a80} fill="var(--fill-0, #1579BA)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="986" id="filter0_fn_1_64" width="989" x="123" y="2">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_64" stdDeviation="160" />
              <feTurbulence baseFrequency="2 2" numOctaves="3" result="noise" seed="7402" stitchTiles="stitch" type="fractalNoise" />
              <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " type="discrete" />
              </feComponentTransfer>
              <feComposite in="coloredNoise1" in2="effect1_foregroundBlur_1_64" operator="in" result="noise1Clipped" />
              <feFlood floodColor="rgba(255, 255, 255, 0.2)" result="color1Flood" />
              <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
              <feMerge result="effect2_noise_1_64">
                <feMergeNode in="effect1_foregroundBlur_1_64" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1061" id="filter1_fn_1_64" width="957" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_64" stdDeviation="160" />
              <feTurbulence baseFrequency="2 2" numOctaves="3" result="noise" seed="7402" stitchTiles="stitch" type="fractalNoise" />
              <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " type="discrete" />
              </feComponentTransfer>
              <feComposite in="coloredNoise1" in2="effect1_foregroundBlur_1_64" operator="in" result="noise1Clipped" />
              <feFlood floodColor="rgba(255, 255, 255, 0.2)" result="color1Flood" />
              <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
              <feMerge result="effect2_noise_1_64">
                <feMergeNode in="effect1_foregroundBlur_1_64" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[9px] items-center left-[calc(50%-0.03px)] top-[628px]">
      <div className="overflow-clip relative rounded-[100px] shrink-0 size-[40px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[40px] top-1/2">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse 1" r="20" />
          </svg>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[36px] left-[calc(50%-0.5px)] top-[calc(50%+2px)] w-[37px]" data-name="Background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[108.33%] left-[-2.01%] max-w-none top-[-0.6%] w-[101.98%]" src={imgBackground} />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col font-normal items-start leading-[normal] relative shrink-0 w-[108px]">
        <p className="font-['Albert_Sans:Regular',sans-serif] min-w-full relative shrink-0 text-[#1a1a1a] text-[12px] w-[min-content]">Muneeb ur Rehamn</p>
        <p className="font-['Inter:Regular',sans-serif] not-italic relative shrink-0 text-[#4f4f4f] text-[10px] whitespace-nowrap">UXUI Designer</p>
      </div>
    </div>
  );
}

const ratingLinks = [
  { label: 'Onboarding', url: 'https://www.pinterest.com/pin/4433299630194490/' },
  { label: 'Onboarding 2', url: 'https://www.pinterest.com/pin/772156298657007314/' },
  { label: 'Modern', url: 'https://www.pinterest.com/pin/4362930884480513/' },
  { label: 'Gamified', url: 'https://www.pinterest.com/pin/1047861038301285712/' },
  { label: 'Professional', url: 'https://www.pinterest.com/pin/539024649162022939/' },
  { label: 'Professional', url: 'https://www.pinterest.com/pin/4996249583602081/' },
  { label: 'Clean', url: 'https://www.pinterest.com/pin/5629568279375156/' },
  { label: 'Gamified', url: 'https://www.pinterest.com/pin/1147784655041821766/' },
  { label: 'Gamified', url: 'https://www.pinterest.com/pin/34691859628149591/' },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [direction, setDirection] = useState(1);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: optionIndex
    });
  };

  const handleComplete = () => {
    setShowRatingForm(true);
  };

  const handleRatingComplete = () => {
    setShowRatingForm(false);
    setShowNameForm(true);
  };

  const handleRatingChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 10) {
      setRatings({
        ...ratings,
        [index]: numValue
      });
    }
  };

  const handleFinalSubmit = async () => {
    // Prevent double submission
    if (submitting) return;
    
    try {
      setSubmitting(true);
      
      const payload = {
        name,
        designation,
        responses: selectedOptions,
        ratings: {
          onboarding1: ratings[0] || 0,
          onboarding2: ratings[1] || 0,
          modern: ratings[2] || 0,
          gamified1: ratings[3] || 0,
          professional1: ratings[4] || 0,
          professional2: ratings[5] || 0,
          clean: ratings[6] || 0,
          gamified2: ratings[7] || 0,
          gamified3: ratings[8] || 0
        }
      };

      const response = await fetch(`${API_BASE_URL}/api/users/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you! Your responses have been submitted successfully.');
        // Reset form
        setCurrentQuestion(0);
        setSelectedOptions({});
        setRatings({});
        setName('');
        setDesignation('');
        setShowNameForm(false);
      } else {
        alert('Error submitting data. Please try again.');
        console.error('Submission error:', data);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Network error. Please check if the backend server is running on port 5000.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[30px] size-full" data-name="Create Password">
      <BackgroundOrbs />

      {/* Background rotated cards - these will be animated */}
      {!showRatingForm && !showNameForm && currentQuestion < questions.length - 1 && (
        <AnimatePresence>
          <motion.div
            key={`back-card-${currentQuestion + 1}`}
            initial={{
              rotateZ: 7.55,
              scale: 0.95,
              y: -5,
            }}
            animate={{
              rotateZ: 7.55,
              scale: 0.95,
              y: -5,
            }}
            className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[393.555px] items-center justify-center left-[calc(50%-0.03px)] top-[calc(50%-5.22px)] w-[390.115px]"
            style={{ "--transform-inner-width": "285", "--transform-inner-height": "0" } as React.CSSProperties}
          >
            <div className="bg-white h-[351px] rounded-[19px] w-[347px] shadow-lg" />
          </motion.div>
        </AnimatePresence>
      )}

      {!showRatingForm && !showNameForm && currentQuestion < questions.length - 2 && (
        <motion.div
          key={`back-card-deep-${currentQuestion + 2}`}
          className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[374.31px] items-center justify-center left-[calc(50%-0.03px)] top-[calc(50%-11.84px)] w-[370.599px]"
          style={{ "--transform-inner-width": "285", "--transform-inner-height": "0" } as React.CSSProperties}
          initial={{
            rotateZ: -3.99,
            scale: 0.9,
            y: -10,
          }}
          animate={{
            rotateZ: -3.99,
            scale: 0.9,
            y: -10,
          }}
        >
          <div className="bg-white h-[351px] rounded-[19px] w-[347px] shadow-md" />
        </motion.div>
      )}

      {/* Title */}
      <p className="-translate-x-1/2 absolute font-['Albert_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[calc(50%+0.47px)] text-[#1a1a1a] text-[24px] text-center top-[143px] w-[336px]">{`App Design & User Experience Preferences`}</p>

      {/* Main card with animation */}
      {!showRatingForm && !showNameForm ? (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            initial={(custom) => {
              if (custom > 0) {
                // Going forward - card comes from behind
                return {
                  rotateZ: 7.55,
                  scale: 0.95,
                  y: -5,
                  opacity: 0.8,
                  zIndex: 1,
                };
              } else {
                // Going backward
                return {
                  rotateZ: -7.55,
                  scale: 0.95,
                  y: -5,
                  opacity: 0.8,
                  zIndex: 1,
                };
              }
            }}
            animate={{
              rotateZ: 0,
              scale: 1,
              y: 0,
              opacity: 1,
              zIndex: 10,
            }}
            exit={(custom) => {
              if (custom > 0) {
                // Going forward - current card moves back and fades
                return {
                  rotateZ: -7.55,
                  scale: 0.9,
                  y: -10,
                  opacity: 0,
                  zIndex: 0,
                };
              } else {
                // Going backward - current card moves back
                return {
                  rotateZ: 7.55,
                  scale: 0.9,
                  y: -10,
                  opacity: 0,
                  zIndex: 0,
                };
              }
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 22,
              opacity: { duration: 0.3 }
            }}
            className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col gap-[24px] h-[351px] items-end left-[calc(50%-0.03px)] p-[16px] rounded-[19px] top-[calc(50%+0.5px)] w-[347px] shadow-xl"
            style={{ zIndex: 10 }}
          >
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              {/* Question header */}
              <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-[304px]">
                <p className="font-['Albert_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#4f4f4f] text-[12px] w-full">Question {String(currentQuestion + 1).padStart(2, '0')}/05</p>
                <p className="font-['Albert_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#1a1a1a] text-[16px] w-full">{currentQuestion + 1}. {questions[currentQuestion].question}</p>
              </div>

              {/* Options */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedOptions[currentQuestion] !== undefined && selectedOptions[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full cursor-pointer"
                    >
                      <div className="relative shrink-0 size-[17px]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                          <circle
                            cx="8.5"
                            cy="8.5"
                            id="Ellipse 43"
                            r="8"
                            stroke={isSelected ? "#0b73b7" : "#D9D9D9"}
                            strokeWidth={isSelected ? "2" : "1"}
                          />
                          {isSelected && (
                            <circle cx="8.5" cy="8.5" r="4" fill="#0b73b7" />
                          )}
                        </svg>
                      </div>
                      <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-left flex-1">{option}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-[10px] items-center self-stretch">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="bg-[#f0f0f0] content-stretch flex items-center justify-center p-[10px] relative rounded-[33px] shrink-0 w-[86px]"
              >
                <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[#1a1a1a] whitespace-nowrap">Previous</p>
              </button>
            )}

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedOptions[currentQuestion] === undefined}
                className={`${selectedOptions[currentQuestion] === undefined ? 'bg-[#d9d9d9]' : 'bg-[#0b73b7]'} content-stretch flex items-center justify-center p-[10px] relative rounded-[33px] shrink-0 w-[86px] ml-auto`}
              >
                <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">Next</p>
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={selectedOptions[currentQuestion] === undefined}
                className={`${selectedOptions[currentQuestion] === undefined ? 'bg-[#d9d9d9]' : 'bg-[#0b73b7]'} content-stretch flex items-center justify-center p-[10px] relative rounded-[33px] shrink-0 w-[100px] ml-auto`}
              >
                <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">Complete</p>
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      ) : showRatingForm ? (
        <motion.div
          initial={{ rotateZ: 7.55, scale: 0.95, y: -5, opacity: 0 }}
          animate={{ rotateZ: 0, scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 absolute bg-white flex flex-col gap-[24px] h-[351px] items-end left-[calc(50%-0.03px)] p-[16px] rounded-[19px] top-[calc(50%+0.5px)] w-[347px] shadow-xl overflow-hidden"
          style={{ zIndex: 10 }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden w-full pr-[4px]">
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              {/* Rating header */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[304px]">
                <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1a1a1a] text-[16px] w-full">How Much You Rate Below Attached Link Design</p>
              </div>

              {/* Rating items */}
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                {ratingLinks.map((link, index) => (
                  <div key={index} className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <a
                      className="block cursor-pointer decoration-solid font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative text-[14px] text-black underline whitespace-nowrap flex-1 max-w-[200px]"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    <div className="bg-[#f0f0f0] content-stretch flex h-[35px] items-center justify-center px-[8px] py-[11px] relative rounded-[6px] shrink-0 w-[54px]">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={ratings[index] !== undefined ? ratings[index] : 0}
                        onChange={(e) => handleRatingChange(index, e.target.value)}
                        className="bg-transparent font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] text-center text-[16px] text-black w-[20px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="font-['Albert_Sans:Medium',sans-serif] font-medium leading-[normal] text-[16px] text-black">/10</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4f4f4f] text-[10px] w-full">{`The Image is Just For Reference Purpose Don't Follow the Content`}</p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleRatingComplete}
            className="bg-[#0b73b7] content-stretch flex items-center justify-center p-[10px] relative rounded-[33px] shrink-0 w-[86px] ml-auto mt-auto"
          >
            <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">Next</p>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotateZ: 7.55, scale: 0.95, y: -5, opacity: 0 }}
          animate={{ rotateZ: 0, scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col gap-[24px] h-[351px] items-end left-[calc(50%-0.03px)] p-[16px] rounded-[19px] top-[calc(50%+0.5px)] w-[347px] shadow-xl"
          style={{ zIndex: 10 }}
        >
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              {/* Form header */}
              <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-[304px]">
                <p className="font-['Albert_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#4f4f4f] text-[12px] w-full">Final Step</p>
              </div>

              {/* Input fields */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <label className="font-['Albert_Sans:Medium',sans-serif] font-medium text-[#1a1a1a] text-[14px]">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-[12px] rounded-[8px] border border-[#D9D9D9] font-['Albert_Sans:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:border-[#0b73b7] focus:outline-none"
                  />
                </div>

                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <label className="font-['Albert_Sans:Medium',sans-serif] font-medium text-[#1a1a1a] text-[14px]">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Enter your designation"
                    className="w-full p-[12px] rounded-[8px] border border-[#D9D9D9] font-['Albert_Sans:Regular',sans-serif] text-[14px] text-[#1a1a1a] focus:border-[#0b73b7] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleFinalSubmit}
            disabled={!name || !designation || submitting}
            className={`${(!name || !designation || submitting) ? 'bg-[#d9d9d9] cursor-not-allowed' : 'bg-[#0b73b7]'} content-stretch flex items-center justify-center p-[10px] relative rounded-[33px] shrink-0 w-[86px] ml-auto`}
          >
            <p className="font-['Albert_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white whitespace-nowrap">
              {submitting ? 'Sending...' : 'Submit'}
            </p>
          </button>
        </motion.div>
      )}

      <UserProfile />
    </div>
  );
}
