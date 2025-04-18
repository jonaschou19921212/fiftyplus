import "../sass/global.sass";
import { setupValidation } from "./valid.js";
import { Chart } from "chart.js";
window.scrollToElById = function (id) {
  let element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
  });
};

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import { register } from "swiper/element/bundle";
import { inject } from "vue";
register();

if (document.querySelector(".swiper--banner swiper-container")) {
  const swiperBannerEl = document.querySelector(
    ".swiper--banner swiper-container"
  );
  const params = {
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    // autoplay: {
    //   delay: 5000,
    // },
    slidesPerView: "auto",
    spaceBetween: 40,
    pagination: {
      el: ".swiper--banner .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    navigation: true,
    navigation: {
      nextEl: ".swiper--banner .swiper-button-next",
      prevEl: ".swiper--banner .swiper-button-prev",
    },
    injectStyles: [
      `
      :host .swiper {
        overflow: hidden;
      }
      :host {
        --swiper-theme-color: #ede73c;
        --swiper-navigation-size: 20px;
      }
      `,
    ],
  };
  // Object.assign(swiperBannerEl, params)
  // swiperBannerEl.initialize();
}

const swipers = document.querySelectorAll(".swiper--mobile");
swipers.forEach((swiper) => {
  const params = {
    loop: true,
    navigation: {
      nextEl: swiper.querySelector(".swiper-navigation .swiper-button-next"),
      prevEl: swiper.querySelector(".swiper-navigation .swiper-button-prev"),
    },
    injectStyles: [
      `
      :host .swiper {
        overflow: hidden;
      }
      :host {
        --swiper-theme-color: #ede73c;
        --swiper-navigation-size: 20px;
      }
      `,
    ],
  };
  // const el = swiper.querySelector('swiper-container')
  // Object.assign(el, params)
  // el.initialize();
});

if (document.querySelector(".swiper--album swiper-container")) {
  const swiperAlbumEl = document.querySelector(
    ".swiper--album swiper-container"
  );
  const paramsAlbum = {
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    slidesPerView: "auto",
    // pagination: {
    //   el: '.swiper--album .swiper-pagination',
    //   clickable: true,
    // },
    navigation: true,
    navigation: {
      nextEl: ".swiper--album .swiper-button-next",
      prevEl: ".swiper--album .swiper-button-prev",
    },
    injectStyles: [
      `
      :host .swiper {
        overflow: hidden;
      }
      :host {
        --swiper-theme-color: #ede73c;
        --swiper-navigation-size: 20px;
      }
      `,
    ],
  };

  // Object.assign(swiperAlbumEl, paramsAlbum)
  // swiperAlbumEl.initialize();
}

if (document.querySelector(".swiper--weekly swiper-container")) {
  const swiperWeeklyEl = document.querySelector(
    ".swiper--weekly swiper-container"
  );
  const paramsWeekly = {
    slideToClickedSlide: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
    navigation: true,
    // pagination: {
    //   el: '.swiper--album .swiper-pagination',
    //   clickable: true,
    // },
    injectStyles: [
      `
      :host .swiper {
        overflow: hidden;
      }
      :host {
        --swiper-theme-color: #ede73c;
        --swiper-navigation-size: 20px;
      }
      `,
    ],
  };

  // Object.assign(swiperWeeklyEl, paramsWeekly)
  // swiperWeeklyEl.initialize();
}
window.togglePassword = function (iconClass, targetClass) {
  const passwordInput = document.getElementById(targetClass);
  const toggleIcon = document.getElementById(iconClass);

  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // 顯示密碼
    toggleIcon.classList.remove("bi-eye"); // 更改圖標
    toggleIcon.classList.add("bi-eye-slash"); // 使用隱藏圖標
  } else {
    passwordInput.type = "password"; // 隱藏密碼
    toggleIcon.classList.remove("bi-eye-slash"); // 更改圖標
    toggleIcon.classList.add("bi-eye"); // 使用顯示圖標
  }
};

window.toggleFontSize = function () {
  const body = document.body;
  const html = document.documentElement;
  const currentFontSize = parseFloat(getComputedStyle(body).fontSize);
  let newSize = currentFontSize === 18 ? 20 : 18;
  body.style.fontSize = newSize + "px";
  html.style.fontSize = newSize + "px";
};

window.gotoSnippet = function (e) {
  const targets = document.querySelectorAll(".card--snippet--preview");
  const imgsrc = e.children[0].children[0].src;
  let text = "";
  if (!!e.children[1]) {
    text = e.children[1].children[0].textContent;
  }
  targets.forEach((target) => {
    target.children[0].children[0].src = imgsrc;

    if (!!e.children[1]) {
      target.children[1].children[0].textContent = text;
    }
  });
  document.querySelectorAll(".card--snippet").forEach((el) => {
    el.classList.remove("is-active");
  });
  document.querySelectorAll(".card--snippet--mobile").forEach((el) => {
    el.classList.remove("is-active");
  });
  e.classList.add("is-active");
};

if (document.querySelector(".swiper--snippet swiper-container")) {
  const swiperSnippetEl = document.querySelector(
    ".swiper--snippet swiper-container"
  );
  const paramsSnippet = {
    direction: "vertical",
    simulateTouch: false,
    slidesPerView: 5,
    loop: true,
    height: document.querySelector(".grid--snippet").clientHeight,
    on: {
      afterInit: function () {
        try {
          document
            .querySelector(".swiper-slide-active .card--snippet")
            .dispatchEvent(new Event("click"));
        } catch (error) {}
      },
      slideChange: function () {
        try {
          setTimeout(() => {
            document
              .querySelector(".swiper-slide-active .card--snippet")
              .dispatchEvent(new Event("click"));
          }, 0);
        } catch (error) {}
      },
    },
  };

  Object.assign(swiperSnippetEl, paramsSnippet);
  swiperSnippetEl.initialize();
}

window.onload = function () {
  document.getElementsByTagName("main")[0].style.visibility = "visible";
};

if (document.querySelector(".swiper--snippet--mobile swiper-container")) {
  const swiperMobileSnippetEl = document.querySelector(
    ".swiper--snippet--mobile swiper-container"
  );
  const paramsSnippet = {
    simulateTouch: false,
    slidesPerView: 5,
    spaceBetween: 10,
    on: {
      afterInit: function () {
        try {
          document
            .querySelector(".swiper-slide-active .card--snippet--mobile")
            .dispatchEvent(new Event("click"));
        } catch (error) {}
      },
    },
  };

  Object.assign(swiperMobileSnippetEl, paramsSnippet);
  swiperMobileSnippetEl.initialize();
}

window.onload = function () {
  document.getElementsByTagName("main")[0].style.visibility = "visible";
  setupValidation();
};
