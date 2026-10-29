function BothIcon({ className }: { className?: string; }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="5" width="13" height="10" rx="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.5l5-3v11l-5-3v-5z" />
      <rect x="4" y="16" width="4" height="3" rx="0.75" className="fill-current opacity-60" />
    </svg>
  );
}

export default BothIcon;
