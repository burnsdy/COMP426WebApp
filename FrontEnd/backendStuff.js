async function getData() {
    const tokenStr = localStorage.getItem('jwt');
    try{
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/private/recipes",
            headers: {Authorization: `Bearer ${tokenStr}`},
        });
        console.log(res);
    } catch(error){
        alert(error);
    }
}

async function saveRecipe(event) {
    event.preventDefault();

    

}

$(document).on('click', '.save', saveRecipe);