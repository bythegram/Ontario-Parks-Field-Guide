import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { motion, AnimatePresence } from 'motion/react';
import { ExploreSection } from './sections/ExploreSection';
import { JournalSection } from './sections/JournalSection';
import { AchievementsSection } from './sections/AchievementsSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const storage = useLocalStorage();

  const renderSection = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreSection key="explore" storage={storage} />;
      case 'journal':
        return <JournalSection key="journal" storage={storage} />;
      case 'achievements':
        return <AchievementsSection key="achievements" storage={storage} />;
      default:
        return <ExploreSection storage={storage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-earth-50 text-forest-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 pt-16 px-4 pb-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-7xl mx-auto h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
