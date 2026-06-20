"use client";

import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
interface SimplePaginationProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onNext,
    onPrev,
}: SimplePaginationProps) {
    // تجنب رندرة المكون إذا كانت هناك صفحة واحدة فقط لضمان تجربة مستخدم مريحة
    if (totalPages <= 1) return null;

    return (
        <nav
            className="flex items-center justify-center gap-6! py-3! px-5! rounded-xl w-fit mx-auto backdrop-blur-md border shadow-[var(--shadow)] transition-all duration-300 border-[var(--glass-border)] bg-[var(--panel-bg)]"
            aria-label="Pagination"
            dir="rtl"
        >
            {/* زر إلى الخلف */}
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 text-[var(--text-main)] border-[var(--glass-border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent-red)] hover:text-white"
                aria-label="Previous Page"
            >
                <HiChevronRight />
            </button>

            {/* عرض الحالة الحالية للمستخدم */}
            <div className="flex items-center gap-1.5! font-medium text-sm select-none">
                <span className="px-3! py-1.5! rounded-md font-bold bg-[var(--accent-gold)] text-[#0b0202]">
                    {currentPage}
                </span>
                <span className="text-[var(--text-muted)] px-1!">من</span>
                <span className="text-[var(--text-main)] font-semibold">
                    {totalPages}
                </span>
            </div>

            {/* زر إلى الأمام */}
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 text-[var(--text-main)] border-[var(--glass-border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent-red)] hover:text-white"
                aria-label="Next Page"
            >
                <HiChevronLeft />

            </button>
        </nav>
    );
}