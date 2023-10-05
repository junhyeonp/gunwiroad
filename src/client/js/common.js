const userCheckFetch = async () => {
    // 로컬스토리지에서 accessToken가져오기
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/login?error=need_login";
    }
    try {
      const response = await fetch('/api/auth/token/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      }); 
      const result = await response.json();
      if(response.status !== 200 ) {
        localStorage.removeItem("accessToken");
        if (response.status == 401) {
          if (result.message === "토큰 만료") {
            return window.location.href = "/login?error=expired";
          }
        } 
        return window.location.href = "/login?error=need_login";
      }
    } catch(error) {
      console.error("Error:", error);
      window.location.href = "/login?error=server_error";
    }
  }
  
  
  const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  const msgAlert = (position, msg, type) => {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({ title: msg, icon: type });
  }