const getCourseListFetch = async() => {
    const response = await fetch("/api/courses") 
    const result = await response.json();
    courseListInfo = result;
}

getCourseListFetch().then(() => {
    const currentPath = window.location.pathname;
    const pageNumber = currentPath.split('/').pop();
    const courseImg = document.querySelector('.detail-course-img img');
    const courseTitle = document.querySelector('.course-title');
    const courseDescription = document.querySelector('.course-description');
    console.log(courseListInfo);
    
    courseTitle.innerHTML = courseListInfo[pageNumber].course_name.replace(/<br\s*\/?>/g, ' ');
    courseImg.src = `../file/course_detail_img_${pageNumber}.png`;
    courseDescription.innerHTML = courseListInfo[pageNumber].course_description;

})