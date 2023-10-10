const idDom = document.getElementById('id');
const pwDom = document.getElementById('password');
const nameDom = document.getElementById('name');
const btn = document.getElementById('btn');

const joinFetch = () => {
    const id = idDom.value;
    const password = pwDom.value;
    const name = nameDom.value;

    console.log(id);
    console.log(password);
    console.log(name);

    // TODO: 서버 전송하고 비밀번호를 암호화 한다음 데이터베이스 저장 
}

btn.addEventListener('click', joinFetch)