'use client';

import { motion } from 'framer-motion';
import { SearchIcon, MapPinIcon, HomeIcon, ShieldIcon, UsersIcon, StarIcon } from 'lucide-react';

const features = [
  {
    icon: SearchIcon,
    title: 'Advanced Search',
    description: 'Find properties with our powerful search filters and location-based recommendations.',
  },
  {
    icon: MapPinIcon,
    title: 'Location Insights',
    description: 'Get detailed neighborhood information, school ratings, and local amenities.',
  },
  {
    icon: HomeIcon,
    title: 'Property Management',
    description: 'Manage your property listings with our comprehensive dashboard tools.',
  },
  {
    icon: ShieldIcon,
    title: 'Secure Transactions',
    description: 'Safe and secure property transactions with verified agents and escrow services.',
  },
  {
    icon: UsersIcon,
    title: 'Expert Agents',
    description: 'Connect with experienced real estate professionals in your area.',
  },
  {
    icon: StarIcon,
    title: 'Verified Listings',
    description: 'All properties are verified and regularly updated for accuracy.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive real estate solutions with cutting-edge technology
            and personalized service to help you find your perfect home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center hover:shadow-medium transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
