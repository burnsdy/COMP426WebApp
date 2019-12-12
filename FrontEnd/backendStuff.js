async function getPrivate() {
    const tokenStr = localStorage.getItem('jwt');
    try{
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/private/recipes",
            headers: {Authorization: `Bearer ${tokenStr}`},
        });
        return res;
    } catch(error){
        alert(error);
    }
}

async function loadPrivate() {
    let result = await getPrivate();
    let objs = result.data.result;
    console.log(objs);
    for (recipe in objs) {
        let i=0;
        console.log(recipe);
        

        if (i>9) {
            break;
        }
    }
    
}

async function saveRecipe(event) {
    event.preventDefault();

    

}

$(document).on('click', '.save', saveRecipe);