document.addEventListener("DOMContentLoaded", function () {
  const hamOverlay = document.querySelector(".ham-overlay");
  const body = document.body;
  const hamburger = document.getElementById("hamburger");

  hamburger.addEventListener("click", function () {
    hamOverlay.classList.toggle("show");
    body.classList.toggle("no-scroll");
    hamburger.classList.toggle("is-active");
  });

  // Add event listeners for each link in the ham-overlay
  const hamLinks = hamOverlay.querySelectorAll("a");
  hamLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamOverlay.classList.remove("show");
      body.classList.remove("no-scroll");
      hamburger.classList.remove("is-active");
    });
  });

  // Add click event listeners to your buttons
  document.getElementById("workButton").addEventListener("click", (event) => {
    event.preventDefault();
    loadPageData("work");
  });

  document.getElementById("homeButton").addEventListener("click", (event) => {
    event.preventDefault();
    loadPageData("home");
  });

  document.getElementById("aboutButton").addEventListener("click", (event) => {
    event.preventDefault();
    loadPageData("about");
  });

  // Check if a hash in the URL to load the appropriate page
  const initialPage = window.location.hash
    ? window.location.hash.substring(1)
    : "home";
  loadPageData(initialPage);
});

// Add click event listeners to your links
document.getElementById("homeLink").addEventListener("click", (event) => {
  event.preventDefault();
  loadPageData("home");
});

document.getElementById("workLink").addEventListener("click", (event) => {
  event.preventDefault();
  loadPageData("work");
});

document.getElementById("aboutLink").addEventListener("click", (event) => {
  event.preventDefault();
  loadPageData("about");
});
// Function to load JSON content and render the page with animation
async function loadPageData(page) {
  try {
    let response, data;

    if (page === "home") {
      response = await fetch("./js/home.json");
    } else if (page === "about") {
      response = await fetch("./js/about.json");
    } else if (page === "work") {
      response = await fetch("./js/work.json");
    }

    data = await response.json();

    // Add fade-out animation to current content
    const renderContainer = document.getElementById("render-container");
    anime({
      targets: renderContainer.children,
      opacity: 0,
      duration: 500,
      easing: "easeInOutQuad",
      complete: () => {
        renderContainer.innerHTML = ""; // Clear the container after fade-out
        if (page === "home") {
          renderHome(data);
        } else if (page === "about") {
          renderAbout(data);
        } else if (page === "work") {
          renderWork(data);
        }

        // Add fade-in animation to new content
        anime({
          targets: renderContainer.children,
          opacity: 1,
          duration: 500,
          easing: "easeInOutQuad",
        });
      },
    });

    // Update the URL using pushState
    history.pushState({ page }, null, `#${page}`);
  } catch (error) {
    console.error("Error loading page data:", error);
  }
}

// Function to handle popstate event (when the back/forward button is pressed)
window.addEventListener("popstate", (event) => {
  const page = event.state ? event.state.page : "home";
  loadPageData(page);
});

// Function to render the Home page
function renderHome(homeData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML = "";

  // Render intro section
  renderIntro(homeData.intro);

  // Render buttons section
  renderButtons(homeData.buttons);

  // Render projects section
  renderProjects(homeData.projects);
}

// Function to render the About Me page
function renderAbout(aboutData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML = "";

  // Render about section
  renderAboutSection(aboutData.about);

  // Render contact section
  renderContact(aboutData.contact);
}

// Function to render the intro section
function renderIntro(introData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML += `
      <img class="me-image" src="${introData.imageSrc}" alt="a picture of me awkwardly smiling" />
      <h1 class="middle-font m-t3 f-3-3">${introData.title}</h1>
      <p class="span-40 f-1-3 m-t2">${introData.description}</p>
    `;
}

// Function to add event listeners to the buttons
function addEventListenersToButtons() {
  document.getElementById("workButton").addEventListener("click", (event) => {
    event.preventDefault();
    loadPageData("work");
  });

  document.getElementById("aboutButton").addEventListener("click", (event) => {
    event.preventDefault();
    loadPageData("about");
  });
}

// Function to render the buttons section
function renderButtons(buttonsData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML += `
      <div class="flex-row-center m-t3 m-b7">
        <a href="#" id="workButton" class="primary-btn" >Check Out My Work</a>
        <a href="#" id="aboutButton" class="primary-btn">More About Me</a>
      </div>
    `;

  // Add event listeners after rendering buttons
  addEventListenersToButtons();
}

// render the projects section
function renderProjects(projectsData) {
  const renderContainer = document.getElementById("render-container");

  projectsData.forEach((project) => {
    // Create a new project container
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container", "m-t2");

    // content to the project container
    projectContainer.innerHTML = `
        <div class="top-bar">
          <div class="inside-bar">
            <h1>${project.date}</h1>
            <img class="chevron-down" src="./svg/chevron-down.svg" alt="#" />
          </div>
        </div>

        <div class="title-bar m-t2 span-100">
          <img src="./svg/plus.png" alt="#" />
          <span>
            <h1>${project.title}</h1>
            <p class="dark-text">${project.subtitle}</p>
          </span>
        </div>

        <div class="project-div m-t1">
          <img src="${project.imageSrc}" alt="#" />

          <span class="project-links">
            <h1>${project.projectTitle}</h1>
            <p class="m-t-0-5">${project.projectDescription}</p>
            <a class="flex-this m-t1" href="${project.projectLink}">
              <img src="./svg/link.svg" alt="#" /> Website
            </a>
          </span>
        </div>
      `;

    // Append the project container to the render container
    renderContainer.appendChild(projectContainer);

    const insideBox = projectContainer.querySelector(".inside-bar");
    const titleBar = projectContainer.querySelector(".title-bar");
    const projectDiv = projectContainer.querySelector(".project-div");

    insideBox.addEventListener("click", () =>
      collapseProject(projectContainer, titleBar, projectDiv)
    );
  });
}

// render the Work page
function renderWork(workData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML = `
    <h1 class="f-3 semi-bold work-class-title m-t7">${
      workData.galleryTitle
    }</h1>
    <div class="work-container">
      ${workData.years
        .map(
          (year) => `
        <div class="year-tag  f-1-7 m-t2">${year.year}</div>
        <div class="work-grid-container m-t3">
          ${year.projects
            .map(
              (project) => `
            <div class="project-work-box">
              <img src="${project.imageSrc}" alt="#" />
              <p class="work-title m-t1">${project.title}</p>
              <div class="role-tags">
                ${project.roles.map((role) => `<p>${role}</p>`).join("")}
              </div>
              <p class="work-content m-t1">${project.description}</p>
              <div class="link-container m-t2">
                <a class="link-btn" target="_blank" href="${
                  project.website
                }"> <img src="../svg/globe.svg" alt="#" />  Website</a>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

//  render the About Me section
function renderAboutSection(aboutData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML += `
      <div class="about-container">
        <img class="about-img" src="${aboutData.imageSrc}" alt="#" />
        <h1 class="about-title m-t3">${aboutData.title}</h1>
        <p class="m-t1">${aboutData.description}</p>
      </div>
    `;
}

//  render contact information
function renderContact(contactData) {
  const renderContainer = document.getElementById("render-container");
  renderContainer.innerHTML += `
      <h1 class="m-t3 about-title about-title-two">Contact</h1>
      ${contactData
        .map(
          (contact) => `
            <a href="#" class="m-t1 contact-box">
              <p>${contact.type}</p>
              <h1>${contact.value}</h1>
            </a>`
        )
        .join("")}
    `;
}

// check for  hash in the URL to load the appropriate page
const initialPage = window.location.hash
  ? window.location.hash.substring(1)
  : "home";
loadPageData(initialPage);

// COLLAPSE ITEM FUNCTION
function collapseProject(container, titleBar, projectDiv) {
  container.classList.toggle("collapse-project");
  titleBar.classList.toggle("hide-all");
  projectDiv.classList.toggle("hide-all");
}

// Add click event listeners to your buttons
document.getElementById("workButton").addEventListener("click", (event) => {
  event.preventDefault();
  loadPageData("work");
});

document.getElementById("aboutButton").addEventListener("click", (event) => {
  event.preventDefault();
  loadPageData("about");
});
