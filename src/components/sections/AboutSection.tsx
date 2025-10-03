'use client';

import { motion } from 'framer-motion';
import { UsersIcon, AwardIcon, TrendingUpIcon } from 'lucide-react';

const stats = [
  {
    icon: UsersIcon,
    value: '10,000+',
    label: 'Happy Clients',
  },
  {
    icon: AwardIcon,
    value: '500+',
    label: 'Properties Sold',
  },
  {
    icon: TrendingUpIcon,
    value: '98%',
    label: 'Client Satisfaction',
  },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              About Our Real Estate Platform
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              We are a leading real estate platform dedicated to helping you find your dream home. 
              With years of experience and a commitment to excellence, we provide comprehensive 
              services that make your property journey seamless and successful.
            </p>
            <p className="text-lg text-primary-200 mb-8">
              Our team of experienced professionals works tirelessly to ensure that every client 
              receives personalized attention and finds the perfect property that meets their needs 
              and budget.
            </p>
            <button className="btn-secondary bg-white text-primary-600 hover:bg-primary-50">
              Learn More About Us
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
