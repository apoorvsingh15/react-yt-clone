/* eslint-disable react/prop-types */
import {
  HomeIcon,
  FireIcon,
  PlayCircleIcon,
  BookmarkIcon,
  ClockIcon,
  HandThumbUpIcon,
  MusicalNoteIcon,
  FilmIcon,
  TvIcon,
  TrophyIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";

const mainItems = [
  { icon: HomeIcon, activeIcon: HomeSolid, label: "Home", href: "#", active: true },
  { icon: FireIcon, label: "Trending", href: "#" },
  { icon: PlayCircleIcon, label: "Subscriptions", href: "#" },
];

const libraryItems = [
  { icon: BookmarkIcon, label: "Library", href: "#" },
  { icon: ClockIcon, label: "History", href: "#" },
  { icon: HandThumbUpIcon, label: "Liked Videos", href: "#" },
];

const exploreItems = [
  { icon: MusicalNoteIcon, label: "Music", href: "#" },
  { icon: FilmIcon, label: "Movies", href: "#" },
  { icon: TvIcon, label: "TV Shows", href: "#" },
  { icon: SignalIcon, label: "Live", href: "#" },
  { icon: TrophyIcon, label: "Sports", href: "#" },
];

function NavItem({ item, collapsed }) {
  const Icon = item.active && item.activeIcon ? item.activeIcon : item.icon;
  return (
    <a
      href={item.href}
      className={`flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
        ${item.active
          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}
        ${collapsed ? "flex-col gap-1 py-3 justify-center" : ""}`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className={collapsed ? "text-[10px] leading-tight text-center" : "truncate"}>
        {item.label}
      </span>
    </a>
  );
}

function SectionLabel({ label, collapsed }) {
  if (collapsed) return <hr className="border-gray-200 dark:border-gray-700 my-1 mx-2" />;
  return (
    <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
      {label}
    </p>
  );
}

const Sidebar = ({ open, collapsed, onClose }) => {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] overflow-y-auto
          bg-white dark:bg-[#0f0f0f]
          transition-transform duration-200 ease-in-out
          ${collapsed ? "w-[72px]" : "w-60"}
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-label="Sidebar"
      >
        <nav className={`py-2 ${collapsed ? "px-1" : "px-2"}`}>
          <div className="space-y-0.5">
            {mainItems.map((item) => (
              <NavItem key={item.label} item={item} collapsed={collapsed} />
            ))}
          </div>

          <SectionLabel label="Library" collapsed={collapsed} />
          <div className="space-y-0.5">
            {libraryItems.map((item) => (
              <NavItem key={item.label} item={item} collapsed={collapsed} />
            ))}
          </div>

          <SectionLabel label="Explore" collapsed={collapsed} />
          <div className="space-y-0.5">
            {exploreItems.map((item) => (
              <NavItem key={item.label} item={item} collapsed={collapsed} />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
