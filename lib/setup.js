window.addEventListener("load", function(){

    // header 어느정도 내리면 색바뀌고 고정

    // 스크롤 각 section transiton 효과 나타나기
    const point = window.innerHeight - 150;
    const html = document.querySelector("html");
    const header = document.querySelector("header");
    let section = document.querySelectorAll("main .section");
    let off = document.querySelectorAll("main .off");
    

    // moveScroll
    function moveScroll(){
        const top = window.pageYOffset;

        // 스크롤 시 header.view
        if(top){
            header.classList.add("view");
        }else{
            header.classList.remove("view");
        }

        // section이 화면안에 들어오면 view 추가
        section.forEach(function(that){
            if(top > that.offsetTop - 400){
                that.classList.add("view");
                html.setAttribute("index", that.getAttribute("id")); // 현재 보고있는 section id
            }else{
                that.classList.remove("view");
            }
        });

        // off 요소가 point보다 위에 있으면 .on으로 변경
        off.forEach(function(that){
            const pos = getPosition(that);
            if(top > (pos.top - point) ){
                that.classList.remove("off");
                that.classList.add("on");
            }else{
                that.classList.remove("on");
                that.classList.add("off");
            }
        })
    };

    moveScroll();

    function onScroll() {
        throttle(function(){
            moveScroll();
        });
    };

    function throttle(_function){ 
        
        let scheduledAnimationFrame = false; // 실행 예약 여부 기억 함수
        
        if (scheduledAnimationFrame) {
            return; // 이미 실행 중이라면(true) 무시(return)
        }
        
        scheduledAnimationFrame = true;
        requestAnimationFrame(function() { 
            // 아니라면 requestAnimationFrame으로 _function()을 다음 프레임에 실행하도록 예약
            
            // function start
            _function();
            
            // do something
            scheduledAnimationFrame = false; // 실행이 끝나면 false로 바꿔서 다음 호출 가능하게 함
            
        });
        
    }

    function getPosition(target){
        const rect = target.getBoundingClientRect(); // 문서 전체
        const scrollTop = window.pageYOffset;
        
        return { top : rect.top + scrollTop };
    }
    
    
    document.addEventListener("scroll", onScroll);
});


