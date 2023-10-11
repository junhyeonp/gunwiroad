const getCourseListFetch = async() => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
        window.location.href = "/login?error=need_login";
    }
    const response = await fetch("/api/courses", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if(response.status === 401) {
        return window.location.href = "/login?error=need_login"
    }
    const result = await response.json();
    courseListInfo = result;
}

getCourseListFetch().then(() => {
    const couponBox = document.querySelector('.coupon-box')
    const couponAmount = document.querySelector('.coupon-amount')
    const levelNum = document.querySelector('.level-num')

    let completedStamps = courseListInfo.filter(function(obj) {
        return obj.users_course_id !== null;
    });

    let stampQuantity = completedStamps.length;
    let calculatedCouponAmount = (stampQuantity >= 1 ? 1 : 0) + Math.floor(stampQuantity / 3)

    for(let i = 0; i < calculatedCouponAmount; i++) {
        couponBox.classList.add('show');
        couponBox.innerHTML += `<div class="coupon">
                                   <img src="../file/coupon_${i}.png" onclick="openModal('modal${i}')" alt="" >
                                </div>
                                <div id="modal${i}" class="modal">
                                    <div class="modal-content">
                                        <span class="close" onclick="closeModal('modal${i}')">&times;</span>
                                        <img src="../file/coupon_barcode_${i}.png" alt="">
                                    </div>
                                </div>`
    }
    
    couponAmount.innerHTML = `${ calculatedCouponAmount }개`
    levelNum.innerHTML = stampQuantity
})