import React from 'react'
import HeroSection from './HeroSection'

const ImpactSnapshot: React.FC = () => {
  const stats = [
    { icon: '🏢', label: 'Orgs Served', value: 32 },
    { icon: '⏱️', label: 'Volunteer Hours', value: 1280 },
    { icon: '🚀', label: 'Projects Launched', value: 24 },
  ]

  return (
    <section className="py-16 bg-gray-900 text-white text-center">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="space-y-2">
            <div className="text-5xl">{s.icon}</div>
            <h3 className="text-4xl font-bold">{s.value}+</h3>
            <p className="uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const SpotlightProject: React.FC = () => (
  <section className="py-16 bg-white text-gray-800 text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Spotlight Project</h2>
      <div className="relative group overflow-hidden rounded-xl shadow-lg">
        <img
          src="/projects/example-screenshot.png"
          alt="UI before/after"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href="/projects/example" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
)

const HowWeWork: React.FC = () => {
  const steps = [
    { icon: '🔍', title: 'Discover & Plan' },
    { icon: '⚙️', title: 'Build & Test' },
    { icon: '💡', title: 'Launch & Support' },
  ]

  return (
    <section className="py-16 bg-gray-100 text-gray-800 text-center">
      <h2 className="text-3xl font-bold mb-8">How We Work</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.title} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

const FooterCTA: React.FC = () => (
  <div className="fixed bottom-0 w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
    <span className="font-medium">Ready to ignite your project?</span>
    <a href="#work-with-us" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow">
      Start Your Project
    </a>
  </div>
)

const LandingPage: React.FC = () => (
  <>
    <HeroSection />
    <ImpactSnapshot />
    <SpotlightProject />
    <HowWeWork />
  </>
)

export default LandingPage