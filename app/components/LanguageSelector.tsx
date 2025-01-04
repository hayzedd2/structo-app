import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
  code: string;
  name: string;
}

interface LanguageSelectProps {
  languages: Language[];
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
       type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-[150px] px-4 py-2 text-[12px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none "
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLanguage.name}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-[150px] mt-1 bg-white shadow-lg max-h-60 rounded-md  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
          >
            {languages.map((language) => (
              <li
                key={language.code}
                className={`cursor-default select-none relative py-2 pl-3 pr-9 text-[12px]  hover:text-black ${
                  language.code === selectedLanguage.code
                    ? "bg-[#F4F4F5] text-black"
                    : "text-gray-900"
                }`}
                role="option"
                aria-selected={language.code === selectedLanguage.code}
                onClick={() => {
                  onSelectLanguage(language);
                  setIsOpen(false);
                }}
              >
                <span className="block truncate">{language.name}</span>
                {language.code === selectedLanguage.code && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
