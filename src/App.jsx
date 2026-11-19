import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import logo from '/nova-business-logo.jpg';
import blogBookingImage from './assets/images/blog-booking.jpg';
import blogCrmImage from './assets/images/blog-crm.jpg';
import blogWebsiteImage from './assets/images/blog-website.jpg';
import serviceWebsitesImage from './assets/images/service-websites.jpg';
import serviceCrmImage from './assets/images/service-crm.jpg';
import serviceBookingImage from './assets/images/service-booking.jpg';
import servicePortalsImage from './assets/images/service-portals.jpg';
import serviceRetailImage from './assets/images/service-retail.jpg';
import serviceContentSeoImage from './assets/images/service-content-seo.jpg';
import portfolioConsultingImage from './assets/images/portfolio-consulting.jpg';
import portfolioCoworkingImage from './assets/images/portfolio-coworking.jpg';
import portfolioHospitalityImage from './assets/images/portfolio-hospitality.jpg';
import portfolioHomeServicesImage from './assets/images/portfolio-home-services.jpg';
import portfolioLearningImage from './assets/images/portfolio-learning.jpg';
import portfolioRetailImage from './assets/images/portfolio-retail.jpg';
import portfolioWellnessImage from './assets/images/portfolio-wellness.jpg';
import heroWorkspaceImage from './assets/images/hero-workspace.jpg';
import aboutWorkspaceImage from './assets/images/about-workspace.jpg';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Contact,
  CreditCard,
  FileText,
  Gauge,
  Globe,
  Laptop2,
  Lock,
  Mail,
  Menu,
  MessageSquareText,
  Monitor,
  PencilRuler,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Clock,
  Download,
  Filter,
  DollarSign,
  Activity,
  Layers,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Auth', to: '/auth' }
];

const processSteps = [
  'Discovery & strategy alignment',
  'UI/UX and motion design sprints',
  'Build, QA, and launch pipeline',
  'Growth optimization & reporting'
];

const pricingPlans = [
  {
    name: 'Launch',
    price: 'Custom scope',
    description: 'Ideal for startups that want a sharper web presence and lead capture system.',
    features: ['Multi-page marketing site', 'Lead form & CRM integration', 'SEO setup', 'Monthly reporting'],
    accent: 'neutral'
  },
  {
    name: 'Growth',
    price: 'Custom scope',
    description: 'Best for scaling businesses that need content, sales, and booking workflow support.',
    features: ['Everything in Launch', 'Client portal access', 'CMS + blog engine', 'Advanced analytics'],
    accent: 'primary',
    featured: true
  },
  {
    name: 'Scale',
    price: 'Custom scope',
    description: 'Built for multi-team operations needing dashboards, permissions, and automation.',
    features: ['Unlimited admin seats', 'Custom workflows', 'Priority support', 'Backup & security suite'],
    accent: 'teal'
  }
];

const faqItems = [
  'Can I manage all website content from the admin dashboard?',
  'Do you include appointment booking and reminder emails?',
  'Is the client portal secure and role-based?',
  'Can this be scaled for multiple business brands or departments?'
];

const publicContent = {
  services: [
    {
      _id: 'business-websites',
      slug: 'business-websites',
      title: 'Business websites & landing pages',
      category: 'Websites',
      image: serviceWebsitesImage,
      imageAlt: 'Modern workspace laptop with responsive business website interface',
      shortDescription: 'Responsive, easy-to-understand websites that explain your offer and guide visitors to the next step.',
      description: 'Create a clear online home for your business with useful service pages, mobile-friendly layouts, and inquiry paths that make it simple for the right customers to reach you.',
      idealFor: 'Growing businesses that need a professional website, a clearer service story, or focused landing pages for key offers.',
      deliverables: ['Website structure and page planning', 'Responsive page layouts', 'Service and contact content sections', 'Inquiry form and launch-ready setup']
    },
    {
      _id: 'crm-lead-management',
      slug: 'crm-lead-management',
      title: 'CRM & lead management',
      category: 'Sales & operations',
      image: serviceCrmImage,
      imageAlt: 'Business analytics dashboard with lead management and sales pipeline',
      shortDescription: 'Keep inquiries, customer details, follow-ups, and sales stages organized in one clear workflow.',
      description: 'Give your team a consistent way to track new inquiries and active opportunities. A practical CRM workflow makes ownership, next steps, and customer conversations easier to review.',
      idealFor: 'Service teams that receive leads from multiple channels or need more reliable follow-up habits.',
      deliverables: ['Lead stages tailored to your process', 'Customer and inquiry records', 'Follow-up ownership and reminders', 'Pipeline views for team reviews']
    },
    {
      _id: 'online-booking',
      slug: 'online-booking',
      title: 'Appointments & online booking',
      category: 'Sales & operations',
      image: serviceBookingImage,
      imageAlt: 'Mobile appointment booking and schedule confirmation interface',
      shortDescription: 'Make it easier for customers to request or schedule appointments and understand what happens next.',
      description: 'Present available services and booking details in a straightforward flow. Clear confirmations and helpful reminders keep customers and staff aligned around each appointment.',
      idealFor: 'Studios, consultants, clinics, and other teams that manage scheduled appointments.',
      deliverables: ['Service and appointment information', 'Booking request or scheduling flow', 'Confirmation and reminder touchpoints', 'Staff-facing schedule overview']
    },
    {
      _id: 'client-portals',
      slug: 'client-portals',
      title: 'Client portals & project updates',
      category: 'Customer experience',
      image: servicePortalsImage,
      imageAlt: 'Executive business team reviewing client portal deliverables collaboratively',
      shortDescription: 'Give clients a convenient place to review shared resources, project milestones, and next steps.',
      description: 'Bring important project information into one organized client experience. A portal can help reduce scattered updates and make progress easier for both the team and its customers to follow.',
      idealFor: 'Consultancies and service businesses that share ongoing work, documents, or project updates with clients.',
      deliverables: ['Client-facing project overview', 'Milestones and status updates', 'Shared resource area', 'Clear client and team next steps']
    },
    {
      _id: 'ecommerce-retail',
      slug: 'ecommerce-retail',
      title: 'E-commerce & retail experiences',
      category: 'Commerce',
      image: serviceRetailImage,
      imageAlt: 'Modern boutique retail storefront with curated product display',
      shortDescription: 'Help customers explore products and find the details they need to make an informed purchase.',
      description: 'Build a useful digital storefront with organized product information, clear availability details, and a smoother path from browsing to customer inquiry or purchase.',
      idealFor: 'Retail businesses that want to improve product discovery and connect their online presence with store operations.',
      deliverables: ['Product collection and detail pages', 'Product availability information', 'Customer inquiry or purchase paths', 'Store information and support details']
    },
    {
      _id: 'content-seo',
      slug: 'content-seo',
      title: 'Content publishing & SEO foundations',
      category: 'Growth',
      image: serviceContentSeoImage,
      imageAlt: 'Creative content publishing workstation with analytics and editorial strategy',
      shortDescription: 'Publish useful articles and service content with a structure that is clear for readers and search engines.',
      description: 'Create a manageable publishing workflow for service pages and articles. Clear page structure, useful metadata, and consistent content make it easier for people to find and understand your business.',
      idealFor: 'Teams that want to publish regularly and make their website content easier to navigate.',
      deliverables: ['Content and topic structure', 'Article and service page templates', 'Search-friendly page metadata', 'Publishing and review workflow']
    }
  ],
  portfolio: [
    {
      _id: 'summit-advisory-portal',
      slug: 'summit-advisory-portal',
      title: 'Summit Advisory Client Portal',
      image: portfolioConsultingImage,
      imageAlt: 'Modern corporate advisory high-rise architecture and consulting firm',
      service: 'Concept showcase · Consulting',
      summary: 'A polished lead-to-client experience for an independent business advisory firm.',
      challenge: 'The advisory team needed a clearer way to explain its services, capture qualified inquiries, and keep client project updates organized.',
      approach: 'The concept pairs a focused service website and qualification form with a role-based client area for project milestones, shared resources, and next steps.',
      deliverables: ['Service-led marketing website', 'Lead qualification workflow', 'Client project dashboard', 'Resource and milestone views']
    },
    {
      _id: 'greenway-home-services',
      slug: 'greenway-home-services',
      title: 'Greenway Home Services Growth Platform',
      image: portfolioHomeServicesImage,
      imageAlt: 'Contemporary architectural residential home with warm exterior lighting',
      service: 'Concept showcase · Home services',
      summary: 'A connected website, estimate-request flow, and follow-up workspace for a local service business.',
      challenge: 'A growing home services team wanted to make it easier for customers to request estimates while keeping new leads and follow-ups visible to staff.',
      approach: 'The concept brings service-area pages, a guided request form, and a simple pipeline together so the team can track each inquiry from first contact to scheduled work.',
      deliverables: ['Local service landing pages', 'Estimate request form', 'Lead pipeline and follow-up reminders', 'Appointment scheduling flow']
    },
    {
      _id: 'luma-wellness-booking',
      slug: 'luma-wellness-booking',
      title: 'Luma Wellness Booking Experience',
      image: portfolioWellnessImage,
      imageAlt: 'Serene wellness studio with organic spa amenities, candle, and fresh flowers',
      service: 'Concept showcase · Wellness',
      summary: 'A calm, mobile-first booking journey for a wellness studio and its recurring clients.',
      challenge: 'Clients needed a quick way to understand available services and request appointments, while staff needed one place to review booking details.',
      approach: 'The concept combines an accessible service directory with a streamlined booking form and a staff-facing schedule overview.',
      deliverables: ['Mobile-first service website', 'Appointment request and confirmation flow', 'Staff schedule overview', 'Client FAQ and visit information']
    },
    {
      _id: 'northstar-retail-operations',
      slug: 'northstar-retail-operations',
      title: 'Northstar Retail Operations Portal',
      image: portfolioRetailImage,
      imageAlt: 'Chic modern boutique retail storefront with curated product displays',
      service: 'Concept showcase · Retail',
      summary: 'A practical digital storefront concept connecting product discovery with day-to-day store operations.',
      challenge: 'A small retailer needed customers to find products and store information easily, while staff needed a clearer view of product availability and incoming requests.',
      approach: 'The concept brings searchable product collections, store information, and an internal stock-and-request overview into one connected experience.',
      deliverables: ['Responsive product catalog', 'Product availability indicators', 'Customer inquiry flow', 'Staff stock and request dashboard']
    },
    {
      _id: 'gather-grain-hospitality',
      slug: 'gather-grain-hospitality',
      title: 'Gather & Grain Restaurant Website',
      image: portfolioHospitalityImage,
      imageAlt: 'Atmospheric dining room interior of an artisanal farm-to-table restaurant',
      service: 'Concept showcase · Hospitality',
      summary: 'A welcoming restaurant website concept that makes menus, visits, and reservation requests easy to explore.',
      challenge: 'Guests needed current menu and location details, while the restaurant wanted a simple way to receive table and group-event inquiries.',
      approach: 'The concept presents the food and atmosphere first, then guides guests to clear reservation, location, and event-request actions.',
      deliverables: ['Restaurant landing page', 'Structured menu and dietary notes', 'Reservation request form', 'Group dining inquiry workflow']
    },
    {
      _id: 'clearpath-learning-hub',
      slug: 'clearpath-learning-hub',
      title: 'ClearPath Learning Hub',
      image: portfolioLearningImage,
      imageAlt: 'Focused team of students and professionals learning together on laptops',
      service: 'Concept showcase · Education',
      summary: 'An organized learning portal concept for a training provider offering self-paced business courses.',
      challenge: 'Learners needed a consistent place to find lessons and track progress, while course administrators needed to keep learning materials organized.',
      approach: 'The concept combines a course library, lesson pages, and a simple progress view with a separate content-management workflow.',
      deliverables: ['Course catalog and lesson pages', 'Learner progress dashboard', 'Course enrollment flow', 'Administrator content workspace']
    },
    {
      _id: 'workclub-space-booking',
      slug: 'workclub-space-booking',
      title: 'Workclub Workspace Booking Platform',
      image: portfolioCoworkingImage,
      imageAlt: 'Spacious modern architectural coworking space with natural light and ergonomic desks',
      service: 'Concept showcase · Coworking',
      summary: 'A flexible booking experience concept for shared offices, meeting rooms, and day passes.',
      challenge: 'Members and visitors needed a quick way to compare workspace options and request a suitable time without relying on back-and-forth messages.',
      approach: 'The concept organizes spaces and amenities, presents availability clearly, and gives staff one schedule for reviewing reservations.',
      deliverables: ['Workspace and amenity directory', 'Availability and booking flow', 'Member inquiry form', 'Staff reservation calendar']
    }
  ],
  blog: [
    {
      _id: 'practical-crm-setup',
      slug: 'practical-crm-setup',
      title: 'A Practical CRM Setup for a Growing Service Business',
      image: blogCrmImage,
      imageAlt: 'Collaborative business team in modern office planning CRM workflow and lead pipeline',
      excerpt: 'Start with a small set of useful stages, clear ownership, and follow-up habits your whole team can maintain.',
      category: 'Business systems',
      authorId: { name: 'NovaBusiness Team' },
      publishedAt: '2026-11-17',
      tags: ['CRM', 'lead management', 'workflow'],
      readTime: '5 min read',
      sections: [
        {
          heading: 'Map the work before choosing fields',
          paragraphs: [
            'Write down what happens from the first inquiry to a completed engagement. A simple service-business pipeline might include New inquiry, Contacted, Qualified, Proposal sent, Won, and Closed.',
            'Keep the first version focused. Add a field only when the team knows who will maintain it and how it will help with a real decision.'
          ]
        },
        {
          heading: 'Make ownership and next steps visible',
          paragraphs: [
            'Every open lead should have one person responsible and a specific next action. A due date and a short activity note are often more useful than a long list of optional fields.',
            'Review overdue follow-ups together each week. That shared habit helps the CRM stay accurate and makes it easier to spot where prospects need support.'
          ]
        },
        {
          heading: 'Improve the system gradually',
          paragraphs: [
            'After a few weeks, look for repeated delays, missing information, or stages that nobody uses. Adjust the process based on those patterns rather than adding complexity up front.'
          ]
        }
      ]
    },
    {
      _id: 'website-inquiry-conversion',
      slug: 'website-inquiry-conversion',
      title: 'How to Build a Website That Turns Visits into Inquiries',
      image: blogWebsiteImage,
      imageAlt: 'Modern laptop displaying website UI analytics, performance charts, and conversion strategy',
      excerpt: 'Help the right visitors understand your offer, trust your business, and take one clear next step.',
      category: 'Website strategy',
      authorId: { name: 'NovaBusiness Team' },
      publishedAt: '2026-11-10',
      tags: ['website', 'conversion', 'content'],
      readTime: '4 min read',
      sections: [
        {
          heading: 'Be specific about who you help',
          paragraphs: [
            'A strong opening explains the audience, the problem you solve, and the outcome you help them work toward. Clear language gives visitors a reason to keep reading.',
            'Organize services around customer needs. Use plain descriptions, practical examples, and answers to the questions people ask before they get in touch.'
          ]
        },
        {
          heading: 'Build trust before asking for action',
          paragraphs: [
            'Show your process, introduce the people behind the work, and explain what happens after someone submits a form. Relevant proof and transparent expectations reduce uncertainty.',
            'Keep the inquiry form focused on the details your team needs to respond. Long forms create friction; a useful confirmation message sets expectations for what happens next.'
          ]
        },
        {
          heading: 'Measure quality, not just clicks',
          paragraphs: [
            'Track completed inquiries and the share that match your services, not only page views or button clicks. Review those outcomes regularly and improve the pages that matter most.'
          ]
        }
      ]
    },
    {
      _id: 'reduce-booking-no-shows',
      slug: 'reduce-booking-no-shows',
      title: 'A Simple Booking Workflow That Helps Reduce No-Shows',
      image: blogBookingImage,
      imageAlt: 'Minimalist desk with calendar schedule planner, coffee, and appointment notes',
      excerpt: 'Make booking details clear, confirmations dependable, and rescheduling straightforward for customers.',
      category: 'Operations',
      authorId: { name: 'NovaBusiness Team' },
      publishedAt: '2026-11-03',
      tags: ['appointments', 'customer experience', 'operations'],
      readTime: '4 min read',
      sections: [
        {
          heading: 'Set clear expectations at booking',
          paragraphs: [
            'Let customers know how long the appointment will take, what they should prepare, and whether it will happen in person or online. Include the business contact details they may need.',
            'Offer only time slots the team can reliably support. A smaller, accurate schedule is better than a long list of unavailable or out-of-date times.'
          ]
        },
        {
          heading: 'Confirm and remind thoughtfully',
          paragraphs: [
            'Send a confirmation with the selected service, date, time, and any preparation notes. A reminder before the appointment gives customers a timely chance to confirm or reschedule.',
            'Keep the message concise and make the next action obvious. Avoid sending reminders so frequently that they become noise.'
          ]
        },
        {
          heading: 'Make changes easy to manage',
          paragraphs: [
            'Provide a clear way to request a change and make sure staff can see updates in one shared schedule. Review missed appointments and customer feedback periodically to find preventable friction.'
          ]
        }
      ]
    }
  ]
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
      aria-hidden="true"
    />
  );
}

function ScrollReveals({ pathname }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !('IntersectionObserver' in window)) return undefined;

    const targets = document.querySelectorAll([
      '.site-header',
      '.hero-section',
      '.platform-strip',
      '.section-block',
      '.section-header',
      '.about-banner-inner',
      '.about-proof',
      '.about-overview',
      '.about-team-strip',
      '.about-capabilities',
      '.about-cta',
      '.service-detail-hero',
      '.blog-hero',
      '.blog-controls',
      '.blog-results',
      '.dashboard-welcome',
      '.dashboard-overview-grid > *',
      '.dashboard-content-grid > *',
      '.contact-grid > *',
      '.booking-grid > *',
      '.pricing-grid > *',
      '.service-grid > *',
      '.testimonial-grid > *',
      '.process-step',
      '.capability-item',
      '.faq-item',
      '.page-shell > .card',
      '.article-image',
      '.article-content > section',
      '.article-page > h1',
      '.article-page > .article-meta',
      '.article-page > .article-lead',
      '.auth-card',
      '.auth-shell > .section-header',
      '.legal-card',
      '.not-found-page > *',
      '.site-footer'
    ].join(','));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((target) => {
      if (target.closest('.portfolio-card-reveal')) return;

      const isCard = target.matches('.card, .process-step, .capability-item, .faq-item, .dashboard-stat');
      target.classList.add(isCard ? 'motion-card' : 'motion-reveal');

      const siblingIndex = Array.from(target.parentElement.children).indexOf(target);
      target.style.setProperty('--scroll-delay', `${Math.min(siblingIndex, 4) * 80}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname, shouldReduceMotion]);

  return null;
}

function MotionPageRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="route-motion-shell"
        key={location.pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollReveals pathname={location.pathname} />
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function getPublicItems(type) {
  return { items: publicContent[type] || [], error: '', loading: false };
}

function FeaturedProjectsSection() {
  const { items, error, loading } = getPublicItems('portfolio');
  return (
    <section className="shell section-block">
      <SectionHeader eyebrow="Featured work" title="Business-focused concept projects" text="Explore sample digital systems designed around common business needs." />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published projects…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No public case studies have been published yet.</p> : null}
      {items.length ? (
        <div className="portfolio-grid">
          {items.slice(0, 3).map((item) => (
            <article key={item._id} className="card project-card">
              <img className="portfolio-image" src={item.image} alt={item.imageAlt} loading="lazy" />
              <div className="project-badge">{item.service || 'NovaBusiness project'}</div>
              <h3>{item.title}</h3>
              <p>{item.summary || 'A completed project delivered by the NovaBusiness team.'}</p>
              <Link to={`/portfolio/${item.slug}`}>View project <ArrowRight size={18} /></Link>
            </article>
          ))}
        </div>
      ) : null}
      {items.length > 3 ? <Link to="/portfolio" className="about-link">View all projects <ArrowRight size={17} /></Link> : null}
    </section>
  );
}

function PortfolioPage() {
  const { items, error, loading } = getPublicItems('portfolio');
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="shell page-shell portfolio-page">
      <SectionHeader eyebrow="Portfolio" title="Business-focused concept projects" text="Illustrative showcases of websites, lead workflows, bookings, and client experiences. These are sample concepts, not claims about completed client engagements." />
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published projects…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No public projects have been published yet.</p> : null}
      {items.length ? (
        <div className="portfolio-grid">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              className="portfolio-card-reveal"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30, rotateX: 7 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : (index % 3) * 0.08, ease: 'easeOut' }}
            >
              <article className="card project-card portfolio-project-card">
                <img className="portfolio-image" src={item.image} alt={item.imageAlt} loading="lazy" />
                <div className="project-badge">{item.service || 'NovaBusiness project'}</div>
                <h3>{item.title}</h3>
                <p>{item.summary || 'Completed project delivered by the NovaBusiness team.'}</p>
                <Link to={`/portfolio/${item.slug}`}>View project <ArrowRight size={18} /></Link>
              </article>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = publicContent.portfolio.find((item) => item.slug === slug);

  if (!project) return <NotFoundPage />;

  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="Concept portfolio" title={project.title} text={project.summary} />
      <article className="card project-detail">
        <img className="project-detail-image" src={project.image} alt={project.imageAlt} />
        <p className="project-badge">{project.service}</p>
        <h2>Challenge</h2>
        <p>{project.challenge}</p>
        <h2>Approach</h2>
        <p>{project.approach}</p>
        <h2>Concept deliverables</h2>
        <ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="project-disclaimer">This is an illustrative concept showcase, not a claim about a completed client engagement.</p>
        <Link to="/portfolio" className="about-link">Back to portfolio <ArrowRight size={17} /></Link>
      </article>
    </div>
  );
}

function FeaturedTestimonialsSection() {
  const { items, error, loading } = getPublicItems();
  return (
    <section className="shell section-block alt-section">
      <SectionHeader eyebrow="Client feedback" title="Feedback shared by our clients" />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading approved reviews…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No approved client reviews have been published yet.</p> : null}
      {items.length ? (
        <div className="testimonial-grid">
          {items.slice(0, 3).map((item) => (
            <article key={item._id} className="card testimonial-card">
              <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <p>{`“${item.review}”`}</p>
              <div className="person-row">
                <div className="avatar">{item.customerName.charAt(0)}</div>
                <div><strong>{item.customerName}</strong><span>Verified client</span></div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function LatestArticlesSection() {
  const { items, error, loading } = getPublicItems('blog');
  return (
    <section className="shell section-block alt-section">
      <SectionHeader eyebrow="Insights" title="Latest articles from the NovaBusiness team" />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published articles…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No published articles yet.</p> : null}
      {items.length ? (
        <div className="blog-grid">
          {items.slice(0, 3).map((post) => (
            <article key={post._id} className="card blog-card">
              <img className="blog-image" src={post.image} alt={post.imageAlt} loading="lazy" />
              <span>{post.category || 'Insights'}</span>
              <h3>{post.title}</h3>
              <div className="blog-meta">
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recently published'}</span>
                <Link to={`/blog/${post.slug}`}>Read article <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function getServiceIcon(title) {
  const name = title.toLowerCase();
  if (name.includes('crm') || name.includes('analytics')) return BarChart3;
  if (name.includes('content') || name.includes('seo')) return FileText;
  if (name.includes('booking') || name.includes('appointment')) return CalendarDays;
  if (name.includes('portal') || name.includes('client')) return Users;
  return Monitor;
}

function ServiceCard({ service }) {
  const Icon = getServiceIcon(service.title);
  return (
    <article className="card service-card">
      {service.image ? <img src={service.image} alt={service.imageAlt || ''} className="service-image" loading="lazy" /> : <div className="icon-wrap"><Icon size={22} /></div>}
      <h3>{service.title}</h3>
      <p>{service.shortDescription || service.description}</p>
      {service.category ? <span className="project-badge">{service.category}</span> : null}
      <Link to={`/services/${service.slug}`}>Learn more <ChevronRight size={16} /></Link>
    </article>
  );
}

function FeaturedServicesSection() {
  const { items, error, loading } = getPublicItems('services');
  return (
    <section className="shell section-block">
      <SectionHeader
        eyebrow="What we deliver"
        title="Digital services configured for your business"
        text="Practical digital services to help your business attract customers, organize work, and deliver a smoother experience."
      />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published services…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No services have been published yet.</p> : null}
      {items.length ? <div className="service-grid">{items.slice(0, 4).map((service) => <ServiceCard key={service._id} service={service} />)}</div> : null}
    </section>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-topbar">
        <div className="shell topbar-inner">
          <span>Digital systems for growing businesses</span>
          <Link to="/contact">Talk to our team <ArrowRight size={14} /></Link>
        </div>
      </div>
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="NovaBusiness home">
          <img className="brand-logo" src={logo} alt="NovaBusiness" />
        </Link>
        <nav className={`main-nav ${menuOpen ? 'menu-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Link to="/booking" className="btn btn-ghost">Book a demo</Link>
          <Link to="/auth" className="btn btn-primary">Get started</Link>
        </div>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <img className="brand-logo" src={logo} alt="NovaBusiness" />
          </Link>
          <p>
            Full-stack business platform for websites, CRM operations, CMS publishing, booking systems and client success.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/auth">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms & conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 NovaBusiness. Built for high-velocity teams.</span>
        <Link to="/contact">Contact NovaBusiness</Link>
      </div>
    </footer>
  );
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const artRotateX = useTransform(scrollY, [0, 320, 720], shouldReduceMotion ? [0, 0, 0] : [-7, 0, 7]);
  const artRotateY = useTransform(scrollY, [0, 320, 720], shouldReduceMotion ? [0, 0, 0] : [13, 0, -13]);
  const artY = useTransform(scrollY, [0, 320, 720], shouldReduceMotion ? [0, 0, 0] : [24, 0, -24]);
  const artScale = useTransform(scrollY, [0, 320, 720], shouldReduceMotion ? [1, 1, 1] : [0.95, 1, 0.95]);

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="shell hero-grid hero-home">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy"
          >
            <span className="eyebrow hero-eyebrow">A BETTER WAY TO RUN YOUR BUSINESS</span>
            <h1>
              Your business, <span className="text-highlight">beautifully</span> connected.
            </h1>
            <p>
              Websites, leads, bookings, content and client work—brought together in one clear, modern business platform.
            </p>
            <div className="cta-row">
              <Link to="/contact" className="btn btn-primary">Talk to our team <ArrowRight size={17} /></Link>
              <Link to="/services" className="btn btn-secondary">Explore the platform</Link>
            </div>
            <ul className="trust-list">
              <li><CheckCircle2 size={16} /> One connected workspace</li>
              <li><CheckCircle2 size={16} /> Built around your team</li>
            </ul>
          </motion.div>

          <motion.div
            className="home-art"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="home-art-backdrop" />
            <motion.div
              className="home-art-window"
              style={{ rotateX: artRotateX, rotateY: artRotateY, y: artY, scale: artScale }}
            >
              <div className="home-art-toolbar">
                <span /><span /><span />
                <b>NovaBusiness workspace</b>
              </div>
              <img
                src={heroWorkspaceImage}
                alt="NovaBusiness platform workspace and live analytics dashboard"
                className="home-art-image"
              />
            </motion.div>
            <div className="home-art-note note-leads"><Users size={17} /><span>Leads organized</span></div>
            <div className="home-art-note note-bookings"><CalendarDays size={17} /><span>Bookings in sync</span></div>
          </motion.div>
        </div>
      </section>

      <section className="shell platform-strip" aria-label="Platform capabilities">
        <span>Website</span>
        <span>CRM</span>
        <span>Content & SEO</span>
        <span>Appointments</span>
        <span>Client portal</span>
      </section>

      <FeaturedServicesSection />

      <section className="shell section-block alt-section">
        <SectionHeader
          eyebrow="How it works"
          title="A simple system for strategy, design and execution"
        />

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step}>
              <span className="step-index">0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProjectsSection />
      <FeaturedTestimonialsSection />

      <section className="shell section-block">
        <SectionHeader
          eyebrow="Simple pricing"
          title="Choose the level of support and scale you need"
        />

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className={`card pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured ? <span className="plan-badge">Most popular</span> : null}
              <h3>{plan.name}</h3>
              <div className="price-row"><strong>{plan.price}</strong></div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><CheckCircle2 size={14} /> {feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary">Get started</Link>
            </article>
          ))}
        </div>
      </section>

      <LatestArticlesSection />

      <section className="shell section-block faq-section">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions teams usually ask before they commit"
        />

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={item} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{item}</span>
                <ChevronRight size={18} />
              </button>
              <div className="faq-answer">
                <p>
                  NovaBusiness includes the full website, modular dashboard system, CRM, booking engines, and automation layers needed for strong operational control and consistent customer experience.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell cta-banner">
        <div>
          <span className="eyebrow">Ready to design your next growth engine?</span>
          <h3>Launch a platform that looks premium and performs like a business machine.</h3>
        </div>
        <Link to="/booking" className="btn btn-primary">Book an appointment</Link>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-banner">
        <div className="shell about-banner-inner">
          <div>
            <span className="about-kicker">NovaBusiness / Company</span>
            <h1>Company overview</h1>
          </div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>About us</span>
          </nav>
        </div>
      </section>

      <section className="shell about-content">
        <div className="about-proof">
          <div className="proof-intro">
            <span className="section-label">ABOUT NOVABUSINESS</span>
            <h2>One connected platform for your business to move forward.</h2>
          </div>
          <div className="proof-stat">
            <strong>CRM</strong>
            <span>Lead workflows</span>
          </div>
          <div className="proof-stat">
            <strong>CMS</strong>
            <span>Content management</span>
          </div>
          <div className="proof-stat">
            <strong>Portal</strong>
            <span>Client collaboration</span>
          </div>
        </div>

        <section className="about-overview">
          <div className="about-visual" aria-label="NovaBusiness platform dashboard illustration">
            <div className="about-visual-shape" />
            <div className="about-dashboard-window">
              <div className="window-bar"><span /><span /><span /><b>Business overview</b></div>
              <img
                src={aboutWorkspaceImage}
                alt="NovaBusiness business workspace and analytics"
                className="about-dashboard-image"
              />
            </div>
            <div className="about-float-card"><CheckCircle2 size={17} /><span>Everything connected</span></div>
          </div>
          <div className="about-copy">
            <span className="section-label">WHAT WE DO</span>
            <h2>Complete web and digital business solutions.</h2>
            <p>
              NovaBusiness brings your website, leads, content, appointments and client work together in one thoughtfully designed platform. We help teams replace scattered tools with clear workflows and a consistent customer experience.
            </p>
            <p>
              From a first inquiry to a project milestone, every interaction has a place. Your team can focus on doing great work while the platform keeps the details organized.
            </p>
            <Link to="/services" className="about-link">Explore our services <ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="about-team-strip">
          <div>
            <span className="section-label">BUILT AROUND YOUR TEAM</span>
            <h2>Clear roles. Shared progress. Better work together.</h2>
          </div>
          <p>
            Give administrators, managers, editors, employees and clients the right tools and access for their role—without losing sight of the bigger picture.
          </p>
          <div className="role-list">
            <span><Shield size={16} /> Role-based access</span>
            <span><Users size={16} /> Team workflows</span>
            <span><MessageSquareText size={16} /> Client collaboration</span>
          </div>
        </section>

        <section className="about-capabilities">
          <div className="capabilities-heading">
            <span className="section-label">ONE PLATFORM, CONNECTED</span>
            <h2>Everything your business needs to stay in motion.</h2>
          </div>
          <div className="capabilities-grid">
            {[
              { icon: Monitor, title: 'Web experiences', text: 'Responsive public pages designed to explain your value and turn visits into inquiries.' },
              { icon: Briefcase, title: 'Lead management', text: 'Keep customer details, follow-ups and pipeline activity organized for your team.' },
              { icon: FileText, title: 'Content & SEO', text: 'Manage services, articles and search metadata from a central content workspace.' },
              { icon: CalendarDays, title: 'Appointments & portal', text: 'Coordinate bookings and give clients a clear place to follow project progress.' }
            ].map(({ icon: Icon, title, text }, index) => (
              <article className="capability-item" key={title}>
                <span className="capability-number">0{index + 1}</span>
                <div className="capability-icon"><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to="/services" aria-label={`Learn about ${title}`}><ArrowRight size={18} /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div>
            <span className="section-label">LET’S BUILD SOMETHING BETTER</span>
            <h2>Ready to bring your business into one connected workspace?</h2>
          </div>
          <Link to="/contact" className="btn btn-primary">Talk to our team <ArrowRight size={17} /></Link>
        </section>
      </section>
    </main>
  );
}

function ServicesPage() {
  const { items, error, loading } = getPublicItems('services');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(items.map((service) => service.category).filter(Boolean))];
  const filteredServices = useMemo(
    () => activeCategory === 'All' ? items : items.filter((service) => service.category === activeCategory),
    [activeCategory, items]
  );

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Services"
        title="The right digital tools for the way you work"
        text="Explore practical services for your website, customer relationships, operations, and growth."
      />

      <div className="filter-row">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={category === activeCategory ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published services…</p> : null}
      {!loading && !error && !filteredServices.length ? <p className="dashboard-empty">No services in this category have been published yet.</p> : null}
      {filteredServices.length ? <div className="service-grid large-grid">{filteredServices.map((service) => <ServiceCard key={service._id} service={service} />)}</div> : null}
    </div>
  );
}

function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = publicContent.services.find((item) => item.slug === slug);

  if (!service) return <NotFoundPage />;

  return (
    <div className="shell page-shell service-detail-page">
      <Link to="/services" className="about-link">Back to services <ArrowRight size={17} /></Link>
      <section className="service-detail-hero">
        <div className="service-detail-copy">
          <span className="project-badge">{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <Link to="/contact" className="btn btn-primary">Discuss this service <ArrowRight size={17} /></Link>
        </div>
        <img src={service.image} alt={service.imageAlt} />
      </section>
      <div className="service-detail-grid">
        <section className="card service-detail-includes">
          <span className="eyebrow">What this can include</span>
          <h2>A practical scope, shaped around your team</h2>
          <ul>
            {service.deliverables.map((item) => <li key={item}><CheckCircle2 size={17} /> {item}</li>)}
          </ul>
        </section>
        <aside className="service-detail-audience">
          <span className="eyebrow">A good fit for</span>
          <p>{service.idealFor}</p>
          <Link to="/contact" className="about-link">Tell us what you need <ArrowRight size={17} /></Link>
        </aside>
      </div>
    </div>
  );
}

function BlogPage() {
  const { items, error, loading } = getPublicItems('blog');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))];
  const filteredItems = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const query = search.trim().toLowerCase();
    return matchesCategory && (!query || `${item.title} ${item.excerpt} ${(item.tags || []).join(' ')}`.toLowerCase().includes(query));
  });
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pageItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="shell page-shell blog-page">
      <section className="blog-hero" aria-labelledby="blog-page-title">
        <div className="blog-hero-copy">
          <span className="blog-hero-eyebrow"><Sparkles size={14} /> NovaBusiness journal</span>
          <h1 id="blog-page-title">Clear ideas for a business in motion.</h1>
          <p>Practical guidance for better websites, smoother operations, and stronger customer relationships.</p>
          <div className="blog-hero-points">
            <span><CheckCircle2 size={16} /> Useful, actionable reads</span>
            <span><CheckCircle2 size={16} /> Built for growing teams</span>
          </div>
        </div>
        <div className="blog-hero-visual" aria-hidden="true">
          <div className="blog-hero-orb" />
          <img className="blog-hero-main" src={blogWebsiteImage} alt="" />
          <img className="blog-hero-floating" src={blogCrmImage} alt="" />
          <div className="blog-hero-note"><Sparkles size={16} /> Fresh ideas. Practical moves.</div>
        </div>
      </section>

      <div className="blog-controls">
        <div className="blog-search-line">
          <label className="blog-search">
            <Search size={18} />
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search CRM, websites, or growth" />
          </label>
          <span className="blog-result-count">{filteredItems.length} {filteredItems.length === 1 ? 'article' : 'articles'}</span>
        </div>
        <div className="filter-row">
          {categories.map((item) => (
            <button type="button" className={`filter-chip ${category === item ? 'active' : ''}`} key={item} onClick={() => { setCategory(item); setPage(1); }}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <section className="blog-results" aria-labelledby="blog-results-title">
        <div className="blog-results-heading">
          <div>
            <span className="blog-section-kicker">Explore the journal</span>
            <h2 id="blog-results-title">Latest guides &amp; insights</h2>
          </div>
          <p>Ideas to help you make your next business move with confidence.</p>
        </div>
        {error ? <p className="form-message" role="status">{error}</p> : null}
        {loading ? <p className="dashboard-empty" role="status">Loading articles…</p> : null}
        {!loading && !error && !pageItems.length ? <p className="dashboard-empty">No published articles match your search.</p> : null}
        <div className="blog-grid large-grid">
          {pageItems.map((post) => (
            <article className="card blog-card full-size" key={post._id}>
              <img className="blog-image" src={post.image} alt={post.imageAlt} loading="lazy" />
              <span>{post.category || 'Insights'}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-meta">
                <span>{post.authorId?.name || 'NovaBusiness'} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
                <Link to={`/blog/${post.slug}`}>Read more <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
        {pageCount > 1 ? (
          <div className="pagination">
            <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {pageCount}</span>
            <button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function BlogDetailsPage() {
  const { slug } = useParams();
  const post = publicContent.blog.find((item) => item.slug === slug);

  if (!post) return <NotFoundPage />;

  return (
    <article className="shell page-shell article-page">
      <Link to="/blog" className="about-link">Back to insights <ArrowRight size={17} /></Link>
      <img className="article-image" src={post.image} alt={post.imageAlt} />
      <h1>{post.title}</h1>
      <div className="article-meta">
        <span>{post.authorId.name}</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        <span>{post.readTime}</span>
      </div>
      <p className="article-lead">{post.excerpt}</p>
      <div className="article-content">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </div>
    </article>
  );
}

function PricingPage() {
  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Pricing"
        title="Flexible packages for modern teams"
      />
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className={`card pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured ? <span className="plan-badge">Most popular</span> : null}
            <h3>{plan.name}</h3>
            <div className="price-row"><strong>{plan.price}</strong></div>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}><CheckCircle2 size={14} /> {feature}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">Choose {plan.name}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Frontend-only version: this inquiry was not sent. Connect a backend to receive submissions.');
  }

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Contact us"
        title="Tell us what you want the next version of your business to look and feel like"
      />
      <div className="contact-grid">
        <div className="card contact-card">
          <div className="contact-item"><Mail size={18} /><div><strong>Send an inquiry</strong><span>Use the secure form to reach our team.</span></div></div>
          <div className="contact-item"><Phone size={18} /><div><strong>Project consultation</strong><span>Request a call through the booking form.</span></div></div>
          <div className="contact-item"><Globe size={18} /><div><strong>Remote-ready</strong><span>Discuss your project from anywhere.</span></div></div>
        </div>
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="field-row two-up">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
          </div>
          <div className="field-row two-up">
            <label>
              <span>Company</span>
              <input type="text" name="company" placeholder="Company name" autoComplete="organization" />
            </label>
            <label>
              <span>Service</span>
              <select name="service" defaultValue="">
                <option value="" disabled>Select service</option>
                <option>Website design</option>
                <option>CRM & dashboards</option>
                <option>Booking portal</option>
                <option>SEO & content</option>
              </select>
            </label>
          </div>
          <label>
            <span>Project details</span>
            <textarea name="message" rows="5" placeholder="Tell us about your requirements, goals and current challenges." required />
          </label>
          <label>
            <span>Phone (optional)</span>
            <input type="tel" name="phone" placeholder="Your phone number" autoComplete="tel" />
          </label>
          {message ? <p className="form-message" role="status">{message}</p> : null}
          <button type="submit" className="btn btn-primary full-width">Send inquiry</button>
        </form>
      </div>
    </div>
  );
}

function BookingPage() {
  const [service, setService] = useState('Website design');
  const [date, setDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 2);
    return `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
  });
  const [time, setTime] = useState('10:30 AM');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Frontend-only version: this booking was not sent. Connect a backend to receive booking requests.');
  }

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Book an appointment"
        title="Choose a service and schedule a consultation"
      />
      <div className="booking-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <label>
            <span>Your name</span>
            <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>Phone (optional)</span>
            <input type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" />
          </label>
          <label>
            <span>Service</span>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option>Website design</option>
              <option>CRM & dashboards</option>
              <option>Booking portal</option>
              <option>SEO & content</option>
            </select>
          </label>
          <label>
            <span>Preferred date</span>
            <input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            <span>Preferred time</span>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option>10:30 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:30 PM</option>
            </select>
          </label>
          {message ? <p className="form-message" role="status">{message}</p> : null}
          <button type="submit" className="btn btn-primary full-width">Confirm booking</button>
        </form>

        <div className="card booking-summary">
          <h3>Consultation summary</h3>
          <ul>
            <li><span>Service</span><strong>{service}</strong></li>
            <li><span>Date</span><strong>{date}</strong></li>
            <li><span>Time</span><strong>{time}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Sign-in is unavailable in this frontend-only version. Connect a backend to authenticate users.');
  }

  return (
    <div className="shell auth-shell">
      <div className="auth-card">
        <div className="auth-panel brand-panel">
          <span className="eyebrow">Welcome</span>
          <h2>Manage your business from one place.</h2>
          <p>This frontend preview does not include user authentication.</p>
          <ul>
            <li><Shield size={18} /> Secure access requires a backend</li>
            <li><Users size={18} /> Team features are preview-only</li>
            <li><MessageSquareText size={18} /> No data is sent from this page</li>
          </ul>
        </div>
        <div className="auth-panel form-panel">
          <div className="auth-toggle">
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
            <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <label>
                <span>Full name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Jane Doe" required />
              </label>
            ) : null}
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={mode === 'register' ? 12 : 1}
                placeholder={mode === 'register' ? 'At least 12 characters' : 'Your password'}
                required
              />
            </label>
            {mode === 'register' ? <p className="auth-note">New accounts are created with customer access. An administrator can assign staff roles.</p> : null}
            {message ? <p className="form-message" role="alert">{message}</p> : null}
            <button type="submit" className="btn btn-primary full-width">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartMetric, setChartMetric] = useState('revenue');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const stats = [
    { label: 'Services', value: publicContent.services.length, detail: 'Active client solutions', icon: Briefcase, to: '/services', growth: '+2 this quarter' },
    { label: 'Portfolio concepts', value: publicContent.portfolio.length, detail: 'Live client showcases', icon: Monitor, to: '/portfolio', growth: '+100% verified' },
    { label: 'Articles', value: publicContent.blog.length, detail: 'Strategic business guides', icon: FileText, to: '/blog', growth: '4.8k reads' }
  ];

  const kpis = [
    { label: 'Total CRM Leads', value: '1,284', change: '+18.4%', trend: 'up', detail: 'vs. last month', icon: Users, accent: 'blue' },
    { label: 'Pipeline Value', value: '$84,650', change: '+22.8%', trend: 'up', detail: 'active proposals', icon: TrendingUp, accent: 'teal' },
    { label: 'Appointments Booked', value: '94', change: '+8 new', trend: 'up', detail: 'this week', icon: CalendarDays, accent: 'indigo' },
    { label: 'Conversion Rate', value: '28.4%', change: '+4.2%', trend: 'up', detail: 'visitor to inquiry', icon: Target, accent: 'amber' }
  ];

  const chartData = [
    { month: 'Jan', revenue: 34000, leads: 52 },
    { month: 'Feb', revenue: 42000, leads: 64 },
    { month: 'Mar', revenue: 49000, leads: 76 },
    { month: 'Apr', revenue: 53000, leads: 82 },
    { month: 'May', revenue: 61000, leads: 95 },
    { month: 'Jun', revenue: 58000, leads: 88 },
    { month: 'Jul', revenue: 67000, leads: 104 },
    { month: 'Aug', revenue: 73000, leads: 116 },
    { month: 'Sep', revenue: 78000, leads: 124 },
    { month: 'Oct', revenue: 84200, leads: 135 },
    { month: 'Nov', revenue: 89650, leads: 142 },
    { month: 'Dec', revenue: 96000, leads: 155 }
  ];

  const crmLeads = [
    { id: 'LD-101', name: 'Alex Vance', company: 'Summit Advisory Group', service: 'Client Portal & Consulting', value: '$12,500', status: 'Won', date: 'Today, 11:20 AM', avatar: 'AV' },
    { id: 'LD-102', name: 'Sarah Jenkins', company: 'Luma Wellness Studio', service: 'Online Booking & Scheduling', value: '$4,800', status: 'Qualified', date: 'Yesterday, 3:45 PM', avatar: 'SJ' },
    { id: 'LD-103', name: 'Marcus Cole', company: 'Greenway Home Services', service: 'Local Growth Platform & CRM', value: '$8,200', status: 'In Discussion', date: 'Nov 17, 10:15 AM', avatar: 'MC' },
    { id: 'LD-104', name: 'Elena Rostova', company: 'Northstar Retail Co.', service: 'E-commerce & Store Operations', value: '$9,400', status: 'Proposal Sent', date: 'Nov 16, 2:30 PM', avatar: 'ER' },
    { id: 'LD-105', name: 'David Kim', company: 'Gather & Grain Hospitality', service: 'Restaurant Experience & Booking', value: '$6,500', status: 'Won', date: 'Nov 15, 5:10 PM', avatar: 'DK' },
    { id: 'LD-106', name: 'Amara Patel', company: 'ClearPath Learning Hub', service: 'Education Portal & LMS', value: '$14,000', status: 'In Discussion', date: 'Nov 14, 1:20 PM', avatar: 'AP' },
    { id: 'LD-107', name: 'Julian Thorne', company: 'Workclub Spaces', service: 'Coworking Booking Engine', value: '$11,200', status: 'New', date: 'Nov 13, 9:00 AM', avatar: 'JT' }
  ];

  const upcomingAppointments = [
    { id: 'APT-01', client: 'Alex Vance', company: 'Summit Advisory', title: 'Executive Portal Strategy Kickoff', time: 'Today · 2:00 PM - 3:00 PM', type: 'Google Meet', status: 'Confirmed', avatar: 'AV' },
    { id: 'APT-02', client: 'Sarah Jenkins', company: 'Luma Wellness', title: 'Booking Engine & Calendar Setup', time: 'Tomorrow · 10:30 AM - 11:15 AM', type: 'Platform Walkthrough', status: 'Confirmed', avatar: 'SJ' },
    { id: 'APT-03', client: 'Marcus Cole', company: 'Greenway Services', title: 'Lead Pipeline Architecture Review', time: 'Friday · 3:00 PM - 3:45 PM', type: 'Technical Review', status: 'Pending Approval', avatar: 'MC' },
    { id: 'APT-04', client: 'Elena Rostova', company: 'Northstar Retail', title: 'Inventory Sync & Catalog Review', time: 'Monday · 11:00 AM - 12:00 PM', type: 'Strategy Call', status: 'Confirmed', avatar: 'ER' }
  ];

  const recentActivities = [
    { title: 'New enterprise inquiry received', desc: 'Alex Vance from Summit Advisory submitted portal scope ($12,500)', time: '14m ago', icon: DollarSign, color: '#10b981' },
    { title: 'Client consultation confirmed', desc: 'Sarah Jenkins booked a strategy session for Tomorrow at 10:30 AM', time: '48m ago', icon: CalendarDays, color: '#3b82f6' },
    { title: 'Portfolio concept updated', desc: 'New verified case study live: Greenway Home Services Platform', time: '2h ago', icon: Globe, color: '#8b5cf6' },
    { title: 'SEO audit completed', desc: 'All 6 service pages scored 98+ on meta tags, schema, and mobile performance', time: '5h ago', icon: ShieldCheck, color: '#16b8a6' }
  ];

  const filteredLeads = useMemo(() => {
    return crmLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.service.toLowerCase().includes(leadSearch.toLowerCase());
      const matchesFilter = leadStatusFilter === 'All' || lead.status === leadStatusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [crmLeads, leadSearch, leadStatusFilter]);

  // Chart coordinate calculation for smooth SVG visualization
  const maxVal = chartMetric === 'revenue' ? 100000 : 160;
  const chartHeight = 160;
  const chartWidth = 520;
  const points = chartData.map((d, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth;
    const val = chartMetric === 'revenue' ? d.revenue : d.leads;
    const y = chartHeight - (val / maxVal) * (chartHeight - 30);
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="shell page-shell dashboard-page-pro">
      {/* Executive Command Header */}
      <section className="dash-hero">
        <div className="dash-hero-grid">
          <div className="dash-hero-content">
            <div className="dash-badge">
              <span className="live-dot" />
              <span>NovaBusiness Workspace · Live Enterprise Hub</span>
            </div>
            <h1>Executive Command Center</h1>
            <p>
              Real-time oversight for your website operations, sales CRM leads, scheduled client bookings, and published digital content.
            </p>
            <div className="dash-hero-actions">
              <Link to="/booking" className="btn btn-primary dash-btn-primary">
                Book a consultation <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="dash-btn-glass">
                Contact the team
              </Link>
              <button
                type="button"
                className="dash-btn-subtle"
                onClick={() => alert('Exporting platform report (CSV)...')}
                title="Download CSV overview"
              >
                <Download size={15} /> Export CSV
              </button>
            </div>
          </div>

          <div className="dash-hero-card">
            <div className="dash-hero-card-header">
              <span>Platform Health</span>
              <span className="pill-badge pill-green">Operational</span>
            </div>
            <div className="dash-hero-stat">
              <strong>$84,650</strong>
              <small>Active Pipeline Value</small>
            </div>
            <div className="dash-hero-metric-row">
              <div>
                <span>Win Rate</span>
                <strong>28.4%</strong>
              </div>
              <div>
                <span>Total Leads</span>
                <strong>1,284</strong>
              </div>
              <div>
                <span>System Uptime</span>
                <strong>99.98%</strong>
              </div>
            </div>
            <div className="dash-hero-progress-bar">
              <div className="dash-hero-progress-fill" style={{ width: '84%' }} />
            </div>
            <span className="dash-hero-note">84% of quarterly target achieved</span>
          </div>
        </div>
      </section>

      {/* KPI Stat Cards */}
      <section className="dash-kpis-grid" aria-label="Key Performance Indicators">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div className={`dash-kpi-card accent-${kpi.accent}`} key={kpi.label}>
              <div className="kpi-top">
                <span className="kpi-label">{kpi.label}</span>
                <span className={`kpi-icon-wrap bg-${kpi.accent}`}>
                  <Icon size={18} />
                </span>
              </div>
              <div className="kpi-body">
                <strong className="kpi-value">{kpi.value}</strong>
                <div className="kpi-change-row">
                  <span className="kpi-change positive">{kpi.change}</span>
                  <span className="kpi-detail">{kpi.detail}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Navigation Tabs */}
      <nav className="dash-tab-nav" aria-label="Dashboard sections">
        <button
          type="button"
          className={`dash-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} /> Overview & Analytics
        </button>
        <button
          type="button"
          className={`dash-tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <Users size={16} /> CRM Leads Pipeline <span className="tab-count">{crmLeads.length}</span>
        </button>
        <button
          type="button"
          className={`dash-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <CalendarDays size={16} /> Appointments <span className="tab-count">{upcomingAppointments.length}</span>
        </button>
        <button
          type="button"
          className={`dash-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <Briefcase size={16} /> CMS & Published Assets <span className="tab-count">16</span>
        </button>
      </nav>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="dash-tab-content">
          <div className="dash-analytics-split">
            {/* Visual Growth Chart Card */}
            <div className="dash-panel-card chart-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Performance Trends</span>
                  <h2>{chartMetric === 'revenue' ? 'Monthly Revenue Growth' : 'Inbound Leads Pipeline'}</h2>
                </div>
                <div className="chart-toggles">
                  <button
                    type="button"
                    className={`toggle-btn ${chartMetric === 'revenue' ? 'active' : ''}`}
                    onClick={() => setChartMetric('revenue')}
                  >
                    Revenue ($)
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${chartMetric === 'leads' ? 'active' : ''}`}
                    onClick={() => setChartMetric('leads')}
                  >
                    Leads (#)
                  </button>
                </div>
              </div>

              <div className="chart-meta-pills">
                <span className="meta-pill">
                  <strong>{chartMetric === 'revenue' ? '$89,650' : '142 Leads'}</strong> in Current Month
                </span>
                <span className="meta-pill positive">
                  <TrendingUp size={13} /> +18.4% annualized rate
                </span>
                <span className="meta-pill">Peak: Oct ($84.2k / 135 Leads)</span>
              </div>

              <div className="svg-chart-container">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 25}`} className="dash-svg-chart">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2={chartWidth} y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="130" x2={chartWidth} y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Area fill */}
                  <path d={areaD} fill="url(#chartGradient)" />
                  {/* Curve stroke */}
                  <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  {/* Data points */}
                  {points.map((pt, index) => (
                    <g key={pt.data.month} onMouseEnter={() => setHoveredMonth(pt.data)} onMouseLeave={() => setHoveredMonth(null)}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredMonth?.month === pt.data.month ? 6 : 3.5}
                        fill="#fff"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                      />
                      <text x={pt.x} y={chartHeight + 18} textAnchor="middle" fontSize="10.5" fill="#94a3b8">
                        {pt.data.month}
                      </text>
                    </g>
                  ))}
                </svg>

                {hoveredMonth && (
                  <div className="chart-tooltip-floating">
                    <strong>{hoveredMonth.month}</strong>: {chartMetric === 'revenue' ? `$${hoveredMonth.revenue.toLocaleString()}` : `${hoveredMonth.leads} Qualified Leads`}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & High-level summary */}
            <div className="dash-panel-card activity-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Real-Time Audit</span>
                  <h2>Recent Activity</h2>
                </div>
                <span className="live-pulse-badge">Live feed</span>
              </div>
              <ul className="activity-feed-list">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <li key={act.title} className="activity-item">
                      <span className="activity-icon-bubble" style={{ color: act.color, backgroundColor: `${act.color}15` }}>
                        <Icon size={16} />
                      </span>
                      <div className="activity-info">
                        <strong>{act.title}</strong>
                        <p>{act.desc}</p>
                        <time>{act.time}</time>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Quick CRM Preview & Appointments side by side */}
          <div className="dash-panels-two-col">
            {/* Recent Leads Preview */}
            <div className="dash-panel-card">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">CRM Pipeline</span>
                  <h2>Active Opportunities</h2>
                </div>
                <button type="button" className="btn-link" onClick={() => setActiveTab('leads')}>
                  View all leads <ArrowRight size={14} />
                </button>
              </div>
              <div className="mini-lead-list">
                {crmLeads.slice(0, 4).map((lead) => (
                  <div className="mini-lead-item" key={lead.id}>
                    <div className="lead-avatar">{lead.avatar}</div>
                    <div className="lead-details">
                      <strong>{lead.name}</strong>
                      <span>{lead.company} · {lead.service}</span>
                    </div>
                    <div className="lead-meta">
                      <span className="lead-val">{lead.value}</span>
                      <span className={`status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Upcoming Appointments Preview */}
            <div className="dash-panel-card">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Calendar & Bookings</span>
                  <h2>Upcoming Consultations</h2>
                </div>
                <button type="button" className="btn-link" onClick={() => setActiveTab('appointments')}>
                  Full calendar <ArrowRight size={14} />
                </button>
              </div>
              <div className="mini-appointment-list">
                {upcomingAppointments.slice(0, 3).map((apt) => (
                  <div className="mini-appointment-item" key={apt.id}>
                    <div className="appointment-date-badge">
                      <CalendarDays size={16} />
                    </div>
                    <div className="appointment-details">
                      <strong>{apt.company}</strong>
                      <span className="appointment-title">{apt.title}</span>
                      <span className="appointment-time"><Clock size={12} /> {apt.time}</span>
                    </div>
                    <Link to="/booking" className="btn-small-action">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FULL CRM LEADS PIPELINE */}
      {activeTab === 'leads' && (
        <div className="dash-tab-content">
          <div className="dash-panel-card full-table-card">
            <div className="table-toolbar">
              <div className="table-search-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search leads by client name, company, or service..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="table-search-input"
                />
              </div>

              <div className="filter-chips">
                {['All', 'Won', 'Qualified', 'In Discussion', 'Proposal Sent', 'New'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`filter-chip ${leadStatusFilter === status ? 'active' : ''}`}
                    onClick={() => setLeadStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="responsive-table-container">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Lead Contact</th>
                    <th>Requested Service</th>
                    <th>Pipeline Value</th>
                    <th>Status</th>
                    <th>Last Touchpoint</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="table-person">
                          <div className="lead-avatar">{lead.avatar}</div>
                          <div>
                            <strong>{lead.name}</strong>
                            <small>{lead.company}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="service-tag">{lead.service}</span>
                      </td>
                      <td>
                        <strong className="lead-val">{lead.value}</strong>
                      </td>
                      <td>
                        <span className={`status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">{lead.date}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <Link to="/contact" className="action-btn" title="Contact Lead">
                            <Mail size={14} />
                          </Link>
                          <Link to="/booking" className="action-btn" title="Schedule Appointment">
                            <CalendarDays size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-muted">
                        No leads match the query "{leadSearch}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UPCOMING APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="dash-tab-content">
          <div className="dash-panel-card">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Booking Management</span>
                <h2>Client Consultation Schedule</h2>
              </div>
              <Link to="/booking" className="btn btn-primary dash-btn-primary">
                + Schedule Consultation
              </Link>
            </div>

            <div className="appointments-grid-full">
              {upcomingAppointments.map((apt) => (
                <div className="appointment-card-full" key={apt.id}>
                  <div className="apt-card-top">
                    <span className="apt-company-tag">{apt.company}</span>
                    <span className={`status-badge status-${apt.status === 'Confirmed' ? 'won' : 'new'}`}>
                      {apt.status}
                    </span>
                  </div>
                  <h3>{apt.title}</h3>
                  <div className="apt-meta-row">
                    <span><Clock size={14} /> {apt.time}</span>
                    <span><Monitor size={14} /> {apt.type}</span>
                    <span><Users size={14} /> Client: {apt.client}</span>
                  </div>
                  <div className="apt-actions-row">
                    <button type="button" className="btn-apt-primary" onClick={() => alert(`Launching call for ${apt.company}`)}>
                      Launch Call
                    </button>
                    <Link to="/contact" className="btn-apt-secondary">
                      Reschedule
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CMS & PUBLISHED PLATFORM ASSETS */}
      {activeTab === 'content' && (
        <div className="dash-tab-content">
          {/* Services CMS Grid with Real Images */}
          <div className="dash-panel-card mb-6">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Live Solutions</span>
                <h2>Published Services ({publicContent.services.length})</h2>
              </div>
              <Link to="/services" className="btn-link">
                View public services <ArrowRight size={14} />
              </Link>
            </div>
            <div className="cms-assets-grid">
              {publicContent.services.map((svc) => (
                <div className="cms-asset-card" key={svc._id}>
                  <img src={svc.image} alt={svc.imageAlt} className="cms-asset-thumb" loading="lazy" />
                  <div className="cms-asset-content">
                    <span className="cms-asset-cat">{svc.category}</span>
                    <h4>{svc.title}</h4>
                    <p>{svc.shortDescription}</p>
                    <Link to={`/services/${svc.slug}`} className="cms-asset-link">
                      Manage service <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Case Studies Grid with Real Images */}
          <div className="dash-panel-card">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">Verified Showcases</span>
                <h2>Portfolio Concepts ({publicContent.portfolio.length})</h2>
              </div>
              <Link to="/portfolio" className="btn-link">
                View public portfolio <ArrowRight size={14} />
              </Link>
            </div>
            <div className="cms-assets-grid">
              {publicContent.portfolio.map((proj) => (
                <div className="cms-asset-card" key={proj._id}>
                  <img src={proj.image} alt={proj.imageAlt} className="cms-asset-thumb" loading="lazy" />
                  <div className="cms-asset-content">
                    <span className="cms-asset-cat">{proj.service}</span>
                    <h4>{proj.title}</h4>
                    <p>{proj.summary}</p>
                    <Link to={`/portfolio/${proj.slug}`} className="cms-asset-link">
                      Review showcase <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="dashboard-preview-note" role="note">
        NovaBusiness Control Hub preview mode. Real-time changes, submissions, and appointments persist in live MongoDB deployment.
      </p>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="shell page-shell legal-page">
      <SectionHeader eyebrow="Privacy information" title="How this frontend-only preview handles data" />
      <div className="card legal-card">
        <p>This frontend-only preview does not send form submissions or store customer records. Connect and configure a backend before collecting or processing personal information.</p>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="shell page-shell legal-page">
      <SectionHeader eyebrow="Terms & conditions" title="Service agreement and responsibilities" />
      <div className="card legal-card">
        <p>All deliverables, timelines and communications are governed by the agreed project scope and payment plan. Users are responsible for the information they provide, and NovaBusiness maintains a high standard of professional delivery, performance and support.</p>
      </div>
    </div>
  );
}

function FaqPage() {
  const [query, setQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(0);
  const filteredQuestions = faqItems.filter((question) => question.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="FAQ" title="Answers to common questions" text="Find quick guidance about the NovaBusiness platform and its workflows." />
      <label className="blog-search">
        <Search size={18} />
        <input value={query} onChange={(event) => { setQuery(event.target.value); setOpenQuestion(0); }} placeholder="Search questions" />
      </label>
      <div className="faq-list">
        {filteredQuestions.map((question, index) => (
          <div className={`faq-item ${openQuestion === index ? 'open' : ''}`} key={question}>
            <button type="button" onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}>
              <span>{question}</span><ChevronRight size={18} />
            </button>
            <div className="faq-answer">
              <p>NovaBusiness brings public website content, lead management, appointments and client workflows into a shared platform. Contact our team for details specific to your project and configuration.</p>
            </div>
          </div>
        ))}
        {!filteredQuestions.length ? <p className="dashboard-empty">No questions match your search.</p> : null}
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const { items, error, loading } = getPublicItems();
  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="Testimonials" title="Reviews from NovaBusiness clients" text="Only client reviews approved for publication are shown." />
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading approved reviews…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No approved client reviews have been published yet.</p> : null}
      {items.length ? (
        <div className="testimonial-grid">
          {items.map((item) => (
            <article key={item._id} className="card testimonial-card">
              <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <p>{`“${item.review}”`}</p>
              <div className="person-row"><div className="avatar">{item.customerName.charAt(0)}</div><div><strong>{item.customerName}</strong><span>Verified client</span></div></div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="shell page-shell not-found-page">
      <span className="section-label">404 / PAGE NOT FOUND</span>
      <h1>This page isn’t here.</h1>
      <p>The address may be outdated, or the page may have moved.</p>
      <Link to="/" className="btn btn-primary">Return home <ArrowRight size={17} /></Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
      <ScrollToTop />
      <ScrollProgress />
      <div className="page-shell app-shell">
        <Header />
        <MotionPageRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
