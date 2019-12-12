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
    let ids = Object.keys(objs);
    let html = `<div id="recipes">`;
    for(let i=0; i<ids.length; i++) {
        let id = ids[i];
        console.log(objs[id].name);
        let name = objs[id].name;
        let ingArray = objs[id].ingredients;
        let ingredients = `<ul>`;
        for(let k=0; k<ingArray.length; k++) {
            ingredients = ingredients + `
                <li>${ingArray[k]}</li>
            `;
        }
        ingredients = ingredients + `</ul>`;
        let instructions = objs[id].instructions;
        let render = `
            <div class="recipebox">
                <div class="inner">
                    <h2>${name}</h2>
                    <hr>
                    <p>${ingredients}</p>
                    <p>${instructions}<p>
                    <button class="save">Save to your Recipe Book</button>
                </div>
            </div>
        `;
        html = html + render;
        console.log(i);
        if (i>4) {
            break;
        }
    }
    html = html + `</div>`;
    $('#recipes').replaceWith(html);
    
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