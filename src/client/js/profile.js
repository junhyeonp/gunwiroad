const getCourseListFetch = async() => {
    const response = await fetch("/api/courses") 
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

    let stampQuantity = completedStamps.length;;
    let calculatedCouponAmount = (stampQuantity >= 1 ? 1 : 0) + Math.floor(stampQuantity / 3)

    for(let i = 0; i < calculatedCouponAmount; i++) {
        couponBox.classList.add('show');
        couponBox.innerHTML += `<div class="coupon">
                                   <img src="../file/coupon_${i}.png" alt="">
                               </div>`
    }
    
    couponAmount.innerHTML = `${ calculatedCouponAmount }개`
    levelNum.innerHTML = stampQuantity
})