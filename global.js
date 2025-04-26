console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$('nav a');

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname,
);

// currentLink?.classList.add('current');

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
  
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  else {
    a.target = "_blank"
  }
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value='light dark'>Auto</option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
		</select>
	</label>`,
);

let select = document.querySelector(".color-scheme")
select.addEventListener('input', function (event) {
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  console.log('color scheme changed to', event.target.value);
  localStorage.colorScheme = event.target.value
});

if (localStorage.colorScheme != null) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  console.log('color scheme changed to', localStorage.colorScheme);
}

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project, containerElement) {
  containerElement.innerHTML = '';
  const article = document.createElement('article');
  article.innerHTML = `<h3>${project.title}</h3><img src="${project.image}" alt="${project.title}"><p>${project.description}</p>`;
  containerElement.appendChild(article);
}
