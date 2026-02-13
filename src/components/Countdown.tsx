"use client";

import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
  color: string;
}

const Countdown = ({ targetDate, color }: Props) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Unit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-4">
      <span className="text-3xl font-bold" style={{ color }}>{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center divide-x divide-slate-100 py-6 bg-slate-50/50 rounded-2xl">
      <Unit value={timeLeft.days} label="Jours" />
      <Unit value={timeLeft.hours} label="Heures" />
      <Unit value={timeLeft.minutes} label="Min" />
      <Unit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default Countdown;