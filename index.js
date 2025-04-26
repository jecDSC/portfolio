import { fetchJSON, renderProjects } from './global.js';

const projects = await fetchJSON('lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');

renderProjects(latestProjects, projectsContainer, 'h2');

export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}

const githubData = await fetchGitHubData('jecDSC');
const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
          <dl class="stats">
            <dt class="stats">Public Repos:</dt><dd class="stats">${githubData.public_repos}</dd>
            <dt class="stats">Public Gists:</dt><dd class="stats">${githubData.public_gists}</dd>
            <dt class="stats">Followers:</dt><dd class="stats">${githubData.followers}</dd>
            <dt class="stats">Following:</dt><dd class="stats">${githubData.following}</dd>
          </dl>
      `;
}