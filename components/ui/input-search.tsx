'use client';

import React, { useState, useEffect } from 'react';
import { DebouncedInput } from './debounce-input';

interface InputSearchProps {
  placeholder?: string;
  suggestions: any[];
  setSuggestions: (suggestions: any[]) => void;
  setReturnValue: (value: any) => void;
  fetchSuggestions: (value: string) => void;
  value: string;
}

export const InputSearch = ({
  value: initValue,
  suggestions = [],
  setSuggestions,
  placeholder = 'Enter your input...',
  setReturnValue,
  fetchSuggestions
}: InputSearchProps) => {
  const [value, setValue] = useState(initValue);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    setReturnValue('');
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchSuggestions(value);
    }
  }, [value, fetchSuggestions, isFocused]);

  return (
    <div className="relative w-full max-w-sm">
      <DebouncedInput
        value={value}
        onChange={(value) => {
          setValue(String(value));
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
      />

      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-md border bg-white text-black shadow-md">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                setValue(item.name || item.id);
                setReturnValue(item.id);
                setSuggestions([]);
              }}
            >
              {item.name || item.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
