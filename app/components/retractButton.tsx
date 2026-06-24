import React from 'react';
import { BiUndo } from 'react-icons/bi'; 

interface RetractVoteButtonProps {
  onRetract: () => Promise<void> | void; 
}

export default function RetractVoteButton({ onRetract }: RetractVoteButtonProps) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onRetract}
        className="
          group
          relative 
          px-6!
          py-2.5!
          rounded-md 
          font-medium 
          text-sm 
          transition-all 
          duration-300 
          ease-in-out
          
          bg-[var(--panel-bg)]
          text-[var(--accent-gold)]
          border border-[var(--glass-border)]
          box-shadow-[var(--shadow)]
          
          hover:bg-[var(--accent-red)]
          hover:text-[var(--text-main)]
          hover:border-[var(--accent-red)]
          hover:scale-[1.02]
          hover:shadow-[0_0_15px_rgba(138,20,20,0.4)]
          
          active:scale-[0.98]
          
          focus:outline-none 
          focus:ring-2! 
          focus:ring-[var(--accent-gold)] 
          focus:ring-offset-2!
          focus:ring-offset-[var(--bg-color)]
          
          flex 
          items-center 
          gap-2!
          cursor-pointer
        "
      >
        <BiUndo className="text-lg transition-transform duration-300 group-hover:-translate-x-0.5" />

        <span>سحب التصويت</span>
      </button>
    </div>
  );
}