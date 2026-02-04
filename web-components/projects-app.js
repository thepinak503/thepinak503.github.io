import { h, render } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

const DEFAULT_PROJECTS = [
    { id: 'p1', name: 'Project 1', desc: 'A brief description of the first project highlighting goals and outcomes.', tech: ['HTML','CSS','JavaScript'], live: '#', code: '#', likes: 0 },
    { id: 'p2', name: 'Project 2', desc: 'A concise summary of the second project with a focus on impact.', tech: ['Python','Flask'], live: '#', code: '#', likes: 0 },
    { id: 'p3', name: 'Project 3', desc: 'A short overview of the third project and its key features.', tech: ['Java','Spring Boot'], live: '#', code: '#', likes: 0 }
];

function readLocal(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function writeLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function ProjectsApp() {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('name'); // name | likes
    const [likes, setLikes] = useState(() => readLocal('pd_likes', {}));
    const [projects] = useState(DEFAULT_PROJECTS);

    useEffect(() => { writeLocal('pd_likes', likes); }, [likes]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = projects.filter(p => !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tech.join(' ').toLowerCase().includes(q));
        if (sortBy === 'likes') list = list.sort((a,b) => (likes[b.id]||0) - (likes[a.id]||0));
        else list = list.sort((a,b) => a.name.localeCompare(b.name));
        return list;
    }, [projects, query, sortBy, likes]);

    const toggleLike = (id) => {
        setLikes(prev => {
            const next = { ...prev };
            next[id] = (next[id] || 0) + 1;
            return next;
        });
    };

    return (
        h('div', {},
            h('div', { class: 'projects-controls' },
                h('input', { type: 'search', placeholder: 'Search projects…', value: query, onInput: e => setQuery(e.currentTarget.value), 'aria-label': 'Search projects' }),
                h('select', { value: sortBy, onChange: e => setSortBy(e.currentTarget.value), 'aria-label': 'Sort projects' },
                    h('option', { value: 'name' }, 'Sort: Name'),
                    h('option', { value: 'likes' }, 'Sort: Likes')
                ),
                h('span', { 'aria-live': 'polite' }, `${filtered.length} shown`)
            ),
            h('div', { class: 'project-gallery' },
                filtered.map(p => (
                    h('md-elevated-card', { key: p.id, class: 'project-card', tabIndex: 0 },
                        h('div', { class: 'project-card__body' },
                            h('h3', {}, p.name),
                            h('p', {}, p.desc),
                            h('p', { class: 'tech' }, p.tech.join(' · '))
                        ),
                        h('div', { class: 'project-card__actions' },
                            h('md-filled-tonal-button', { href: p.live, target: '_blank', rel: 'noopener', 'aria-label': `Open ${p.name}` }, 'Live'),
                            h('md-outlined-button', { href: p.code, target: '_blank', rel: 'noopener', 'aria-label': `View code for ${p.name}` }, 'Code'),
                            h('button', { class: 'like-btn', type: 'button', onClick: () => toggleLike(p.id), 'aria-pressed': false },
                                '❤ ', (likes[p.id]||0)
                            )
                        )
                    )
                ))
            )
        )
    );
}

const mount = document.getElementById('projects-app');
if (mount) {
    render(h(ProjectsApp, {}), mount);
}


