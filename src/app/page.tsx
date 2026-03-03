'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex((el) => el === entry.target)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.3 }
    )

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1d1d1f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">SuGuard</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Overview', 'Device', 'App', 'Comparison', 'Market', 'Team'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(i)}
                className={`text-sm transition-colors ${
                  activeSection === i ? 'text-[#1d1d1f] font-medium' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <a href="#contact" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0077ed] transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={(el) => { sectionsRef.current[0] = el }}
        className="min-h-screen flex flex-col items-center justify-center pt-20 px-6"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight mb-4">
            SuGuard
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 font-light mb-3">
            Non-invasive glucometer
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            AI-powered optical sensor for painless blood glucose monitoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#device" className="bg-[#0071e3] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#0077ed] transition-colors">
              Learn More
            </a>
            <a href="#contact" className="text-[#0071e3] px-8 py-3 rounded-full text-base font-medium border border-[#0071e3] hover:bg-blue-50 transition-colors">
              Get Early Access
            </a>
          </div>
        </div>
        
        {/* Product Image Placeholder */}
        <div className="relative">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200">
            <img
              src="/images/device-side.jpeg"
              alt="SuGuard Device"
              className="w-full h-full object-contain rounded-3xl"
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">SuGuard Device</p>
        </div>
      </section>

      {/* Problem Section with Data Visualization */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">The Problem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Traditional glucose monitoring is invasive, expensive, and painful
            </p>
          </div>

          {/* Healthcare Spending Chart */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-6">Healthcare Spending on Diabetes in Kazakhstan</h3>
            <div className="flex items-end gap-4 h-48">
              {[
                { year: '2021', value: 30 },
                { year: '2022', value: 40 },
                { year: '2023', value: 50 },
                { year: '2024', value: 60 },
                { year: '2025', value: 70 },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[#0071e3] rounded-t-lg transition-all duration-300"
                    style={{ height: `${item.value * 2.5}px` }}
                  />
                  <div className="mt-2 text-sm text-gray-500">{item.year}</div>
                  <div className="text-sm font-semibold">{item.value}B ₸</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Issues Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Fear & Anxiety</h4>
              <p className="text-gray-600 text-sm">Needle phobia leads to irregular monitoring and poor health outcomes</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">High Recurring Costs</h4>
              <p className="text-gray-600 text-sm">Test strips cost 3,000₸/month, CGM sensors 70,000₸/month</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Infection Risk</h4>
              <p className="text-gray-600 text-sm">Repeated finger pricks increase risk of infection and skin damage</p>
            </div>
          </div>

          {/* Survey Results */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold mb-6">Impact of Cost on Monitoring Frequency</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Very Strongly</span>
                    <span className="font-semibold">55%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0071e3] rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Moderately</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0071e3] rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Slightly</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0071e3] rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: Internal patient survey</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold mb-6">Preferred Device Format</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Portable for home</span>
                    <span className="font-semibold">50%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#34c759] rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Wearable (bracelet/clip)</span>
                    <span className="font-semibold">55%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#34c759] rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Mobile app with sensor</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#34c759] rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Section */}
      <section 
        ref={(el) => { sectionsRef.current[1] = el }}
        id="device"
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">The Device</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Infrared spectroscopy combined with neural network analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1d1d1f] font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Infrared Emission</h3>
                    <p className="text-gray-600 text-sm">Sensor emits infrared and red light through skin tissue</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1d1d1f] font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Light Absorption</h3>
                    <p className="text-gray-600 text-sm">Higher glucose concentration = more light absorption</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1d1d1f] font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Temperature Compensation</h3>
                    <p className="text-gray-600 text-sm">Thermal sensor corrects temperature-related errors</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-[#1d1d1f] font-bold">4</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI Prediction</h3>
                    <p className="text-gray-600 text-sm">Neural network predicts blood glucose level</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200">
                <img
                  src="/images/device-lcd.jpeg"
                  alt="SuGuard Internal"
                  className="w-full h-full object-contain rounded-3xl"
                />
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-8 text-center">Technical Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="text-2xl font-semibold mb-1">ESP32</div>
                <div className="text-sm text-gray-500">MCU + Bluetooth</div>
                <div className="text-xs text-gray-400 mt-1">₸2,000</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-semibold mb-1">MAX30102</div>
                <div className="text-sm text-gray-500">Optical Sensor</div>
                <div className="text-xs text-gray-400 mt-1">₸3,000</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-semibold mb-1">MLX90614</div>
                <div className="text-sm text-gray-500">Temp Sensor</div>
                <div className="text-xs text-gray-400 mt-1">₸3,500</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-semibold mb-1">0.96" OLED</div>
                <div className="text-sm text-gray-500">Display</div>
                <div className="text-xs text-gray-400 mt-1">₸1,200</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section 
        ref={(el) => { sectionsRef.current[2] = el }}
        id="app"
        className="py-24 px-6 bg-[#1d1d1f] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">SuGuard PRO App</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              AI-powered analytics and real-time glucose tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* App Screenshots */}
            <div className="flex justify-center gap-4">
              <div className="w-56 bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/app-home.png"
                  alt="SuGuard App Home"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-56 bg-white rounded-3xl overflow-hidden shadow-2xl hidden md:block">
                <img
                  src="/images/app-history.png"
                  alt="SuGuard App History"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-time Monitoring</h4>
                    <p className="text-gray-400 text-sm">Live glucose readings with trend indicators</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Analytics</h4>
                    <p className="text-gray-400 text-sm">Personalized insights and recommendations</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📈</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">History & Trends</h4>
                    <p className="text-gray-400 text-sm">Day/Week/Month views with statistics</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🔔</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Notifications</h4>
                    <p className="text-gray-400 text-sm">Alerts for abnormal glucose levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl font-semibold mb-1">5.6</div>
              <div className="text-sm text-gray-400">mmol/L Reading</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl font-semibold mb-1">87%</div>
              <div className="text-sm text-gray-400">In Range</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl font-semibold mb-1">4.0-7.8</div>
              <div className="text-sm text-gray-400">Normal Range</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-3xl font-semibold mb-1">AI</div>
              <div className="text-sm text-gray-400">Powered Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section 
        ref={(el) => { sectionsRef.current[3] = el }}
        id="comparison"
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Comparison</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How SuGuard compares to traditional monitoring methods
            </p>
          </div>

          {/* Visual Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 border-2 border-[#0071e3] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0071e3] text-white px-4 py-1 rounded-full text-sm font-medium">
                SuGuard
              </div>
              <div className="text-center mt-4">
                <div className="text-4xl font-semibold mb-2">₸35,000</div>
                <div className="text-gray-500 mb-6">One-time purchase</div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Non-invasive</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>5+ year lifespan</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No consumables</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-500 mb-2">Traditional</div>
                <div className="text-4xl font-semibold mb-2">₸7,000</div>
                <div className="text-gray-500 mb-6">+ ₸3,000/month strips</div>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Finger pricks</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Recurring costs</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>~5% accuracy</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-500 mb-2">CGM</div>
                <div className="text-4xl font-semibold mb-2">₸70,000</div>
                <div className="text-gray-500 mb-6">per month</div>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Under skin</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>7-10 day sensor</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Continuous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-medium text-gray-500">Specification</th>
                  <th className="text-center py-4 px-4 font-medium">SuGuard</th>
                  <th className="text-center py-4 px-4 font-medium text-gray-500">Glucometer</th>
                  <th className="text-center py-4 px-4 font-medium text-gray-500">CGM</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Cost (5 years)</td>
                  <td className="py-4 px-4 text-center font-semibold">₸35,000</td>
                  <td className="py-4 px-4 text-center">~₸187,000</td>
                  <td className="py-4 px-4 text-center">~₸4,200,000</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Method</td>
                  <td className="py-4 px-4 text-center font-semibold text-green-600">Non-invasive</td>
                  <td className="py-4 px-4 text-center">Finger prick</td>
                  <td className="py-4 px-4 text-center">Under skin</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Error Rate</td>
                  <td className="py-4 px-4 text-center font-semibold">7-8%</td>
                  <td className="py-4 px-4 text-center">~5%</td>
                  <td className="py-4 px-4 text-center">~10%</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Device Lifespan</td>
                  <td className="py-4 px-4 text-center font-semibold">5+ years</td>
                  <td className="py-4 px-4 text-center">Variable</td>
                  <td className="py-4 px-4 text-center">7-10 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section 
        ref={(el) => { sectionsRef.current[4] = el }}
        id="market"
        className="py-24 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Market Opportunity</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Targeting users who don't monitor regularly due to cost and discomfort
            </p>
          </div>

          {/* TAM SAM SOM Visualization */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">TAM</div>
              <div className="text-5xl font-semibold mb-2">270M</div>
              <div className="text-gray-500 mb-4">Global potential users</div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium">$18.6B</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit</span>
                  <span className="font-medium text-green-600">$2.1B</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">SAM</div>
              <div className="text-5xl font-semibold mb-2 text-[#0071e3]">2M</div>
              <div className="text-gray-500 mb-4">Kazakhstan market</div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium">$138M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit</span>
                  <span className="font-medium text-green-600">$15.6M</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">SOM</div>
              <div className="text-5xl font-semibold mb-2 text-[#34c759]">30K</div>
              <div className="text-gray-500 mb-4">First 2 years target</div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium">$2.1M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit</span>
                  <span className="font-medium text-green-600">$234K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold mb-8 text-center">Development Timeline</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { month: 'Nov 2025', task: 'MVP', status: 'current' },
                { month: 'Dec 2025', task: 'Testing', status: 'upcoming' },
                { month: 'Jan 2026', task: 'Clinical', status: 'upcoming' },
                { month: 'Feb 2026', task: 'KPO Pilot', status: 'upcoming' },
                { month: 'Apr 2026', task: 'Market Prep', status: 'upcoming' },
                { month: 'May 2026', task: 'Launch', status: 'upcoming' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-semibold ${
                    item.status === 'current' ? 'bg-[#0071e3] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="text-sm font-medium">{item.month}</div>
                  <div className="text-xs text-gray-500">{item.task}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Partners & Support</h2>
          </div>

          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Nazarbayev University', abbr: 'NU' },
              { name: 'Karachaganak Petroleum', abbr: 'KPO' },
              { name: 'Astana Hub', abbr: 'AH' },
              { name: 'INVITRO', abbr: 'INV' },
            ].map((partner, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 h-32">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-2 border border-gray-200">
                  <span className="text-xl font-bold text-gray-700">{partner.abbr}</span>
                </div>
                <span className="text-sm text-gray-600 text-center">{partner.name}</span>
              </div>
            ))}
          </div>

          {/* Investment Badge */}
          <div className="flex justify-center">
            <div className="bg-gray-50 rounded-2xl px-8 py-6 border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Initial Investment</div>
              <div className="text-3xl font-semibold">₸200,000</div>
              <div className="text-sm text-gray-500">from ASTANA INNOVATION FORUM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={(el) => { sectionsRef.current[5] = el }}
        id="team"
        className="py-24 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Our Team</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Makhsot Bekarys', role: 'CEO', initials: 'MB' },
              { name: 'Bakhtiyar Ismagulov', role: 'CTO', initials: 'BI' },
              { name: 'Nurkan Kaiyrly', role: 'Programmer', initials: 'NK' },
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-200">
                <div className="w-20 h-20 bg-[#1d1d1f] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                  {member.initials}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <div className="text-sm text-[#0071e3]">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Interested in SuGuard? We'd love to hear from you.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href="tel:+77056612373" className="flex items-center gap-3 text-gray-600 hover:text-[#0071e3] transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +7 705 661 2373
                  </a>
                  <a href="mailto:ademamaidanovna81@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-[#0071e3] transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    ademamaidanovna81@gmail.com
                  </a>
                  <a href="https://suguard.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#0071e3] transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    suguard.vercel.app
                  </a>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Oral, Kazakhstan
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Pricing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">B2B Price</span>
                    <span className="font-medium">₸35,000/unit</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">B2C Price</span>
                    <span className="font-medium">₸43,700/unit</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Maintenance</span>
                    <span className="font-medium">₸1,040/year</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Bulk Discount</span>
                    <span className="font-medium">50+ units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1d1d1f] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1d1d1f] font-bold text-sm">SG</span>
              </div>
              <span className="font-semibold">SuGuard</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 SuGuard. Control without pain.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
