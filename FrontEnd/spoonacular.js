async function requestID(event) {
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/search?apiKey=196f5984b339460580d5dfca1b04e7be&query=' + $("input[id=recipeVal]").val() + '&number=5&limitLicense=true&instructionsRequired=true', // NUMBER IS SET TO 1 FOR NOW, CHANGE TO 10
    });
    return result;
}

async function getId(event) {
    let result = await requestID(event);
    let response = [];
    response.push(result.data);
    let recipe = response[0].results;
    let ids = [recipe[0].id, recipe[1].id, recipe[2].id, recipe[3].id, recipe[4].id]
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

}

async function recipeHandler(event) {
    let recipesjson = [];
    let ids = await getId(event);
    for(let i=0; i<5; i++) {
        let json = await getRecipe(ids[i]);
        recipesjson.push(json);
    }
    console.log(recipesjson);
    let html = buildHTML(recipesjson);
    // Add html to page below search bar
}

$(document).on('click', '#recipeSearch', recipeHandler);