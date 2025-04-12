import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SettingsPage from './SettingsPage.jsx';
export default function SettingsButton(props) {
  const [open, setOpen] = useState(false);

  const bounceUp = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 35,
      },
    },
  };

  return (
    <div className="relative">
        <Settings onClick={() => setOpen((prev) => !prev)}
                     className="w-7 h-7
                                cursor-pointer 
                              text-black
                              hover:text-yellow-500
                                hover:rotate-12
                                hover:scale-110
                                transition
                                duration-100
                                ease-in-out
                                place-content-center
                                dark:text-gray-100"
        />

        <AnimatePresence>
        {open && (
            <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 shadow-xl p-4 z-50 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bounceUp}
            >
            <SettingsPage isDark={props.isDark} setIsDark={props.setIsDark} onClose={() => setOpen(false)}/>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
}