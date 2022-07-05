"use strict";

// navbar 메뉴 스크롤에 따라 투명도 적용
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar__dark");
  } else {
    navbar.classList.remove("navbar__dark");
  }
});

// 버튼 클릭 시 스크롤 위치 변경
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// "Contact me" Button 클릭 시 처리
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Moving Scroll View 함수
function scrollIntoView(pID) {
  const scrollTo = document.querySelector(pID);
  scrollTo.scrollIntoView({ behavior: "smooth", block: "center" });
}
