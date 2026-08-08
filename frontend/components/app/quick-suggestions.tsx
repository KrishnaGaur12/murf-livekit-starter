'use client';

import { motion } from 'motion/react';

interface QuickSuggestionsProps {
  onSelect: (topic: string) => void;
}

const SUGGESTIONS = [
  'PM Awas Yojana',
  'Ayushman Bharat',
  'PAN Card',
  'Driving Licence',
  'Birth Certificate',
  'Pension',
  'Ration Card',
  'Lodge Complaint',
];

export function QuickSuggestions({ onSelect }: QuickSuggestionsProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
      {SUGGESTIONS.map((topic, index) => (
        <motion.button
          key={topic}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(topic)}
          className="rounded-full bg-white/50 dark:bg-black/50 border border-border px-4 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 dark:hover:border-blue-800"
        >
          {topic}
        </motion.button>
      ))}
    </div>
  );
}
