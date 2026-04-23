"use client";

import { motion } from "framer-motion";
import { Activity, LayoutDashboard, BrainCircuit, Network } from "lucide-react";

export default function ExpertiseSection() {
  return (
    <section className="w-full bg-white py-20 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center text-center">
        
        <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-1 h-1 bg-slate-400 rounded-full" />
          Expertise
        </div>
        
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 mb-6 max-w-2xl leading-tight">
          Where human insight meets <br /> intelligent technology
        </h2>
        
        <p className="text-slate-500 max-w-2xl text-lg mb-16">
          We help businesses harness technology not to replace human creativity, but to amplify it — enabling smarter decisions and faster.
        </p>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Card 1: Automation & optimization */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-between min-h-[400px] overflow-hidden group">
            <div className="relative w-full h-48 flex justify-center items-center mt-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="absolute z-10 bg-slate-900 text-white p-4 rounded-xl shadow-2xl w-40 -ml-20 -mt-10"
              >
                <div className="text-[10px] text-slate-400 mb-2 flex justify-between">Performance <Activity size={12}/></div>
                <div className="text-2xl font-bold">50%</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="absolute z-20 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl w-56 ml-10 mt-10"
              >
                <div className="text-[10px] text-slate-400 mb-1">Monthly expense</div>
                <div className="text-xl font-bold text-slate-800 mb-4">4,900 <span className="text-slate-400 text-sm">/$10,000</span></div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-blue-400 w-[70%] rounded-full"/></div>
                  <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-green-400 w-[40%] rounded-full"/></div>
                </div>
              </motion.div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automation & optimization</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Streamline your operations through intelligent workflow automation that saves time, reduces errors, and boosts productivity.
              </p>
            </div>
          </div>

          {/* Card 2: Data analytics & insights */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-between min-h-[400px] overflow-hidden group">
            <div className="relative w-full h-48 flex justify-center items-center mt-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="absolute z-10 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl w-48 -ml-16 -mt-8 rotate-[-3deg]"
              >
                <div className="text-sm font-medium leading-snug">
                  Expertise <span className="inline-block w-2 h-2 bg-[#E5FF38] rounded-full align-middle ml-1" /> that Combines Strategy, Data, and Artificial Intelligence
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="absolute z-20 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl w-48 ml-16 mt-8 rotate-[3deg]"
              >
                <div className="text-xs font-semibold text-slate-800 mb-4">Intelligence in<br/>Every Decision</div>
                <div className="flex items-end gap-1 h-16 w-full">
                  <div className="w-full bg-slate-100 rounded-t h-[40%]" />
                  <div className="w-full bg-slate-200 rounded-t h-[60%]" />
                  <div className="w-full bg-blue-200 rounded-t h-[50%]" />
                  <div className="w-full bg-blue-500 rounded-t h-[90%]" />
                </div>
              </motion.div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Data analytics & insights</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Transform raw data into strategic insight using advanced analytics, dashboards, and predictive modeling.
              </p>
            </div>
          </div>

          {/* Card 3: Digital transformation */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-between min-h-[400px] overflow-hidden group">
            <div className="relative w-full h-48 flex justify-center items-center mt-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute z-20 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl w-56 -ml-4 mt-8"
              >
                <div className="text-[10px] text-slate-400 mb-1 flex justify-between">Performance <Activity size={12}/></div>
                <div className="text-2xl font-bold text-slate-800 mb-4">49% <span className="text-[#E5FF38] text-xs">●</span></div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600">Professional</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600">Grow Faster</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600">Strategic</span>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute z-10 bg-slate-900 text-white p-4 rounded-xl shadow-2xl w-40 ml-20 -mt-12 rotate-[5deg]"
              >
                <div className="text-xs text-slate-400">Smart. Simple.</div>
              </motion.div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Digital transformation</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                We guide organizations through full-scale digital evolution — modernizing systems, processes, and decision-making frameworks.
              </p>
            </div>
          </div>

          {/* Card 4: Experience intelligence */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col items-center justify-between min-h-[400px] overflow-hidden group">
            <div className="relative w-full h-48 flex justify-center items-center mt-4">
               {/* Network visualization */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 border border-slate-200 rounded-full animate-[spin_10s_linear_infinite]" />
                 <div className="absolute w-48 h-48 border border-slate-100 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               </div>
               <div className="z-20 bg-slate-900 p-4 rounded-2xl text-white shadow-xl">
                 <Network size={24} />
               </div>
               {/* Nodes */}
               <motion.div whileHover={{ scale: 1.1 }} className="absolute z-30 bg-white border border-slate-200 p-1.5 rounded-full shadow-md text-[9px] font-medium text-slate-600 top-8 left-10 flex items-center gap-1">
                 <div className="w-4 h-4 bg-blue-100 rounded-full"/> User A
               </motion.div>
               <motion.div whileHover={{ scale: 1.1 }} className="absolute z-30 bg-white border border-slate-200 p-1.5 rounded-full shadow-md text-[9px] font-medium text-slate-600 bottom-10 right-10 flex items-center gap-1">
                 <div className="w-4 h-4 bg-green-100 rounded-full"/> User B
               </motion.div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Experience intelligence</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Combine data and design to deliver smarter, more personalized digital experiences that connect with users.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
