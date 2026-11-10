import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/coutureData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-[#191715] text-[#F6F1E9] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-2">
            Témoignages
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#F6F1E9] tracking-tight">
            La Voix de Notre Clientèle
          </h2>
        </motion.div>

        {/* Compact Frosted Crystal Cards with Upward Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-5 rounded-2xl backdrop-blur-xl bg-white/[0.04] border border-white/15 hover:border-[#C5A46D]/70 hover:bg-white/[0.08] transition-all flex flex-col justify-between shadow-xl cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-4 h-4 text-[#C5A46D]/70" />
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C5A46D] text-[#C5A46D]" />
                    ))}
                  </div>
                </div>

                <p className="font-editorial text-xs sm:text-sm text-[#F6F1E9]/85 italic leading-relaxed mb-4">
                  {t.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-sans font-medium text-[#F6F1E9] block">
                    {t.clientName}
                  </span>
                  <span className="text-[#C5A46D] font-light">
                    {t.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
