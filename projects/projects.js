import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

let header = document.querySelector(".projects-title");
header.innerHTML = `${projects.length} Projects`;

// lab 5 from here onwards

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;
  // filter projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  // render filtered projects
  renderProjects(filteredProjects, projectsContainer, 'h2');
});

function renderPieChart(projectsGiven) {
    let newSVG = d3.select('svg');
    newSVG.selectAll('path').remove();
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    
    let rolledData = d3.rollups(
      projects,
      (v) => v.length,
      (d) => d.year,
    );
    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });
  // re-calculate slice generator, arc data, arc, etc.
  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcData = sliceGenerator(data);
  let arcs = arcData.map((d) => arcGenerator(d));

  let total = 0;
  for (let d of data) {
    total += d;
  }
  let angle = 0;
  for (let d of data) {
    let endAngle = angle + (d / total) * 2 * Math.PI;
    arcData.push({ startAngle: angle, endAngle });
    angle = endAngle;
  }

  arcs.forEach((arc) => {
    d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');
});


let colors = d3.scaleOrdinal(d3.schemeTableau10);
arcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx))
})

let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend
    .append('li')
    .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
    .attr('class', "legend-items")
    .html(`<span class="swatch" background-color=--color:${colors(idx)}></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});
}

// Call this function on page load
renderPieChart(projects);

searchInput.addEventListener('change', (event) => {
  let filteredProjects = setQuery(event.target.value);
  // re-render legends and pie chart when event triggers
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});