const CONFIG = {
  apkUrl: "PUT_GITHUB_APK_LINK_HERE",
  githubReleaseUrl: "PUT_GITHUB_RELEASE_PAGE_HERE",
  githubReleaseApi: "https://api.github.com/repos/USERNAME/REPOSITORY/releases/latest"
};

const FALLBACK = {
  version: "1.0",
  date: "October 2026",
  size: "Update file size"
};

function setLinks() {
  document.querySelectorAll('.js-download').forEach(a => {
    a.href = CONFIG.apkUrl;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
  document.querySelectorAll('.js-release').forEach(a => {
    a.href = CONFIG.githubReleaseUrl;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return FALLBACK.size;
  const units = ['B','KB','MB','GB'];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) { value /= 1024; i++; }
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

async function hydrateReleaseMeta() {
  const useApi = CONFIG.githubReleaseApi && !CONFIG.githubReleaseApi.includes('USERNAME/REPOSITORY');
  if (!useApi) return;
  try {
    const res = await fetch(CONFIG.githubReleaseApi, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!res.ok) throw new Error('GitHub API request failed');
    const data = await res.json();
    const tag = data.tag_name || FALLBACK.version;
    const published = data.published_at ? new Date(data.published_at) : null;
    const apk = Array.isArray(data.assets) ? data.assets.find(x => /\.apk$/i.test(x.name)) : null;
    const summaryVersion = document.getElementById('summaryVersion');
    const infoVersion = document.getElementById('infoVersion');
    const infoDate = document.getElementById('infoDate');
    const infoSize = document.getElementById('infoSize');
    if (summaryVersion) summaryVersion.textContent = tag;
    if (infoVersion) infoVersion.textContent = tag;
    if (published && !Number.isNaN(published.getTime()) && infoDate) {
      infoDate.textContent = published.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    }
    if (apk?.size && infoSize) infoSize.textContent = formatBytes(apk.size);
    if (apk?.browser_download_url && CONFIG.apkUrl.includes('PUT_GITHUB')) {
      CONFIG.apkUrl = apk.browser_download_url;
      setLinks();
    }
  } catch (err) {
    console.info('Using fallback release metadata.');
  }
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('in-view')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

setLinks();
hydrateReleaseMeta();
initReveal();
initHeader();
