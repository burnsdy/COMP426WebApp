async function getPublic() {
    const res = await axios({
        method: "get",
        url: "http://localhost:3000/public/recipes"
    });
    return res;
}

async function loadPublic() {
    let result = await getPublic();
    let objs = result.data.result;
    let ids = Object.keys(objs);
    let html = `<div id="recipes">`;
    for(let i=0; i<ids.length; i++) {
        let id = ids[i];
        let name = objs[id].name;
        let ingArray = objs[id].ingredients;
        let ingredients = `<ul>`;
        for(let k=0; k<ingArray.length; k++) {
            ingredients = ingredients + `
                <li>${ingArray[k]}</li>
            `;
        }
        let img = objs[id].image;
        ingredients = ingredients + `</ul>`;
        let instructions = objs[id].instructions;
        let render = `
            <div class="recipebox">
                <div class="inner">
                    <h2>${name}</h2>
                    <hr>
                    <img src=${img}>
                    <p>${ingredients}</p>
                    <p>${instructions}<p>
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

async function getUser() {
    const tokenStr = localStorage.getItem('jwt');
    let name = localStorage.getItem('name');
    try{
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/user/recipes",
            headers: {Authorization: `Bearer ${tokenStr}`},
        });
        return res;
    } catch(error){
        alert(error);
    }
}

async function loadUser() {
    let result = await getUser();
    let objs = result.data.result;
    let ids = Object.keys(objs);
    let html = `<div id="recipes">`;
    for(let i=0; i<ids.length; i++) {
        let id = ids[i];
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
            <div class="recipebox" id=${id}>
                <div class="inner">
                    <h2>${name}</h2>
                    <hr>
                    <p>${ingredients}</p>
                    <h5>${instructions}</h5>
                    <button id=${id} class="edit">Edit</button>
                    <button id=${id} class="delete">Delete</button>
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

async function loadPrivate() {
    let result = await getPrivate();
    let objs = result.data.result;
    let ids = Object.keys(objs);
    let html = `<div id="recipes">`;
    for(let i=0; i<ids.length; i++) {
        let id = ids[i];
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

async function requestInfo(id) {
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + id + '/information/?apiKey=85bb97fb65ed4a869c3b1fcde9430a96'
    });
    return result;
}

async function getRecipe(id) {
    let result = await requestInfo(id);
    let response = [];
    response.push(result.data);
    let name = response[0].title;
    let imageurl = response[0].image;
    let ingredients = [];
    for(let i=0; i<response[0].extendedIngredients.length; i++) {
        ingredients.push(response[0].extendedIngredients[i].originalString);
    }
    let instructions = response[0].instructions;
    let obj = {
        id: id,
        image: imageurl,
        name: name,
        ingredients: ingredients,
        instructions: instructions
    }
    return obj;
}

async function saveRecipe(event) {
    event.preventDefault();
    const recipeID = event.target.id;
    let obj = await getRecipe(recipeID);
    let name = obj.name;
    const id = await stringToHash(name);
    const ingredients = obj.ingredients;
    const instructions = obj.instructions;
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
    const tokenStr = localStorage.getItem('jwt');
    try {
        const res = await axios({
            method: 'post',
            url: "http://localhost:3000/user/recipes/" + id,
            headers: {Authorization: `Bearer ${tokenStr}`},
            "type": "merge",
            'data': {
                'data': {
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
    
async function stringToHash(string) {        
    var hash = 0; 
    if (string.length == 0) return hash; 
    for (let i = 0; i < string.length; i++) { 
        let char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
    } 
    return hash; 
} 

async function delRecipe() {
    event.preventDefault();
    // const name = localStorage.getItem('name');
    const recipeID = event.target.id;
    // console.log(recipeID);
    // const id = stringToHash(name);
    const tokenStr = localStorage.getItem('jwt');
    const url = "http://localhost:3000/user/recipes/" + recipeID;
    try {
        const res = await axios.delete(url, {headers: {Authorization: `Bearer ${tokenStr}`}});
        location.reload();
    } catch (error){
        alert(error);
    }
}

async function findID(id) {
    let result = await getUser();
    // console.log(result);
    let objs = result.data.result;
    // console.log(objs);
    let ids = Object.keys(objs);
    // console.log(ids);
    // console.log(objs[1214828765]);
    for(let i=0; i<ids.length; i++) {
        if (id == ids[i]){
            return objs[id];
        }
    }
    return 0;
}

async function editRecipe() {
    event.preventDefault();
    const recipeID = event.target.id;
    // console.log(recipeID);
    let obj = await findID(recipeID);
    // console.log(obj);
    let name = obj.name;
    // console.log(name);
    // alert(name);
    const ingredients = obj.ingredients;
    // console.log(ingredients);
    const instructions = obj.instructions;
    // console.log(instructions);
    const tokenStr = localStorage.getItem('jwt');

    $('div[id=' + recipeID + ']').html(`
        <form id=${recipeID}>
            <input placeholder="${name}" id="name"></input>
            <input placeholder="${ingredients}" id="ingredients"></input>
            <input placeholder="${instructions}" id="instructions"></input>
            <button id="${recipeID}" class="edit" onclick="handleEdit();">Submit Changes</button>
        </form>
    `);


    // try {
    //     const res = await axios({
    //         method: "post",
    //         url: "http://localhost:3000/user/recipe" + id,
    //         'data': {
    //             'data': {
    //                 'name': name,
    //                 'ingredients': ingredients,
    //                 'instructions': instructions,
    //             }
    //         }
    //     });
    // } catch (error) {
    //     alert(error);
    // }
}

async function handleEdit(){
    const name = document.getElementById("name").value;
    // console.log(name);
    const ingredients = document.getElementById("ingredients").value;
    // console.log(ingredients);
    const instructions = document.getElementById("instructions").value;
    // console.log(instructions);
    const id = await stringToHash(name);
    const tokenStr = localStorage.getItem('jwt');
    // console.log(id);
    try{
        const res = await axios({
            method: 'post',
            url: "http://localhost:3000/user/recipes/" + id,
            headers: {Authorization: `Bearer ${tokenStr}`},
            "type": "merge",
            'data': {
                'data': {
                    'name': name,
                    'ingredients': ingredients,
                    'instructions': instructions,
                }
            }
        });
        location.reload();
    } catch (error){
        console.log(error);
    }
}


$(document).on('click', '.save', saveRecipe);

$(document).on('click', '.delete', delRecipe);

$(document).on('click', '.edit', editRecipe);
