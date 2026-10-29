function VideoFormatIcon({ className }: { className?: string; }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 1.263c.195.195.195.512 0 .707l-1.263 1.263m-2.036-2.036a2.25 2.25 0 11-3.182-3.182m3.182 3.182L9.633 14.25c-.806.806-2.097.806-2.903 0L3.21 12.21a2.25 2.25 0 113.182-3.182L10.5 13.682a2.25 2.25 0 012.036 0z" />
    </svg>
  );
}

export default VideoFormatIcon;