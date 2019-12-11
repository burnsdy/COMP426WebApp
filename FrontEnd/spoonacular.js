export async function recipeSearch(event) {
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/search?apiKey=196f5984b339460580d5dfca1b04e7be&query=' + $("input[id=recipeVal]").val() + '&number=1&limitLicense=true&instructionsRequired=true', // NUMBER IS SET TO 1 FOR NOW, CHANGE TO 10
    });

    // for(let i=0; i<result.length; i++) {
    //     if (result[i].data.id == event.target.id) {
    //         oldTweet = result[i].data;
    //     }
    // }


    let recipes = result["results"];
    alert(recipes[0].title);
}

$(document).on('click', '#recipeSearch', recipeSearch);