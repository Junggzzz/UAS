'use client';
import { useState } from 'react';

interface FilterBarProps {
  total?: number;
  onShowChange?: (count: number) => void;
  onSortChange?: (sort: string) => void;
}

export default function FilterBar({ total = 16, onShowChange, onSortChange }: FilterBarProps) {
  const [show, setShow] = useState(12);
  const [sort, setSort] = useState('default');

  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setShow(value);
    onShowChange?.(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="flex flex-wrap items-center justify-between border py-4 px-6 bg-[#F9F1E7] text-sm text-black">
      <div className="flex items-center gap-4">
        <span className="font-semibold">Showing 1–{show} of {total} results</span>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="show">Show:</label>
        <select
          id="show"
          className="border rounded-md p-1 text-black"
          value={show}
          onChange={handleShowChange}
        >
          <option value="8">8</option>
          <option value="12">12</option>
        </select>

        <label htmlFor="sort" className="ml-4">Sort by:</label>
        <select
          id="sort"
          className="border rounded-md p-1 text-black"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}