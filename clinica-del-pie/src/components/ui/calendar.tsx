// src/components/ui/calendar.tsx
"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  locale?: any;
  className?: string;
}

export function Calendar({
  selected,
  onSelect,
  locale = es,
  className,
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      locale={locale}
      weekStartsOn={1}
      className={className}
      disabled={{ before: new Date() }} // 🔒 Bloquea días pasados
    />
  );
}
