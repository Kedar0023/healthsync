"use client";

import React from "react";
import Navbar from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Users, Heart, Lock } from "lucide-react";

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Storage",
      description: "Your medical records are encrypted and stored with bank-level security."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Instant Access",
      description: "Access your health information instantly through QR code scanning."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Easy Sharing",
      description: "Share your medical history with healthcare providers securely."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Health Tracking",
      description: "Monitor your health metrics and medical appointments in one place."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Privacy First",
      description: "Your data privacy is our top priority with end-to-end encryption."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Mike Chen",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Emma Williams",
      role: "Security Expert",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-6 md:px-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Revolutionizing <span className="text-primary">Healthcare</span> Access
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          HealthSync is on a mission to make healthcare information accessible, secure, and seamless. 
          We believe in empowering individuals to take control of their health journey.
        </p>
      </motion.section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At HealthSync, we're dedicated to transforming how people manage and share their health information. 
                Our digital health card solution makes it easy to maintain and access your medical records anytime, anywhere.
              </p>
              <p className="text-muted-foreground mb-6">
                We envision a future where managing your health information is as simple as scanning a QR code, 
                while maintaining the highest standards of security and privacy.
              </p>
              <div className="flex items-center text-primary hover:text-primary/90 cursor-pointer">
                <span className="mr-2">Learn more about our vision</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" 
                  alt="HealthSync Mission" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Why Choose HealthSync?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-card hover:bg-accent transition-colors"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about HealthSync? We'd love to hear from you. 
              Reach out to our team and we'll get back to you as soon as possible.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 