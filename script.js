const CATALOGUE_URL = "https://www.clcinterior.com";
const TIKTOK_URL = "https://www.tiktok.com/@wemimoney_";

const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast-message");

let toastTimer;

function showToast(message) {
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

async function shareCatalogue() {
  const data = {
    title: "CLC Interiors Catalogue",
    text: "Explore the CLC Interiors catalogue.",
    url: CATALOGUE_URL,
  };

  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(CATALOGUE_URL);
    showToast("Catalogue link copied.");
  } catch {
    showToast(CATALOGUE_URL);
  }
}

document.querySelectorAll("[data-share]").forEach((button) => {
  button.addEventListener("click", shareCatalogue);
});

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const qrTarget = document.getElementById("tiktokQr");

if (qrTarget && window.QRCode) {
  new QRCode(qrTarget, {
    text: TIKTOK_URL,
    width: 175,
    height: 175,
    colorDark: "#111111",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

/* =========================================
   TRANSFORMATION PROJECTS
========================================= */

const IMAGE_ROOT = "./assets/images";

const projects = [
  {
    id: 0,
    category: "sofas",
    type: "SOFA",
    title: "Sofa Frame to Finish · Demo",
    before: `${IMAGE_ROOT}/sofa_1.jpeg`,
    after: `${IMAGE_ROOT}/sofa_2.jpeg`,
    beforeAlt: "Unfinished sofa frame, stock example of furniture making",
    afterAlt: "Finished sofa, stock example",
    beforeCaption: "Making process",
    afterCaption: "Finished result",
    description: "Stock photo example showing an unfinished sofa frame and a finished upholstered result.",
  },
  {
    id: 1,
    category: "beds",
    type: "BED",
    title: "Bed Frame to Finish · Demo",
    before: `${IMAGE_ROOT}/bed_1.jpeg`,
    after: `${IMAGE_ROOT}/bed_2.jpeg`,
    beforeAlt: "Unfinished bed frame, stock example of furniture making",
    afterAlt: "Finished upholstered bed, stock example",
    beforeCaption: "Making process",
    afterCaption: "Finished result",
    description: "Stock photo example showing a bed frame during construction and the finished bed.",
  },
  {
    id: 2,
    category: "dining",
    type: "DINING",
    title: "Dining Furniture · Demo",
    before: `${IMAGE_ROOT}/stock-dining-making.jpg`,
    after: `${IMAGE_ROOT}/dining_2.jpeg`,
    beforeAlt: "Carpenter working in a furniture workshop, stock example",
    afterAlt: "Finished dining furniture, stock example",
    beforeCaption: "Making process",
    afterCaption: "Finished result",
    description: "Stock photos illustrating furniture making and a finished dining setting; they are not the same project.",
  },
  {
    id: 3,
    category: "sofas",
    type: "SOFA",
    title: "Sofa Upholstery · Demo",
    before: `${IMAGE_ROOT}/stock-sofa-making.jpg`,
    after: `${IMAGE_ROOT}/stock-sofa-finished.jpg`,
    beforeAlt: "Workers assembling sofa cushions in a workshop, stock photo",
    afterAlt: "Finished sofa in a living room, stock photo",
    beforeCaption: "Making process",
    afterCaption: "Finished result",
    description: "Stock photos showing upholstery work and a finished sofa; they are not the same project.",
  },
];

const featured = document.querySelector("[data-featured]");
const stage = document.querySelector("[data-stage]");
const beforeImage = document.querySelector("[data-stage-before]");
const afterImage = document.querySelector("[data-stage-after]");
const stageLabel = document.querySelector("[data-stage-label]");
const stageCaption = document.querySelector("[data-stage-caption]");
const stageCount = document.querySelector("[data-stage-count]");
const stageProgress = document.querySelector("[data-stage-progress]");
const stageViewButtons = document.querySelectorAll("[data-stage-view]");
const projectIndex = document.querySelector("[data-project-index]");
const projectType = document.querySelector("[data-project-type]");
const projectTitle = document.querySelector("[data-project-title]");
const projectDescription = document.querySelector("[data-project-description]");
const transformationGrid = document.querySelector("[data-transformation-grid]");

let activeProject = 0;
let showingAfter = false;

function createTransformationCard(project) {
  const card = document.createElement("article");

  card.className = "transformation-card reveal-up";

  card.dataset.category = project.category;
  card.dataset.project = String(project.id);

  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View ${project.title} transformation`);

  card.innerHTML = `
    <div class="mini-comparison">
      <img
        class="mini-before"
        src="${project.before}"
        alt="${project.beforeAlt}"
        loading="lazy"
      >

      <img
        class="mini-after"
        src="${project.after}"
        alt="${project.afterAlt}"
        loading="lazy"
      >

    <span>HOW IT’S MADE · FINISHED RESULT</span>
    </div>

    <div class="card-meta">
      <span>
        ${String(project.id + 1).padStart(2, "0")} /
        ${projects.length} · ${project.type}
      </span>

      <h3>${project.title}</h3>
    </div>
  `;

  card.addEventListener("click", () => {
    renderProject(project.id, true);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      renderProject(project.id, true);
    }
  });

  return card;
}

function renderTransformationCards() {
  if (!transformationGrid) return;

  transformationGrid.replaceChildren();

  projects.forEach((project) => {
    const card = createTransformationCard(project);
    transformationGrid.appendChild(card);
  });
}

function setStageState(after) {
  showingAfter = after;

  if (!stage) return;

  const project = projects[activeProject];

  stage.classList.toggle("is-after", after);

  if (stageLabel) {
    stageLabel.textContent = after ? "FINISHED RESULT" : "HOW IT’S MADE";
  }

  if (stageCaption) {
    stageCaption.textContent = after
      ? project.afterCaption
      : project.beforeCaption;
  }

  stageViewButtons.forEach((button) => {
    const selected = button.dataset.stageView === (after ? "finished" : "making");
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function renderProject(index, shouldScroll = false) {
  const project = projects[index];

  if (!project) return;

  activeProject = index;

  if (featured) {
    featured.dataset.category = project.category;
  }

  if (beforeImage) {
    beforeImage.src = project.before;
    beforeImage.alt = project.beforeAlt;
  }

  if (afterImage) {
    afterImage.src = project.after;
    afterImage.alt = project.afterAlt;
  }

  const number = String(index + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  if (projectIndex) {
    projectIndex.textContent = `${number} / ${total}`;
  }

  if (stageCount) {
    stageCount.textContent = `${number} / ${total}`;
  }

  if (projectType) {
    projectType.textContent = project.type;
  }

  if (projectTitle) {
    projectTitle.textContent = project.title;
  }

  if (projectDescription) {
    projectDescription.textContent = project.description;
  }

  setStageState(false);

  if (shouldScroll && featured) {
    featured.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

function applyFilter(filter) {
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    const active = tab.dataset.filter === filter;

    tab.classList.toggle("active", active);

    tab.setAttribute("aria-selected", active ? "true" : "false");
  });

  document.querySelectorAll(".transformation-card").forEach((card) => {
    const shouldHide = filter !== "all" && card.dataset.category !== filter;

    card.classList.toggle("hidden-card", shouldHide);
  });

  const firstProject =
    filter === "all"
      ? 0
      : projects.findIndex((project) => project.category === filter);

  if (firstProject >= 0) {
    renderProject(firstProject);
  }
}

renderTransformationCards();

document.querySelectorAll(".filter-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    applyFilter(tab.dataset.filter);
  });
});

stageViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setStageState(button.dataset.stageView === "finished");
  });
});

renderProject(0);

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal-up, .reveal-media");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -50px",
    },
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;

    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
