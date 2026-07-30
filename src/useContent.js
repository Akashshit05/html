import { useEffect, useState } from 'react';
import { projects as fallbackProjects } from './projects.js';

export const fallbackSkills = [
  'Node.js', 'NestJS', 'TypeScript', 'Express.js', 'MongoDB', 'PostgreSQL',
  'REST APIs', 'GraphQL', 'JWT Auth', 'Microservices', 'Docker', 'Redis', 'AWS'
];

export const fallbackSettings = {
  email: 'hello@fullstack.dev',
  phone: '+1 234 567 890',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com'
};

let cachedContent = null;

export function useContent() {
  const [content, setContent] = useState(cachedContent || {
    projects: fallbackProjects,
    skills: fallbackSkills,
    settings: fallbackSettings
  });

  useEffect(() => {
    let active = true;
    fetch('/api/content')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => {
        if (!active || !data.ok) return;
        cachedContent = {
          projects: data.projects || [],
          skills: data.skills || [],
          settings: data.settings || fallbackSettings
        };
        setContent(cachedContent);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return content;
}
