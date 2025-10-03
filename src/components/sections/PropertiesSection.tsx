'use client';

import { motion } from 'framer-motion';
import { MapPinIcon, BedIcon, BathIcon, SquareIcon, HeartIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const properties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    price: 450000,
    location: 'Downtown, New York',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: '/api/placeholder/400/300',
    featured: true,
  },
  {
    id: 2,
    title: 'Luxury Family Home',
    price: 750000,
    location: 'Suburbs, California',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: '/api/placeholder/400/300',
    featured: false,
  },
  {
    id: 3,
    title: 'Cozy Studio Apartment',
    price: 280000,
    location: 'Brooklyn, New York',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: '/api/placeholder/400/300',
    featured: false,
  },
  {
    id: 4,
    title: 'Executive Penthouse',
    price: 1200000,
    location: 'Manhattan, New York',
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    image: '/api/placeholder/400/300',
    featured: true,
  },
];

export default function PropertiesSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium properties in prime locations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover:shadow-medium transition-shadow duration-300"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Property Image</span>
                </div>
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <p className="text-primary-600 font-semibold text-xl mb-4">
                  {formatPrice(property.price)}
                </p>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <BedIcon className="w-4 h-4 mr-1" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <BathIcon className="w-4 h-4 mr-1" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <SquareIcon className="w-4 h-4 mr-1" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-primary px-8 py-3">
            View All Properties
          </button>
        </motion.div>
      </div>
    </section>
  );
}
