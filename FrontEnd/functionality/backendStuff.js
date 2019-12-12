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
        // const id = document.getElementById("id").value;
        // alert(id);
        // const name = document.getElementById("name").value;
        // const id = stringToHash(name);
        // // alert(name);
        // const ingredients = document.getElementById("ingredients").value;
        // // alert(ingredients);
        // const instructions = document.getElementById("instructions").value;
        // // alert(instructions);
        const obj = event.target.value;
        const name = obj.name;
        const id = stringToHash(name);
        const ingredients = obj.ingredients;
        const instructions = obj.instructions
        const tokenStr = localStorage.getItem('jwt');
        try {
            const res = await axios({
                method: 'post',
                url: "http://localhost:3000/private/recipes/" + id,
                headers: {Authorization: `Bearer ${tokenStr}`},
                "type": "merge",
                'data': {
                    'data': {
                        // "hah": "hah"
                            'name': name,
                            'ingredients': ingredients,
                            'instructions': instructions,
                    }
                }
            });
            saveRecipeUser(id, name, ingredients, instructions);
        } catch (error) {
            alert(error);
        }
    }
    
async function saveRecipeUser(id, name, ingredients, instructions){
    event.preventDefault();
    const tokenStr = localStorage.getItem('jwt');
    try {
        const res = await axios({
            method: 'post',
            url: "http://localhost:3000/user/recipes/" + id,
            headers: {Authorization: `Bearer ${tokenStr}`},
            "type": "merge",
            'data': {
                'data': {
                    // "hah": "hah"
                        'name': name,
                        'ingredients': ingredients,
                        'instructions': instructions,
                }
            }
        });
    } catch (error) {
        alert(error);
    }
}
    
function stringToHash(string) { 
                    
    var hash = 0; 
        
    if (string.length == 0) return hash; 
        
    for (i = 0; i < string.length; i++) { 
        char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
    } 
        
    return hash; 
} 

$(document).on('click', '.save', saveRecipe);