async function requestID(event) {
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/search?apiKey=196f5984b339460580d5dfca1b04e7be&query=' + $("input[id=recipeVal]").val() + '&number=1&limitLicense=true&instructionsRequired=true', // NUMBER IS SET TO 1 FOR NOW, CHANGE TO 10
    });
    return result;
}

async function requestInfo(event) {
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/search?apiKey=196f5984b339460580d5dfca1b04e7be&query=' + $("input[id=recipeVal]").val() + '&number=1&limitLicense=true&instructionsRequired=true', // NUMBER IS SET TO 1 FOR NOW, CHANGE TO 10
    });
    return result;
}

async function getId(event) {
    let result = await requestID(event);
    let response = [];
    response.push(result.data);
    let recipe = response[0].results;
    let id = recipe[0].id;
    return id;
    // requestID(event).then(result => {
    //     let response = [];
    //     response.push(result.data);
    //     let recipe = response[0].results;
    //     let id = recipe[0].id;
    //     return id;
    // }).catch(error => {
    //     console.log("Unable to fetch searched")
    // });
}

async function recipeSearch(event) {
    let id = await getId(event);
    alert(id);
}

$(document).on('click', '#recipeSearch', recipeSearch);