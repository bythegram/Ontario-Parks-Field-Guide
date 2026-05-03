import React from 'react';
import { Award, Zap, Activity, CheckCircle2, TrendingUp, Trophy, Map as MapIcon, Scroll, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS } from '../data/constants';
import { cn } from '../lib/utils';

export function AchievementsSection({ storage }: { storage: any }) {
  const earnedBadges = storage.getBadges();

  const stats = [
    { label: 'Parks Visited', value: storage.visits.length, icon: MapIcon, color: 'text-forest-600', bg: 'bg-forest-100' },
    { label: 'Journal Logs', value: storage.journal.length, icon: Scroll, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Species Spotted', value: new Set(storage.journal.flatMap((e: any) => e.speciesIds)).size, icon: Activity, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-earth-200">
        <div>
          <h2 className="text-4xl font-bold text-forest-900 font-serif italic">Wilderness Achievements</h2>
          <p className="text-forest-600 mt-2">Track your progress and earn badges for exploring Ontario.</p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl border border-earth-200 shadow-sm">
          <p className="text-[10px] font-bold text-forest-400 uppercase tracking-widest">Progress</p>
          <p className="text-sm font-bold text-forest-900">{earnedBadges.length} / {ACHIEVEMENTS.length} badges earned</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-xs font-bold text-forest-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-3xl font-serif font-bold text-forest-900 leading-none">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 pt-6">
        {/* Badges Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={20} className="text-amber-500" />
            <h3 className="text-xl font-bold text-forest-900">Your Badge Collection</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map(badge => {
              const isEarned = earnedBadges.some(b => b.id === badge.id);
              return (
                <div 
                  key={badge.id}
                  className={cn(
                    "relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden",
                    isEarned 
                      ? "bg-white border-forest-200 shadow-md" 
                      : "bg-earth-100/50 border-earth-200 grayscale opacity-60"
                  )}
                >
                  <div className="flex items-start gap-4">
                     <div className={cn(
                       "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2",
                       isEarned ? "bg-forest-50 border-forest-100 text-forest-600" : "bg-earth-200 border-earth-300 text-earth-400"
                     )}>
                       <Award size={24} />
                     </div>
                     <div>
                       <div className="flex items-center gap-2">
                        <h4 className="font-bold text-forest-900">{badge.title}</h4>
                        {isEarned && <CheckCircle2 size={12} className="text-forest-500" />}
                       </div>
                       <p className="text-xs text-forest-500 mt-1 leading-relaxed">{badge.description}</p>
                     </div>
                  </div>
                  {isEarned && (
                    <div className="absolute -bottom-2 -right-2 transform rotate-12 opacity-10">
                      <Zap size={64} className="text-forest-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Level Up Progress */}
        <section>
          <div className="bg-forest-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden h-full">
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-forest-400" />
                <h3 className="text-xl font-bold">Explorer Level</h3>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-4xl font-serif font-bold italic">Ranger In Training</p>
                  <p className="text-forest-300 font-bold text-sm">Level 2</p>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(earnedBadges.length / ACHIEVEMENTS.length) * 100}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-forest-400 to-forest-200" 
                  />
                </div>
                <p className="text-xs text-forest-400 mt-3 flex justify-between">
                  <span>{earnedBadges.length} of {ACHIEVEMENTS.length} milestones reached</span>
                  <span>Next: Master Naturalist</span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-400/20 flex items-center justify-center shrink-0">
                       <MapIcon size={20} className="text-forest-300" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Recent Activity</p>
                      <p className="text-xs text-forest-300 mt-1">Visit 3 more Northern parks to unlock the 'Tundra Tough' badge.</p>
                      <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-forest-200 flex items-center gap-1">
                        View Map <CheckCircle2 size={10} />
                      </span>
                    </div>
                   </div>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                    <Info size={16} className="text-forest-400" />
                    <p className="text-xs text-forest-200 italic">"Explore with intention, protect by presence."</p>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Background flourish */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-forest-800/20 -mr-20 -mt-20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-800/10 -ml-20 -mb-20 rounded-full blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  );
}
