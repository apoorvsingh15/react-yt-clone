/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import ytLogo from "/yt.svg";

export default function Header({ onClickSearch, searchTerm, setSearchTerm, onToggleSidebar }) {
  const { isDark, toggle } = useTheme();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onClickSearch(searchTerm);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center gap-2 px-3 sm:px-4 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
      {/* Left: hamburger + logo */}
      {!showMobileSearch && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <a href="/" className="flex items-center gap-1 pl-1">
            <img className="h-6 w-6" src={ytLogo} alt="YouTube Logo" />
            <span className="hidden sm:inline text-base font-bold text-gray-900 dark:text-white leading-none">
              YouTube
            </span>
            <span className="hidden sm:inline text-[10px] font-semibold text-gray-500 dark:text-gray-400 self-start pt-0.5">
              Premium
            </span>
          </a>
        </div>
      )}

      {/* Center: search bar (hidden on mobile unless activated) */}
      <form
        onSubmit={handleSearch}
        className={`${showMobileSearch ? "flex" : "hidden"} md:flex flex-1 items-center max-w-xl mx-auto`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="flex-1 px-4 py-2 text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 flex-shrink-0"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
        {showMobileSearch && (
          <button
            type="button"
            onClick={() => setShowMobileSearch(false)}
            className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 md:hidden"
            aria-label="Cancel search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </form>

      {/* Right: action buttons */}
      <div className="flex items-center gap-0.5 ml-auto flex-shrink-0">
        {/* Mobile search toggle */}
        {!showMobileSearch && (
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        )}

        {/* Dark / light mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          aria-label="Toggle dark mode"
        >
          {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6" />
        </button>

        {/* Profile avatar */}
        <button className="ml-1 flex-shrink-0" aria-label="Profile">
          <img
            className="h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-blue-500 transition-all"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
        </button>
      </div>
    </header>
  );
}
