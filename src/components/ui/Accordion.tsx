'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-brand-black-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-body font-medium text-brand-black-600">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-brand-black-400" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 font-sans text-body-sm text-brand-black-400">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AccordionData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultOpenId, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(defaultOpenId ? [defaultOpenId] : items.length > 0 ? [items[0].id] : [])
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const newOpenIds = new Set(prev);
      if (newOpenIds.has(id)) {
        newOpenIds.delete(id);
      } else {
        if (!allowMultiple) {
          newOpenIds.clear();
        }
        newOpenIds.add(id);
      }
      return newOpenIds;
    });
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          content={item.content}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}