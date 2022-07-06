"use strict";

// # navbar 메뉴 스크롤에 따라 투명도 적용
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar__dark");
  } else {
    navbar.classList.remove("navbar__dark");
  }

  navbarMenu.classList.remove("open");
});

// # 버튼 클릭 시 스크롤 위치 변경
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// # navbar 토글버튼 처리
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// # "Contact me" Button 클릭 시 처리
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// # 스크롤 시 Home 화면 투명도 적용
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// # 스크롤 시 "Arrow up" 버튼 활성화/비활성화
const arrowUp = document.querySelector(".arrow__up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// # Arrow-up 버튼 클릭 시 화면 이동
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// # 프로젝트 버튼 클릭 이벤트 적용
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }

  // # 버튼 active 상태 변경
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");

  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  // # 버튼 클릭 시 필터 및 애니매이션 적용
  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// # 스크롤 시 navmenu 활성화
// 1. 모든 섹션 요소들 가지고 온다
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// 2. IntersectionObserver를 이용해 모든 섹션들 관찰
// 3. 보여지는 섹션에 해당하는 메뉴 아이템 활성화
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(pSelected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = pSelected;
  selectedNavItem.classList.add("active");
}

// # Moving Scroll View 함수
function scrollIntoView(pID) {
  const scrollTo = document.querySelector(pID);
  scrollTo.scrollIntoView({ behavior: "smooth", block: "start" });
  selectNavItem(navItems[sectionIds.indexOf(pID)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 아래로 스크롤
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }

  selectNavItem(navItems[selectedNavIndex]);
});
