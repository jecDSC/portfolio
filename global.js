console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$('nav a');

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname,
);

currentLink?.classList.add('current');

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact'},
  { url: 'CV/', title: 'CV'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"
  : "/portfolio/";

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = !url.startsWith('http') ? BASE_PATH + url : url;
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}

