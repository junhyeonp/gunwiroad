const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;

// TODO 추후 사라질 수 있음
let courseListInfo = [];
let clickCourseID = 0;

// 지도 그리는 함수
const drawMap = (latitude, longtitude) => {
    const options = {
        center: new kakao.maps.LatLng(latitude, longtitude),
        level: 2
    };
    map = new kakao.maps.Map(locationMap, options)
    map.setZoomable(false);
}

// 마커를 초기화 하는 함수 (유저 마커가 새로 생길 때 기존 것을 지워버리기 위한 용도)
const deleteMarkers = () => {
    for (let i= 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}

// 유저 마커 그리기
const addUserMarker = () => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(36);
    const image = new kakao.maps.MarkerImage(markerImage, markerSize)

    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(userLatitude, userLongitude),
        image: image,
    })
    // marker.setMap(map);
    markers.push(marker)
}

// 해당 위치로 지도를 이동함
const panTo = (latitude, longitude) => {
    map.panTo(new kakao.maps.LatLng(latitude, longitude));
}

// 코스 마커 그리기
const addCourseMarker = (course) => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(36);
    
    if(course.users_course_id) {
        markerImage = "/file/map_complete.jpg";
        markerSize = new kakao.maps.Size(36);
        
    }

    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    const position = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
    new kakao.maps.Marker({
        map: map,
        position: position,
        title: course.course_name,
        image: image
    })
}

const allCourseMarker = () => {
    for (let i = 0; i < courseListInfo.length; i++) {
        addCourseMarker(courseListInfo[i]);
    }
}


const clickCourseList = (e, courseId) => {
    if (clickCourseID !== courseId) {
        const courseWrap = document.querySelectorAll(".course");
        for (let i = 0; i < courseWrap.length; i++) {
            courseWrap[i].classList.remove("on");
    }
    e.currentTarget.classList.add("on");

    let courseLatitude;
    let courseLongitude;

    if (courseId ===0) {
        courseLatitude = userLatitude;
        courseLongitude = userLongitude;
    } else {
        let matchedCourse = courseListInfo.find(course => course.course_id === courseId);
        courseLatitude = matchedCourse.course_latitude;
        courseLongitude = matchedCourse.course_longitude;
    }
    panTo(courseLatitude, courseLongitude);
    clickCourseID = courseId;
}
}




// 현재 위치 감시 함수 -> 위치정보를 가져오는 허락이 있으면 위치정보가 갱신될 때마다 계속 정보를 가지고 함수를 실행시켜줌
const configurationLocationWatch = () => {
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition((position)=>{            
            deleteMarkers();

            // console.log(position)
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            if(!isMapDrawn) {
                drawMap(userLatitude, userLongitude);
                allCourseMarker();
                isMapDrawn = true
            }
            addUserMarker();
            if(clickCourseID === 0 ){
                panTo(userLatitude, userLongitude)
            }
        })
    }
}

const makeNavigationHtml = () => {
    const courseWrap = document.getElementById("course-wrap");
    // console.log(courseWrap)
    let html= "";

    for (let i = 0 ; i < courseListInfo.length; i++) {
        html += `<li class="course" onclick="clickCourseList(event, ${courseListInfo[i].course_id})">`
        if (courseListInfo[i].users_course_id) {
            // console.log("들어옴")
            html += `<div class="mark-wrap"><img src="/file/complete.png" /></div>`
        }
        html += `<p>${courseListInfo[i].course_name}</p>`
        html += `</li>`
        }
            // console.log(courseListInfo);

    html += `<li id="myPosition" class="course on" onclick="clickCourseList(event, 0)">나의 위치</li>`

    // console.log(html)
    courseWrap.innerHTML = html;
}
// drawMap(35.875528, 128.681573);
// addCourseMarker();

// 코스 정보 받아온 다음에 할일 
const afterGetCourseList = () => {
    makeNavigationHtml();
    configurationLocationWatch();
}

// 백엔드 서버로 코스정보 요청
const getCourseListFetch = async() => {
    const response = await fetch("/api/courses") 
    const result = await response.json();
    courseListInfo = result;
    
    afterGetCourseList();
    makeNavigationHtml();
}

getCourseListFetch();