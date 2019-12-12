async function requestID(event) {
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/search?apiKey=196f5984b339460580d5dfca1b04e7be&query=' + $("input[id=recipeVal]").val() + '&number=5&limitLicense=true&instructionsRequired=true',
    });
    return result;
}

async function getId(event) {
    let result = await requestID(event);
    let response = [];
    response.push(result.data);
    let recipe = response[0].results;
    let ids = [];
    let length = ((recipe.length>5) ? 5 : recipe.length);
    for(let i=0; i<length; i++) {
        if (typeof recipe[i].id !== 'undefined'){
            ids.push(recipe[i].id);
        }
    }
    return ids; // array of 5 ids
}

async function requestInfo(id) {
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + id + '/information/?apiKey=196f5984b339460580d5dfca1b04e7be'
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
    let json = JSON.stringify(obj);
    return json;
}

async function buildHTML(array) {
    let html = `<div id="results">`;
    for(let i=0; i<array.length; i++){
        let json = array[i];
        let obj = JSON.parse(json);
        let id = obj.id;
        let image = obj.image;
        let name = obj.name;
        let ingArray = obj.ingredients;
        let ingredients = `<ul>`;
        for(let k=0; k<ingArray.length; k++) {
            ingredients = ingredients + `
                <li>${ingArray[k]}</li>
            `;
        }
        ingredients = ingredients + `</ul>`;
        let instructions = obj.instructions;
        let render = `
            <div class="recipebox">
                <div class="inner">
                    <h2 value="${id}">${name}</h2>
                    <img src="${image}">
                    <hr>
                    <p>${ingredients}</p>
                    <p>${instructions}<p>
                    <button class="save" value="obj">Save to your Recipe Book</button>
                </div>
            </div>
        `;
        html = html + render;
    }
    html = html + `</div>`;
    // $('#results').append(html);
    $('#results').replaceWith(html);
}

async function recipeHandler(event) {
    let recipesjson = [];
    let ids = await getId(event);
    for(let i=0; i<ids.length; i++) {
        let json = await getRecipe(ids[i]);
        recipesjson.push(json);
    }
    let html = buildHTML(recipesjson);
}

$(document).on('click', '#recipeSearch', recipeHandler);