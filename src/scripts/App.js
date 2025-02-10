let App = document.querySelector("#App");

App.addEventListener("change", () => {
  isMenuActive();
});

for (const child of App.children) {
  child.addEventListener("change", (e) => {
    App.dispatchEvent(new Event("change"));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const headerMobile = document.querySelector('.header--mobile');
  const headerEvent = document.querySelector('.header--event');
  const headerBlank = document.querySelector('.header--blank');
  const stickyOffset = headerMobile.offsetTop;
  // const headerDesk = document.querySelector('.header--desktop--container');
  const header = document.querySelector('header');
  // const stickyDeskOffset = headerDesk.offsetTop;

  // 監聽滾動事件
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > stickyOffset) {
      headerMobile.classList.add('is-fixed');
      headerEvent.classList.add('is-fixed');
      headerBlank.classList.add('d-block');
    } else {
      headerMobile.classList.remove('is-fixed');
      headerEvent.classList.remove('is-fixed');
      headerBlank.classList.remove('d-block');
    }

    // if (window.pageYOffset > stickyDeskOffset) {
    //   header.classList.add('is-active');
    // } else {
    //   header.classList.remove('is-active');
    // }
  });

  // menu toggle 點擊事件
  document.querySelector(".menu--toggle").addEventListener("click", () => {
    const isMenuActive = document.getElementById("isMenuActive");
    // 先取得當前狀態
    const willBeActive = !isMenuActive.checked;

    // 切換狀態
    isMenuActive.checked = willBeActive;
    isMenuActive.dispatchEvent(new Event("change"));

    // 根據切換後的狀態決定是否添加或移除 class
    if (willBeActive) {
      headerMobile.classList.add('is-fixed');
      headerEvent.classList.add('is-fixed');
      headerBlank.classList.add('d-block');
    } else {
      headerMobile.classList.remove('is-fixed');
      headerEvent.classList.remove('is-fixed');
      headerBlank.classList.remove('d-block');
    }
  });
});

const isMenuActive = function (menu) {
  let val = document.getElementById("isMenuActive").checked;
  if (val) {
    document.querySelector(".menu--toggle").classList.add("is-active");
    document.querySelector(".drawer").classList.add("is-active");
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector(".menu--toggle").classList.remove("is-active");
    document.querySelector(".drawer").classList.remove("is-active");
    document.querySelector("body").style.overflow = "auto";
  }
};

let scrollPos = 0;
window.addEventListener("scroll", function () {
  if (document.body.getBoundingClientRect().top > scrollPos)
    document.getElementById("isScrollDown").checked = false;
  else document.getElementById("isScrollDown").checked = true;
  scrollPos = document.body.getBoundingClientRect().top;
});

window.addEventListener("scroll", () => {
  // isHeaderScrolled();
  // isButtonGoTopScrolled();
});

const isHeaderScrolled = function () {
  const el = document.querySelector("header");
  if (
    window.scrollY > 180 &&
    !document.getElementById("isScrollDown").checked
  ) {
    el.classList.add("is-active");
  } else {
    el.classList.remove("is-active");
  }
};

// const isButtonGoTopScrolled = function () {
//   const el = document.querySelector(".button--go-top");
//   if (window.scrollY > 180) {
//     el.classList.add("is-active");
//   } else {
//     el.classList.remove("is-active");
//   }
// };