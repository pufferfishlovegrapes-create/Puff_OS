import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BatteryMedium, CalendarDays, ChevronRight, Cloud, Folder, Globe as Globe2, Image, Maximize2, Minus, Music2, Search, Settings, Sparkles, StickyNote, Terminal, Wifi, X } from 'lucide-react';
import './styles.css';

const appCatalog = {
  browser: { title: 'Puff Browser', icon: Globe2, tone: 'blue', description: 'A calmer way to wander the web.' },
  files: { title: 'My Files', icon: Folder, tone: 'yellow', description: 'Everything you keep close.' },
  notes: { title: 'Notes', icon: StickyNote, tone: 'mint', description: 'Small thoughts, big ideas.' },
  gallery: { title: 'Gallery', icon: Image, tone: 'peach', description: 'A little window into your world.' },
  terminal: { title: 'Puff Terminal', icon: Terminal, tone: 'ink', description: 'Make something happen.' },
  music: { title: 'Puff Music', icon: Music2, tone: 'pink', description: 'Soft sounds for soft focus.' },
};

function PuffMark({ small = false }) {
  return <img className={`puff-mark ${small ? 'small' : ''}`} src="/Screenshot_2026-01-05_09.56.28.png" alt="Puff logo" />;
}

function AppIcon({ appKey, onClick, size = 'normal' }) {
  const app = appCatalog[appKey];
  const Icon = app.icon;
  return <button className={`app-icon ${size} ${app.tone}`} onClick={onClick} aria-label={`Open ${app.title}`}><span><Icon size={size === 'large' ? 27 : 20} strokeWidth={1.8} /></span><strong>{app.title.replace('Puff ', '')}</strong></button>;
}

function Window({ appKey, windowData, onClose, onMinimize, onMaximize, onFocus, zIndex }) {
  const app = appCatalog[appKey];
  const Icon = app.icon;
  return <section className={`app-window ${windowData.minimized ? 'is-minimized' : ''} ${windowData.maximized ? 'is-maximized' : ''}`} style={{ zIndex }} onMouseDown={() => onFocus(appKey)}>
    <header className="window-bar">
      <div className="window-title"><span className={`mini-app-icon ${app.tone}`}><Icon size={15} /></span><span>{app.title}</span></div>
      <div className="window-controls">
        <button onClick={(event) => { event.stopPropagation(); onMinimize(appKey); }} aria-label="Minimize"><Minus size={15} /></button>
        <button onClick={(event) => { event.stopPropagation(); onMaximize(appKey); }} aria-label="Maximize"><Maximize2 size={13} /></button>
        <button className="close" onClick={(event) => { event.stopPropagation(); onClose(appKey); }} aria-label="Close"><X size={15} /></button>
      </div>
    </header>
    <WindowContent appKey={appKey} />
  </section>;
}

function WindowContent({ appKey }) {
  if (appKey === 'browser') return <div className="window-content browser-content"><div className="browser-nav"><span className="browser-back">‹</span><span className="browser-back muted">›</span><div className="address"><Search size={13} /> <span>puff://home</span></div><span className="browser-dots">•••</span></div><div className="browser-home"><div className="browser-brand"><PuffMark small /><span>Puff</span></div><h2>Take a deep breath.<br /><em>You're home.</em></h2><div className="search-box"><Search size={16} /><span>Search the web with Puff</span></div><div className="browser-links"><span><Sparkles size={14} /> Daily spark</span><span><Cloud size={14} /> Soft forecast</span></div></div></div>;
  if (appKey === 'files') return <div className="window-content files-content"><aside className="files-sidebar"><b>Places</b><span className="active"><Folder size={15} /> Home</span><span><Image size={15} /> Pictures</span><span><Cloud size={15} /> Puff Cloud</span><div className="storage"><div><span>Storage</span><b>42%</b></div><i><u /></i><small>8.4 GB of 20 GB used</small></div></aside><div className="file-grid"><div className="files-heading"><div><h3>Home</h3><p>4 items</p></div><button className="new-button">+ New</button></div><div className="file-cards"><FileCard icon="folder" name="Projects" detail="Folder" /><FileCard icon="folder" name="Screenshots" detail="Folder" /><FileCard icon="image" name="puff-day.png" detail="2.4 MB · PNG" /><FileCard icon="note" name="welcome.txt" detail="1.1 KB · Text" /></div></div></div>;
  if (appKey === 'notes') return <div className="window-content notes-content"><aside className="notes-list"><button className="new-note">+ New note</button><div className="note-preview selected"><b>Welcome to Puff</b><span>Make yourself at home...</span><small>Just now</small></div><div className="note-preview"><b>Ideas for later</b><span>Build a kinder internet...</span><small>Yesterday</small></div></aside><article className="note-editor"><div className="note-meta">Edited just now <span>•••</span></div><h2>Welcome to Puff</h2><p>Make yourself at home.</p><p>Puff is a little web OS designed to feel calm, friendly, and yours. Open a window, move things around, and take your time.</p><p className="note-signoff">— puff team</p></article></div>;
  if (appKey === 'gallery') return <div className="window-content gallery-content"><div className="gallery-head"><div><h3>Gallery</h3><p>Recent memories</p></div><button className="view-button">All photos <ChevronRight size={14} /></button></div><div className="gallery-grid"><div className="photo photo-one"><span>soft mornings</span></div><div className="photo photo-two"><span>little escapes</span></div><div className="photo photo-three"><span>slow days</span></div><div className="photo photo-four"><span>good company</span></div></div></div>;
  if (appKey === 'terminal') return <div className="window-content terminal-content"><p><span className="green">puff@desktop</span> <span className="dim">~</span> $ neofetch</p><p className="terminal-art">⠀⠀⠀⠀⠀⣠⣤⣄<br />⠀⠀⠀⠀⣼⣿⣿⣿⣦<br />⠀⠀⠀⣸⣿⣿⣿⣿⣿<br />⠀⠀⢀⣿⣿⣿⣿⣿⣿<br />⠀⠀⠘⠿⠿⠿⠿⠿⠿</p><p><span className="green">OS</span> Puff OS 1.0<br /><span className="green">Mood</span> cozy<br /><span className="green">Uptime</span> feeling fresh</p><p><span className="green">puff@desktop</span> <span className="dim">~</span> $ <span className="cursor">▌</span></p></div>;
  return <div className="window-content music-content"><div className="album-art"><Music2 size={42} /></div><p className="eyebrow">NOW PLAYING</p><h2>Morning tide</h2><p className="artist">Puff radio · 24 min left</p><div className="progress"><i /></div><div className="time-row"><span>02:14</span><span>04:32</span></div><div className="player-controls"><button>↶</button><button className="play">▶</button><button>↷</button></div></div>;
}

function FileCard({ icon, name, detail }) { const Icon = icon === 'folder' ? Folder : icon === 'image' ? Image : StickyNote; return <div className="file-card"><div className={`file-illustration ${icon}`}><Icon size={25} /></div><b>{name}</b><span>{detail}</span></div>; }

function StartMenu({ onOpen, onClose }) {
  return <div className="start-menu"><div className="start-head"><PuffMark small /><div><b>Good afternoon, Alex</b><span>What will you make today?</span></div><button onClick={onClose}><X size={16} /></button></div><div className="start-search"><Search size={15} /><span>Search apps, files, and more</span></div><p className="menu-label">Pinned</p><div className="pinned-grid">{Object.keys(appCatalog).map((key) => <AppIcon key={key} appKey={key} onClick={() => onOpen(key)} size="large" />)}</div><div className="start-footer"><span><Settings size={15} /> Settings</span><span><PowerIcon /> Sleep</span></div></div>;
}
function PowerIcon() { return <span className="power-icon">◒</span>; }

function App() {
  const [openWindows, setOpenWindows] = useState(['browser', 'notes']);
  const [windowState, setWindowState] = useState({ browser: { minimized: false, maximized: false }, notes: { minimized: false, maximized: false } });
  const [activeKey, setActiveKey] = useState('browser');
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => { const id = setInterval(() => setTime(new Date()), 30000); return () => clearInterval(id); }, []);
  const formattedTime = useMemo(() => time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), [time]);
  const formattedDate = useMemo(() => time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }), [time]);
  const openApp = (key) => { setOpenWindows((current) => current.includes(key) ? current : [...current, key]); setWindowState((current) => ({ ...current, [key]: { minimized: false, maximized: false } })); setActiveKey(key); setStartOpen(false); };
  const closeApp = (key) => { setOpenWindows((current) => current.filter((item) => item !== key)); setActiveKey((current) => current === key ? 'browser' : current); };
  const updateWindow = (key, update) => setWindowState((current) => ({ ...current, [key]: { ...current[key], ...update } }));

  return <main className="desktop" onClick={() => startOpen && setStartOpen(false)}><div className="wallpaper-glow glow-one" /><div className="wallpaper-glow glow-two" /><div className="desktop-grain" />
    <header className="topbar"><div className="brand"><PuffMark small /><span>Puff</span></div><div className="topbar-center">{formattedDate}<span className="topbar-dot" /> <span className="weather"><Cloud size={14} /> 68°F</span></div><div className="system-tray"><Wifi size={16} /><BatteryMedium size={17} /><span>{formattedTime}</span><button className="profile-dot">A</button></div></header>
    <div className="desktop-area" onClick={() => setStartOpen(false)}><div className="desktop-icons"><AppIcon appKey="files" onClick={() => openApp('files')} /><AppIcon appKey="browser" onClick={() => openApp('browser')} /><AppIcon appKey="gallery" onClick={() => openApp('gallery')} /><AppIcon appKey="terminal" onClick={() => openApp('terminal')} /></div>{openWindows.map((key) => <Window key={key} appKey={key} windowData={windowState[key] || { minimized: false, maximized: false }} onClose={closeApp} onMinimize={(app) => updateWindow(app, { minimized: !windowState[app].minimized })} onMaximize={(app) => updateWindow(app, { maximized: !windowState[app].maximized, minimized: false })} onFocus={setActiveKey} zIndex={activeKey === key ? 10 : 2} />)}</div>
    {startOpen && <div onClick={(event) => event.stopPropagation()}><StartMenu onOpen={openApp} onClose={() => setStartOpen(false)} /></div>}
    <footer className="taskbar" aria-label="Puff taskbar"><button className={`launcher ${startOpen ? 'selected' : ''}`} onClick={(event) => { event.stopPropagation(); setStartOpen(!startOpen); }} aria-label="Open app launcher"><PuffMark small /></button><div className="task-apps">{openWindows.map((key) => { const Icon = appCatalog[key].icon; return <button key={key} className={`task-app ${activeKey === key ? 'active' : ''}`} onClick={() => { setActiveKey(key); updateWindow(key, { minimized: false }); }}><Icon size={17} /><span>{appCatalog[key].title}</span></button>; })}</div><div className="task-right"><CalendarDays size={16} /><span>Tuesday, October 14</span></div></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
