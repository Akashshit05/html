import React from 'react';

export function NodeIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2Z" fill="#339933" fillOpacity="0.2" stroke="#43B02A" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 6L17 9V15L12 18L7 15V9L12 6Z" stroke="#68A063" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2.5" fill="#43B02A"/>
    </svg>
  );
}

export function NestIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7.5 2 3.5 5.5 3 10C2.5 14.5 5 18.5 9 20.5C9.5 20.7 10 20.4 10 19.8V17.5C7.5 17 6 15 6 13C6 11.5 7 10.5 8.5 10C8.5 8 10 6.5 12 6.5C14 6.5 15.5 8 15.5 10C17 10.5 18 11.5 18 13C18 15 16.5 17 14 17.5V19.8C14 20.4 14.5 20.7 15 20.5C19 18.5 21.5 14.5 21 10C20.5 5.5 16.5 2 12 2Z" fill="#EA2845" fillOpacity="0.2" stroke="#E0234E" strokeWidth="1.5"/>
      <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" fill="#E0234E"/>
    </svg>
  );
}

export function MongoIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 6 9.5 6 14.5C6 17.8137 8.68629 20.5 12 20.5C15.3137 20.5 18 17.8137 18 14.5C18 9.5 12 2 12 2Z" fill="#47A248" fillOpacity="0.2" stroke="#47A248" strokeWidth="1.5"/>
      <path d="M12 3V21" stroke="#47A248" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PostgresIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="#336791" fillOpacity="0.2" stroke="#336791" strokeWidth="1.5"/>
      <path d="M15 9C15 7.5 13.5 6.5 12 6.5C10.5 6.5 9 7.5 9 9C9 11 10.5 12 12 12C14 12 15 13 15 15.5C15 17 13.5 18 12 18C10 18 9 16.5 9 15" stroke="#4183C4" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TSIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#3178C6" fillOpacity="0.25" stroke="#3178C6" strokeWidth="1.5"/>
      <path d="M7 9H13M10 9V17" stroke="#3178C6" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 12C17 10.5 15.5 10 14.5 10.5C13.5 11 13.5 12.5 14.5 13.5C15.5 14.5 17 14.5 17 16C17 17.5 15.5 17.5 14 17" stroke="#3178C6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function RedisIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8L12 4L20 8L12 12L4 8Z" fill="#DC382D" fillOpacity="0.3" stroke="#DC382D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 12L12 16L20 12" stroke="#DC382D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 16L12 20L20 16" stroke="#DC382D" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function DockerIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="8" y="10" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="12" y="10" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="8" y="6" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="12" y="6" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="16" y="10" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <path d="M2 15C3.5 18 7 19.5 12 19.5C18 19.5 21 16.5 22 15C20.5 14.5 18.5 14 17 14.5C16 13 14 13.5 14 13.5" stroke="#2496ED" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function AWSIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12L7 7L9 12L11 7L13 12" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 8C15 8 16.5 7 18 7C19.5 7 20.5 8 20.5 9.5C20.5 11 19 11.5 18 12C17 12.5 15.5 13 15.5 14.5C15.5 16 16.5 17 18.5 17C20 17 21 16 21 16" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 18C8 20.5 16 20.5 20 18M18 17.5L20.5 18.5L19.5 20" stroke="#FF9900" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BriefcaseIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

export function GraduationCapIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

export function CodeGearIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

export function QuoteIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  );
}

export function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export function ExternalLinkIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export function DownloadIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export function ArrowRightIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

export function MessageIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

export function PaperPlaneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

export function MailIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

export function CalendarIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

export function ChevronUpIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  );
}

export function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function EmailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
