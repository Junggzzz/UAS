'use client';
import { useState } from 'react';

export default function Pagination() {
  return (
    <div className="flex justify-center mt-10 gap-2">
      <button className="border px-3 py-1 rounded bg-[#B88E2F] text-white">1</button>
      <button className="border px-3 py-1 rounded">2</button>
      <button className="border px-3 py-1 rounded">3</button>
      <button className="border px-3 py-1 rounded">Next →</button>
    </div>
  );
}