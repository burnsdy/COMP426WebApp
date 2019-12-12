 async function sendCreateInfo() {
    event.preventDefault();
    const uname = document.getElementById("name").value;
    // alert(uname);
    const passw = document.getElementById("pass").value;
    // alert(passw);
    try {
        const res = await axios({
            method: "post",
            url: 'http://localhost:3000/account/create',
            data: {
                name: uname,
                pass: passw,
            }
        })
        window.location.replace('http://localhost:3001/Accounts/login.html');
    } catch (error){
        alert(error + ": An account with this name already exists!");
        // alert("An account with this name already exists!");
    }
}

// function hello() {
//     alert("fucks sake");
// }

 async function sendLoginInfo() {
    event.preventDefault();
    const uname = document.getElementById("name").value;
    // alert(uname);
    const passw = document.getElementById("pass").value;
    // alert(passw);
    try {
        const res = await axios({
            method: "post",
            url: 'http://localhost:3000/account/login',
            data: {
                name: uname,
                pass: passw,
            }
        })
        const jwt = res.data.jwt;
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('name', uname);
        window.location.replace('http://localhost:3001/'); // Redirect user after sign-in success
        // alert(jwt);
        return true;
    } catch (error){
        alert(error);
        return false;
    }
}

 async function getStatus() {
    try {
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/account/status",
        })
        return res.data;
    } catch (error) {
        return false;
    }
 }

var token = localStorage.getItem('token');

var getToken = () => {
  return token;
};

var setToken = (t) => {
  token = t;
  localStorage.setItem('token', t);
};


function logout() {
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    window.location.replace('http://localhost:3001/home.html');
}

function backHome() {
    event.preventDefault();
    window.location.replace('http://localhost:3001/home.html');
}