const filterButtons = document.querySelectorAll(".filter-chip");
const lessonCards = document.querySelectorAll(".lesson-card");
const searchInput = document.querySelector("#lesson-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";
function updateLessons() {
  const query = searchInput.value.trim().toLocaleLowerCase("uz");
  let visible = 0;
  lessonCards.forEach((card) => {
    const gradeMatches = activeFilter === "all" || card.dataset.grade === activeFilter;
    const textMatches = card.dataset.search.toLocaleLowerCase("uz").includes(query) || card.querySelector("h3").textContent.toLocaleLowerCase("uz").includes(query);
    card.hidden = !(gradeMatches && textMatches);
    if (!card.hidden) visible++;
  });
  emptyState.hidden = visible > 0;
}
filterButtons.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle("selected", item === button));
  updateLessons();
}));
searchInput.addEventListener("input", updateLessons);
document.querySelectorAll(".class-card").forEach((card) => card.addEventListener("click", () => {
  activeFilter = card.dataset.grade;
  filterButtons.forEach((item) => item.classList.toggle("selected", item.dataset.filter === activeFilter));
  updateLessons();
}));
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  document.querySelector(".main-nav").classList.toggle("nav-open", !isOpen);
});
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
