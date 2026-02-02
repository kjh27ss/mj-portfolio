const point = window.innerHeight - 150;
const html = document.querySelector("html");
const header = document.querySelector("header");
let section = document.querySelectorAll("main .section");
let off = document.querySelectorAll("main .off");
const menuLinks = document.querySelectorAll(".menuBox a, .pc a");
const headerHeight = header.offsetHeight;
const mobileHeader = document.querySelector("header #mobile");
const mobileBtn = document.querySelector("header #mobile .button");
const mobileLinks = document.querySelectorAll("header #mobile .menuBox li a");
const mobileBg = document.querySelector("header #mobile .menuBg");

// 햄버거
mobileBtn.addEventListener("click", () => {
    mobileHeader.classList.toggle("view");
});

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileHeader.classList.remove("view");
    });
});

mobileBg.addEventListener("click", () => {
    mobileHeader.classList.remove("view");
});

menuLinks.forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.hash);
        if (!target) return;

        e.preventDefault();

        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: "smooth"
        });
    });
});



// 스크롤시
function moveScroll() {
    const top = window.pageYOffset;

    if (top) {
        header.classList.add("view");
    } else {
        header.classList.remove("view");
    }

    // section이 화면안에 들어오면 view 추가
    section.forEach(function (el) {
        if (top > el.offsetTop - 400) {
            el.classList.add("view");
            //html.setAttribute("index", el.getAttribute("id")); // 현재 보고있는 section id
        } else {
            el.classList.remove("view");
        }
    });

    // off 요소가 point보다 위에 있으면 .on으로 변경
    off.forEach(function (item) {
        const pos = getPosition(item); // pos.top : 요소 위치
        if (top > (pos.top - point)) {
            item.classList.remove("off");
            item.classList.add("on");
        } else {
            item.classList.remove("on");
            item.classList.add("off");
        }
    })
};


let scheduled = false;

function onScroll() {
    if (!scheduled) { // 예약이 없을때만 실행 (스크롤 수십번 들어와도 1번만 예약됨)
        scheduled = true;
        requestAnimationFrame(() => {
            moveScroll();
            scheduled = false;
        });
    }
}


function getPosition(target) { // 문서 전체 기준 좌표
    const rect = target.getBoundingClientRect(); // viewport 기준 위치
    const scrollTop = window.pageYOffset; // 스크롤 된 거리

    return { top: rect.top + scrollTop };
}

moveScroll();

document.addEventListener("scroll", onScroll);



