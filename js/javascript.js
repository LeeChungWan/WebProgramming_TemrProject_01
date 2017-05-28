/*---------------ImageSlide start--------------*/
var imgslideIndex = 1;

function imgPlusSlides(n) {
  showSlides(imgslideIndex += n);
}

function imgCurrentSlide(n) {
  showSlides(imgslideIndex = n);
}

function start_showSlides(n) {
  // 홈페이지가 실핼될때 onload를 이용해서 실행될 함수이다.
  // 우선 showSlides함수를 실행시켜 홈페이지가 실행되었을때
  // 이미지 슬라이드가 나오도록 하고 nonDisplayLocalStorage를 이용해서
  // 삭제되어 localStorage에 있는 갤러리의 사진은 출력이 안되게 한다.
  // 그리고 setTimeout를 이용해서 5초마다 사진이 넘어가게 해준다.
  showSlides(n);
  nonDisplayLocalStorage();
  setTimeout(auto_showSlides, 5000);
}

function showSlides(n) {
  imgSlides_Slider(n);
  dot_Slider(n);
}

function giveZindex(){
  var slideimg = document.getElementsByClassName("ImageSlide");
}

function imgSlides_Slider(n){
  var i;
  var slides = document.getElementsByClassName("imgSlides");
  if (n > slides.length) {imgslideIndex = 1}
  if (n < 1) {imgslideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[imgslideIndex-1].style.display = "block";
}

function dot_Slider(n){
  var i;
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[imgslideIndex-1].className += " active";
}

function auto_showSlides() {
  // 이미지슬라이드가 자동으로 넘어가게 하는 함수이다.
  // 우선, auto_slides에 이미지 슬라이드의 사진들을 저장하고 dots에는 dot의 요소들을 저장한다.
  // 그리고 우선 dot과 image를 모두 비활성 상태로 만든후 imgslideIndex를 이용해서 현재
  // 나와야하는 순서로 활성화를 시켜준다.
    var i;
    var auto_slides = document.getElementsByClassName("imgSlides");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < auto_slides.length; i++) {
        auto_slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    imgslideIndex++;
    if (imgslideIndex> auto_slides.length) {imgslideIndex = 1}
    auto_slides[imgslideIndex-1].style.display = "block";
    dots[imgslideIndex-1].className += " active";
    setTimeout(auto_showSlides, 5000);
}

/*--------------------ImageSlide end--------------------------*/

/*.-------------------Gallery start---------------------------*/

// 오픈모달에서 모달쿼렌트슬라이드기능까지 합치면 인덱스안써도 된다. 이것이 아이디
var modalslideIndex = 1;

function openModal(n) {
  // 갤러리의 사진을 클릭해서 모달창을 불러올때 실행되는 함수이다.
  // 첫줄은 none으로 인해 보이지 않던 모달창을 보이게하는 것이다.
  // 중요한것은 그아래 코드이다. 갤러리에서 삭제버튼을 눌러서 이미지가 삭제
  // 되면 모달창의 이미지도 삭제되어야 한다. 만약 이 구현을 index를 이용해서
  // 구현하면 사진들을 무작위로 지웠을때 인덱스 문제가 발생해 모달창에 다른
  // 사진이 출력된다. 이 문제를 해결하기 위해 구현된 코드이다.
  // 우선 파라매터로 받아온 것은 갤러리의 이미지에 해당한다 parent에
  // 갤러리의 부모노드로 설정을 한다. 그리고 반복문으로 현재 갤러리에 있는
  // 사진의 수 즉, 삭제된 이후에도 다이나믹하게 반응하여 수를 알아 내고
  // 클릭한 이미지와 현재 갤러리의 사진의 배열의 값이 같은면 해당 인덱스를
  // modalslideIndex로 만들어 제대로 실행되게 하였다.
  document.getElementById('myModal').style.display = "block";
  var parent = n.parentNode;
  var tempGallery = document.getElementsByClassName("img_Gallery");
  var count = 0;
  for(i=0; i<tempGallery.length;i++){
    if (parent == tempGallery[i]) {
      count = i+1;
      break;
    }
  }
  modalSlides_Slider(modalslideIndex = count);

}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}


function remove_모달(x){
  // 갤러리에서 X버튼을 눌렀을때 실행되는 함수이다.
  // 갤러리에서 사진을 삭제하면 모달에서의 이미지까지 삭제되야
  // 모달을 실행했을때도 해당 이미지가 나오지 않는다.
  // 이것을 만족시키기 해당 이미지들을 같은 이름의 컨테이너클래스로
  // 묶고 해당 클래스이름으로 만들어진 rmContainer변수에 저장된요소를
  // 제거하는 방법으로 구현하였다.
  var rmContainer = document.getElementsByClassName(x)
  localStorage.setItem(x,x);
  var temp = localStorage.getItem(x);
  while (rmContainer.length !=0) {
    rmContainer[0].remove();
  }
  modalslideIndex--;
}

function modalPlusSlides(n) {
  modalSlides_Slider(modalslideIndex += n);
}

function modalSlides_Slider(n){
  // 모달창의 슬라이드를 실행하는 코드이다.
  // slides라는 변수에 modalSlides라는 이름의 클래스이름을 가진 사진들을
  // 저장하고 우선 모든 사진들을 none으로 안보이게 만들고 현재 해당하는
  // 이미지를 modalslideIndex를 이용해서 block시켜주어 화면에 나타낸다.
  var i;
  var slides = document.getElementsByClassName("modalSlides");
  if (n > slides.length) {modalslideIndex = 1}
  if (n < 1) {modalslideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[modalslideIndex-1].style.display = "block";
}

function localStorageReset(){
  // 리셋버튼을 눌렀을때 실행되는 코드이다.
  // localStorage의 내용을 clear시키고 화면을
  // 새로고침하여 이미지들이 다시 화면에 나오게 한다.
  localStorage.clear();
  window.location.reload(true); // 새로고침.
}

function nonDisplayLocalStorage() {
  // 로컬스토리지에 있는 이미지가 새로고침했을때 화면에 출력이 안되게하는 함수.
  // 로컬스토리지에는 removecontainer-0?로 갤러리의 삭제된 이미지들이 들어가 있다.
  // 이것들은 새로고침했을때도 삭제가 되야하므로 로컬스토리지를 모두 검사해서
  // 해당 컨테이너를 다시 삭제해준다.
  var text = "removecontainer-0";
  var temp;
  var temp_child;
  if (localStorage.length != 0) {
    for (var i = 0; i < 8; i++) {
      text += i;
      if(localStorage.getItem(text) != null){
        remove_모달(text);
      }
      text = "removecontainer-0";
    }
  }
}
/*--------------------Gallery end---------------------*/

/*--------------------Guestbook start-----------------*/


var htmlsrc = "";
function clickSubmit(){
  // 게스트북의 등록하기의 버튼을 누르면 실행되는 함수이다.
  // htmlsrc에 html의 태그들을 붙여서 하나의 테이블을 만들고
  // innerHTML을 이용해서 htmlsrc에 저장되어있는 코드를 옮겨주어
  // 화면에 나오게 한다.
  var writer = document.getElementById("작성자").value;
  var contents = document.getElementById("내용").value;
  htmlsrc += "<table class='addGuestBook'>";
  htmlsrc += "<tr>";
  htmlsrc += "<td id='guest-left-td'>" + "The Blues : " + writer + "<td>";
  htmlsrc += contents;
  htmlsrc += "</tr>";
  htmlsrc += "<tr>";
  htmlsrc += '<td colspan="2" class="guestAddBtn">'+'<button onclick="clickReply(this)" type="button" name="button">' + "Reply" + "</button>"+"</td>";
  htmlsrc  += "</tr>";
  htmlsrc += "</table>";
  document.getElementById("showBookArray").innerHTML = htmlsrc;
  document.getElementById("작성자").value = "";
  document.getElementById("내용").value = "";
}

function clickReply(that){
  var reply = prompt("답글 내용을 입력하세요.");
  var rmGuestBtn = that.parentNode;
  var modifiedHtmlsrc = searchParent(rmGuestBtn);
  rmGuestBtn.innerHTML = "↪ " + reply;
  this.htmlsrc = modifiedHtmlsrc.innerHTML;
}

function searchParent(node) {
  return node.parentNode.parentNode.parentNode.parentNode;
}

/*------------------Introduce 추가구현------------------*/
var chart = AmCharts.makeChart( "chartdiv", {
  "type": "radar",
  "theme": "light",
  "dataProvider": [ {
    "country": "ATACK",
    "litres": 190.9
  }, {
    "country": "DEFENCE",
    "litres": 131.1
  }, {
    "country": "ORGANIZATION",
    "litres": 198.8
  }, {
    "country": "COACHING",
    "litres": 170.9
  }, {
    "country": "FINANCE",
    "litres": 198.3
  }, {
    "country": "CLUB VALUE",
    "litres": 130
  } ],
  "valueAxes": [ {
    "axisTitleOffset": 20,
    "minimum": 0,
    "axisAlpha": 0.15
  } ],
  "startDuration": 2,
  "graphs": [ {
    "balloonText": "[[value]] ablity",
    "bullet": "round",
    "lineThickness": 2,
    "valueField": "litres"
  } ],
  "categoryField": "country",
  "export": {
    "enabled": true
  }
} );

/*------------------Menu Bar 추가구현----------------*/

function dropdown() {
  //  드랍다운을 클릭했을때 MENU일 경우는 닫혀있는 경우고 드랍다운이 열리면 CLOSE로 바뀐다.
  // MENU를 클릭해서 드랍다운을 열면 setInterval함수를 이용해서 openMenuBar함수를 해당 조건
  // 만큼 실행시키고 clearInterval을 통해 실행을 정지 시킨다.
  //  반대로 드랍다운을 닫을 때도 pos의 조건에 맞춰 실행을 정지시킨다.
    var text = document.getElementById("menu_button").innerHTML;
    var bar = document.getElementById("menu_div");
    var pos = bar.offsetHeight;

    if (text == "MENU") {
      var animation = setInterval(openMenuBar, 1);
      function openMenuBar() {
        if (pos > 270) {
          clearInterval(animation);
        } else {
          pos += 2;
          bar.style.height = pos + "px";
        }
      }
      document.getElementById("menu_button").innerHTML = "CLOSE";
      document.getElementById("myDropdown").classList.toggle("show");
    } else {
      var animation = setInterval(collapse, 1);
      function collapse() {
        if (pos < 50) {
          clearInterval(animation);
          document.getElementById("myDropdown").classList.toggle("show");

        }
        else {
          pos -= 2;
          bar.style.height = pos + "px";
        }
      }
      document.getElementById("menu_button").innerHTML = "MENU";
    }
}

window.onclick = function(event) {
  // onclick 이벤트중에서 event의 target 이 .select이면 closeDropdown함수를 실행시킨다.
  if (event.target.matches('.select'))
    closeDropdown();
}

function closeDropdown(){
 //  메뉴바에서 드랍다운으로 내려온 리스트를 클릭해서 이동을 하면
 // 내려왔던 드랍다운을 원래 위치로 돌려주는 함수.
  document.getElementById("menu_div").style.height = "50px";
  document.getElementById("menu_button").innerHTML = "MENU";
  document.getElementById("myDropdown").classList.toggle("show");
}
