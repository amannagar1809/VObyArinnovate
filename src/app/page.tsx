import Image from "next/image";
import { InquiryForm } from "./InquiryForm";
import { siteConfig } from "@/lib/site";

const services = [
  {
    number: "01",
    name: "Coworking passes",
    description:
      "A desk for the day, a change of scene, or a more flexible way to work.",
    label: "Drop in",
    style: "service-coral",
    image: "/service-coworking.jpg",
    imageAlt: "Shared coworking space with bright open desks",
  },
  {
    number: "02",
    name: "Meeting rooms",
    description:
      "A professional place to bring people together, in person and on your schedule.",
    label: "Meet well",
    style: "service-blue",
    image: "/service-meeting.jpg",
    imageAlt: "Meeting room arranged for a collaborative team discussion",
  },
  {
    number: "03",
    name: "Private offices",
    description:
      "A dedicated home base for focused work, small teams, and growing companies.",
    label: "Make it yours",
    style: "service-green",
    image: "/service-private-office.jpg",
    imageAlt: "Private workspace with desks and natural light",
  },
  {
    number: "04",
    name: "Virtual office",
    description:
      "Explore business address and office support options for a more flexible setup.",
    label: "Stay flexible",
    style: "service-yellow",
    image: "/service-virtual-office.jpg",
    imageAlt: "Modern office interior with shared work tables",
  },
];

const plans = [
  {
    name: "Flex",
    audience: "For workdays that move around",
    description: "Choose coworking access when you need a productive place to land.",
    features: ["Coworking access options", "Choose a preferred location", "Flexible inquiry, no long-term commitment"],
    style: "plan-light",
  },
  {
    name: "Dedicated",
    audience: "For a desk that feels like yours",
    description: "Find a consistent base for your everyday work and routine.",
    features: ["Dedicated desk options", "A more consistent work setup", "Ask about availability and terms"],
    style: "plan-featured",
  },
  {
    name: "Private office",
    audience: "For teams ready for their own space",
    description: "Explore private workspace options sized around your team.",
    features: ["Private office options", "Team-size recommendations", "Flexible terms to discuss"],
    style: "plan-light",
  },
];

const faqs = [
  {
    question: "How do I find out what is available in my city?",
    answer:
      "Send us your preferred city and workspace type. Our team will check current availability and get back to you with suitable options.",
  },
  {
    question: "Are prices listed on the site?",
    answer:
      "Pricing can vary by location, dates, and workspace type. Share what you need and our team will follow up with current options and pricing.",
  },
  {
    question: "Can I ask about more than one service?",
    answer:
      "Yes. Choose the closest match in the inquiry form and add any other requirements in your message. The team can help you compare options.",
  },
  {
    question: "What happens after I send an inquiry?",
    answer:
      "Your request is routed to our team. They will review your requirements and contact you to discuss availability, pricing, and next steps.",
  },
];

export default function Home() {
  return (
    <div className="launch-site">
      <header className="site-header">
        <a className="site-brand" href="#top" aria-label={`${siteConfig.name} home`}>
          <span className="brand-symbol" aria-hidden="true">A</span>
          <span className="brand-name">ARINNOVATE <small>WORKSPACES</small></span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#plans">Plans</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="button button-nav" href="#inquiry">Talk to our team <span aria-hidden="true">↗</span></a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />SPACE FOR WHAT&apos;S NEXT</p>
            <h1 id="hero-title">Work finds<br />a better place.</h1>
            <p className="hero-description">
              Find a desk for the day, a room for the big conversation, or a place your team can call its own.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#inquiry">Find your workspace <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#services">Explore services <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">Tell us what you need. We&apos;ll help you find the right fit.</p>
          </div>
          <div className="hero-photo-wrap">
            <Image
              className="hero-photo"
              src="/workspace-hero.jpg"
              alt="Bright, modern shared workspace with open desks and natural light"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <div className="photo-caption"><span className="caption-mark" aria-hidden="true">A</span><span>Make room for good work.</span></div>
            <span className="photo-index" aria-hidden="true">01 — WORK, YOUR WAY</span>
          </div>
        </section>

        <section className="services-section content-section" id="services" aria-labelledby="services-title">
          <div className="section-intro">
            <div>
              <p className="eyebrow">ONE PLACE, MANY WAYS TO WORK</p>
              <h2 id="services-title">Find the space<br className="desktop-break" /> that fits your day.</h2>
            </div>
            <p className="section-description">From a single workday to a growing team&apos;s new home, start with what you need today.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className={`service-item ${service.style}`} key={service.number}>
                <div className="service-photo">
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 760px) 100vw, 25vw" />
                  <span>{service.number}</span>
                </div>
                <p className="service-label">{service.label}</p>
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <a className="service-link" href="#inquiry" aria-label={`Ask about ${service.name}`}>Ask about this <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="plans-section" id="plans" aria-labelledby="plans-title">
          <div className="plans-inner">
            <div className="section-intro plans-intro">
              <div>
                <p className="eyebrow">A PLAN THAT WORKS FOR YOU</p>
                <h2 id="plans-title">Start with your<br className="desktop-break" /> kind of work.</h2>
              </div>
              <p className="section-description">Every team works differently. Tell us your location and routine, and we&apos;ll help you compare the available options.</p>
            </div>
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <article className={`plan-card ${plan.style}`} key={plan.name}>
                  <div className="plan-kicker"><span>0{index + 1}</span>{index === 1 && <span className="plan-badge">TEAM PICK</span>}</div>
                  <p className="plan-audience">{plan.audience}</p>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <a className="plan-link" href="#inquiry">Get plan details <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
            <p className="pricing-note">Pricing and availability depend on location and requirements. Ask us for current options.</p>
          </div>
        </section>

        <section className="process-section content-section" id="how-it-works" aria-labelledby="process-title">
          <div className="process-heading">
            <p className="eyebrow">A SIMPLE PLACE TO START</p>
            <h2 id="process-title">Three steps to<br /> your next workspace.</h2>
          </div>
          <ol className="process-list">
            <li><span className="process-number">01</span><div><h3>Tell us what you need</h3><p>Share a city, workspace type, team size, and timing.</p></div></li>
            <li><span className="process-number">02</span><div><h3>We find your options</h3><p>Our team reviews your request and checks suitable availability.</p></div></li>
            <li><span className="process-number">03</span><div><h3>Choose your next step</h3><p>Compare the details with our team and decide what works for you.</p></div></li>
          </ol>
        </section>

        <section className="inquiry-section" id="inquiry" aria-labelledby="inquiry-title">
          <div className="inquiry-copy">
            <p className="eyebrow">LET&apos;S GET TO WORK</p>
            <h2 id="inquiry-title">Tell us what<br /> you&apos;re looking for.</h2>
            <p>Share a few details and our team will help you explore workspace options for your needs.</p>
            <div className="inquiry-aside"><span className="aside-line" /><span>One request. A real conversation.</span></div>
          </div>
          <div className="inquiry-form-wrap"><InquiryForm /></div>
        </section>

        <section className="faq-section content-section" aria-labelledby="faq-title">
          <div className="faq-heading"><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-title">A few things<br /> you might be wondering.</h2></div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="site-brand footer-brand" href="#top" aria-label={`${siteConfig.name} home`}>
          <span className="brand-symbol" aria-hidden="true">A</span>
          <span className="brand-name">ARINNOVATE <small>WORKSPACES</small></span>
        </a>
        <p>Make room for good work.</p>
        <a href="#inquiry">Start a conversation <span aria-hidden="true">↗</span></a>
        <span className="copyright">© Arinnovate</span>
      </footer>
    </div>
  );
}