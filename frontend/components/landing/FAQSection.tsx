'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const FAQSection: React.FC = () => {
  const founders = [
    {
      id: 'founder_1',
      name: 'Frontend Engineer',
      role: 'Lead Frontend Engineer',
      specialty: 'React 18, Next.js & Web3 Interface Systems',
      image: '/founder_1.jpg',
      isLeader: false,
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
    {
      id: 'founder_2',
      name: 'Smart Contract Engineer',
      role: 'Ketua Tim & Smart Contract Architect',
      specialty: 'Solidity v0.8.20, Atomic Engine & Protocol Security',
      image: '/founder_2.jpg',
      isLeader: true,
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
    {
      id: 'founder_3',
      name: 'Project Manager',
      role: 'Project Manager',
      specialty: 'Agile Execution & Web3 Product Strategy',
      image: '/founder_3.jpg',
      isLeader: false,
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28 border-y border-[#E4E4E7] w-full relative shadow-inner overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-[#09090B] text-white border-[#09090B] px-3.5 py-1 font-bold mb-3 shadow-xs">
            CORE TEAM & FOUNDERS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-3 font-sans">
            Meet The Builders.
          </h2>
          <p className="text-sm md:text-base text-[#52525B] font-normal">
            The protocol engineers & project managers behind BOTFlow Protocol on BOT Chain.
          </p>
        </div>

        {/* 3 CORE FOUNDERS CARDS GRID (BALANCED WHITE CARDS WITH SUBTLE LEADER HIGHLIGHT ON CARD 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {founders.map((founder) => {
            const isLeader = founder.isLeader;

            return (
              <motion.div
                key={founder.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`vercel-card p-0 bg-white transition-all rounded-3xl overflow-hidden text-left h-full flex flex-col justify-between ${
                    isLeader
                      ? 'border-2 border-[#09090B] shadow-2xl ring-2 ring-[#09090B]/10'
                      : 'border border-[#D4D4D8] shadow-lg hover:border-[#09090B]'
                  }`}
                >
                  <div>
                    {/* REAL FOUNDER PORTRAIT CONTAINER */}
                    <div className="relative w-full h-80 bg-[#09090B] overflow-hidden">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover object-[center_15%] hover:scale-105 transition-transform duration-500"
                      />

                      {/* SUBTLE KETUA TIM BADGE ON PHOTO */}
                      {isLeader && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-[#09090B] text-white font-mono text-[10px] uppercase px-3 py-1 font-extrabold shadow-md border border-[#27272A] flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-white" />
                            <span>KETUA TIM</span>
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* FOUNDER DETAILS */}
                    <div className="p-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#A1A1AA] font-bold uppercase tracking-wider block">
                          {founder.role}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#09090B] tracking-tight mt-0.5">
                          {founder.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#52525B] leading-relaxed font-mono font-medium">
                        Specialty: {founder.specialty}
                      </p>
                    </div>
                  </div>

                  {/* MONOCHROME SOCIAL ICONS FOOTER */}
                  <div className="p-6 pt-0 border-t border-[#F4F4F5] mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#71717A] font-bold uppercase">
                      {isLeader ? 'LEAD ARCHITECT' : 'BOT CHAIN BUILDER'}
                    </span>
                    <div className="flex items-center gap-3 text-[#09090B]">
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-xl bg-[#F4F4F5] hover:bg-[#09090B] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={founder.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-xl bg-[#F4F4F5] hover:bg-[#09090B] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        title="Twitter/X"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-xl bg-[#F4F4F5] hover:bg-[#09090B] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
