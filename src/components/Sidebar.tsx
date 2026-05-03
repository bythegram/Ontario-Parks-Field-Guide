import React, { useState } from 'react';
import { Search, Map as MapIcon, BookOpen, Scroll, Award, Settings, Menu, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore Parks', icon: MapIcon },
    { id: 'journal', label: 'My Journal', icon: Scroll },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-md border border-earth-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-earth-200 transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
              <Scroll className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-forest-900 leading-none">Wild Ontario</h1>
              <p className="text-xs text-forest-500 font-medium tracking-wide uppercase mt-1">Field Guide</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-forest-100 text-forest-900 shadow-sm" 
                      : "text-forest-600 hover:bg-earth-100 hover:text-forest-800"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-forest-700" : "text-forest-400"} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-earth-100">
            <div className="bg-forest-900 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-300">Open Source Guide</span>
              </div>
              <p className="text-xs text-forest-100 leading-relaxed italic mb-3">
                "Take only pictures, leave only footprints."
              </p>
              <a 
                href="https://github.com/bythegram/Ontario-Parks-Field-Guide" 
                className="text-[10px] font-bold uppercase underline text-forest-400 hover:text-white transition-colors"
              >
                Project Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
