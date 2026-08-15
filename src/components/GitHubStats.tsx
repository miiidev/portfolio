import { useEffect, useState } from 'react';
import { githubFallback } from '../data';

interface GitHubStatsData {
  publicRepos: number;
  topLanguages: string[];
  lastPush: string | null;
}

const CACHE_KEY = 'portfolio-github-stats';
const TTL = 60 * 60 * 1000;

async function fetchGitHubStats(): Promise<GitHubStatsData> {
  try {
    const cachedRaw = localStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw) as { data: GitHubStatsData; fetchedAt: number };
      if (Date.now() - cached.fetchedAt < TTL) return cached.data;
    }
  } catch {
    // cache unavailable; fetch fresh
  }

  const [userRes, reposRes] = await Promise.all([
    fetch('https://api.github.com/users/miiidev'),
    fetch('https://api.github.com/users/miiidev/repos?per_page=100'),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

  const [user, repos] = (await Promise.all([userRes.json(), reposRes.json()])) as [
    { public_repos: number },
    { language: string | null; pushed_at: string }[],
  ];

  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const topLanguages = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);
  const lastPush = repos.reduce((latest, repo) => (repo.pushed_at > latest ? repo.pushed_at : latest), '');

  const data: GitHubStatsData = {
    publicRepos: user.public_repos,
    topLanguages,
    lastPush: lastPush || null,
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() }));
  } catch {
    // storage unavailable; skip caching
  }
  return data;
}

function formatLastPush(lastPush: string): string {
  return new Date(lastPush).toLocaleDateString('en-MY', { month: 'short', year: 'numeric' });
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData>(githubFallback);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => console.warn('GitHub stats unavailable, showing fallback'));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-surface/50 border border-edge rounded-xl p-6">
      <h3 className="text-sm font-semibold text-muted mb-4 font-mono uppercase tracking-wide">GitHub</h3>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-extrabold text-copy">{stats.publicRepos}+</p>
          <p className="text-sm text-muted">repos built</p>
        </div>
        {stats.topLanguages.length > 0 && (
          <div>
            <p className="text-sm text-muted mb-2">Top languages</p>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.map((lang) => (
                <span key={lang} className="text-xs font-semibold bg-canvas text-copy/80 px-3 py-1.5 rounded-full border border-edge">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className="text-sm text-muted mb-1">Last push</p>
          <p className="text-sm text-copy/80 font-medium">
            {stats.lastPush ? formatLastPush(stats.lastPush) : 'Always building'}
          </p>
        </div>
      </div>
    </div>
  );
}