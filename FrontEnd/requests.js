export async function createAccount(event) {
    event.preventDefault();
    // const result = await axios ({
    //     method: 'post',
    //     url: 'http://localhost:3000/account/create',
    //     name: 'name',
    //     pass: 'pass',
    //     data: {
    //     },
    // });
    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/create',
        data: {
            "name": username,
            "pass": password,
            "data": {
                "firstname": firstname
            }
        }
    });
    // const result = await axios ({
    //     method: 'post',
    //     url: 'localhost:3000/public/test',
    //     data: {
    //         "name": name,
    //         "pass": pass,
    //         "data": {}
    //     },
    // });
    // const result = await axios ({
    //     method: 'get',
    //     url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    //     withCredentials: 'true'
    // });
    alert("test");
    alert(result.status);
}

// export const handleEvents = function() {
//     $(document).on('click', '.createAccount', createAccount);
//     alert("test3");
// }

$(function () {
    handleEvents();
});
$(document).on('click', '.createAccount', createAccount);
