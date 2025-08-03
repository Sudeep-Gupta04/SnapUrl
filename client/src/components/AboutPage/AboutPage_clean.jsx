import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaLink, 
  FaChartLine, 
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaGlobe
} from "react-icons/fa";
import "./about.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const features = [
    {
      icon: <FaRocket />,
      title: "Lightning Fast",
      description: "Experience blazing-fast URL shortening with our optimized infrastructure and 99.9% uptime guarantee."
    },
    {
      icon: <FaChartLine />,
      title: "Advanced Analytics",
      description: "Gain deep insights with real-time analytics, geographic data, and detailed performance metrics."
    },
    {
      icon: <FaShieldAlt />,
      title: "Enterprise Security",
      description: "Bank-level security with SSL encryption and advanced spam protection for all your links."
    },
    {
      icon: <FaLink />,
      title: "Smart Management",
      description: "Advanced link management with custom domains, targeting options, and bulk operations."
    }
  ];

  const stats = [
    { number: "10M+", label: "Links Created" },
    { number: "150+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
    { number: "50K+", label: "Users" }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">About SnapURL</h1>
            <p className="hero-description">
              SnapURL is a modern, powerful URL shortening platform designed to help businesses, 
              marketers, and individuals manage their links effectively with advanced analytics 
              and enterprise-grade security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="stat-item"
              >
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Why Choose SnapURL?</h2>
            <p className="section-subtitle">
              Discover the features that make SnapURL the preferred choice for link management
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mission-text"
            >
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-description">
                We believe that every link should tell a story. SnapURL was founded on the principle
                that link management should be simple, powerful, and accessible to everyone. Our platform
                combines cutting-edge technology with user-friendly design to deliver an experience
                that exceeds expectations.
              </p>
              <div className="mission-highlights">
                <div className="highlight-item">
                  <FaRocket className="highlight-icon" />
                  <span>Innovation-driven development</span>
                </div>
                <div className="highlight-item">
                  <FaUsers className="highlight-icon" />
                  <span>User-centric design</span>
                </div>
                <div className="highlight-item">
                  <FaShieldAlt className="highlight-icon" />
                  <span>Privacy and security first</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mission-visual"
            >
              <div className="visual-elements">
                <div className="visual-card">
                  <FaGlobe />
                  <span>Global Reach</span>
                </div>
                <div className="visual-card">
                  <FaChartLine />
                  <span>Real-time Analytics</span>
                </div>
                <div className="visual-card">
                  <FaShieldAlt />
                  <span>Secure Links</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cta-content"
          >
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of users who trust SnapURL for their link management needs.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-primary"
                onClick={() => navigate('/dashboard')}
              >
                Get Started Free
              </button>
              <button 
                className="cta-secondary"
                onClick={() => navigate('/')}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
