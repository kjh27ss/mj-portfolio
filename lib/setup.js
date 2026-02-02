window.addEventListener("load", function () {

    const point = window.innerHeight - 150;
    const html = document.querySelector("html");
    const header = document.querySelector("header");
    let section = document.querySelectorAll("main .section");
    let off = document.querySelectorAll("main .off");
    const menuLinks = document.querySelectorAll(".menuBox a, .pc a");
    const headerHeight = header.offsetHeight;

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href.startsWith("http")) {
                return;
            }

            const targetSection = document.querySelector(href);
            e.preventDefault();
            if (targetSection) {
                const targetPos = getPosition(targetSection).top;
                window.scrollTo({
                    top: targetPos - headerHeight,
                    behavior: "smooth"
                });
            }
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
                html.setAttribute("index", el.getAttribute("id")); // 현재 보고있는 section id
            } else {
                el.classList.remove("view");
            }
        });

        // off 요소가 point보다 위에 있으면 .on으로 변경
        off.forEach(function (item) {
            const pos = getPosition(item);
            if (top > (pos.top - point)) {
                item.classList.remove("off");
                item.classList.add("on");
            } else {
                item.classList.remove("on");
                item.classList.add("off");
            }
        })
    };

    moveScroll();


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


    document.addEventListener("scroll", onScroll);
});


