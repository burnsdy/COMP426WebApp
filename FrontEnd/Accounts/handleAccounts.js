async function sendCreateInfo() {
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
    } catch (error){
        alert(error + ": An account with this name already exists!");
        // alert("An account with this name already exists!");
    }
}

// function hello() {
//     alert("fucks sake");
// }

async function sendLoginInfo() {
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
        header('location:../home.html');
    } catch (error){
        alert(error + ": There was a problem with your sign in, please try again, or create a new account below");
    }
}