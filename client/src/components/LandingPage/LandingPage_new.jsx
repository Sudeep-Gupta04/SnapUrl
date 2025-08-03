import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, LinkIcon, ChartBarIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";
import Card from "../Card/Card.jsx";
import "./landing.css";
import { useStoreContext } from "../../contextApi/ContextApi.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';


const LandingPage = () => {
  const dashBoardNavigateHandler = () => {
    
  };

  const {token} = useStoreContext();
  console.log(`Token: ${token}`);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text-section">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-badge"
            >
              <span className="badge-text">✨ World's fastest URL shortener</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hero-title"
            >
              Simplify Your Links,
              <span className="gradient-text"> Amplify Your Reach</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-description"
            >
              ChopURL streamlines the process of URL shortening with powerful analytics,
              custom domains, and enterprise-grade security. Transform long, complex URLs
              into clean, shareable links in seconds.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-buttons"
            >
              <button className="primary-cta-button">
                <span>Get Started Free</span>
                <ArrowRightIcon className="button-icon" />
              </button>
              <button className="secondary-cta-button">
                <LinkIcon className="button-icon" />
                <span>Create Short Link</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="stats-section"
            >
              <div className="stat-item">
                <div className="stat-number">10M+</div>
                <div className="stat-label">Links Created</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Countries</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hero-image-section"
          >
            <div className="floating-elements">
              <div className="floating-card card-1">
                <LinkIcon className="card-icon" />
                <span>chopurl.co/abc123</span>
              </div>
              <div className="floating-card card-2">
                <ChartBarIcon className="card-icon" />
                <span>+2.5k clicks</span>
              </div>
              <div className="floating-card card-3">
                <ShieldCheckIcon className="card-icon" />
                <span>Secure & Safe</span>
              </div>
            </div>
            <img
              className="hero-image"
              src="/img2.png"
              alt="ChopURL Dashboard"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">
            Trusted by individuals and teams at the world's best companies
          </h2>
          <p className="section-subtitle">
            Join millions of users who trust ChopURL for their link management needs
          </p>
        </motion.div>
        
        <div className="features-grid">
          <Card
            title="⚡ Lightning Fast"
            desc="Experience blazing-fast URL shortening with our optimized infrastructure. Create and share links in milliseconds with 99.9% uptime guaranteed."
            icon={<BoltIcon className="feature-icon" />}
          />
          <Card
            title="📊 Advanced Analytics"
            desc="Gain deep insights with real-time analytics, geographic data, device tracking, and referral sources to optimize your marketing campaigns."
            icon={<ChartBarIcon className="feature-icon" />}
          />
          <Card
            title="🔒 Enterprise Security"
            desc="Bank-level security with SSL encryption, spam protection, and malware detection to keep your links and data completely safe."
            icon={<ShieldCheckIcon className="feature-icon" />}
          />
          <Card
            title="🎯 Smart Targeting"
            desc="Advanced targeting options including geographic redirects, device-based routing, and A/B testing for maximum engagement."
            icon={<LinkIcon className="feature-icon" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
