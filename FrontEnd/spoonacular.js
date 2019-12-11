export async function recipeSearch() {
    event.preventDefault();
    try{
        const result = await axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + document.getElementById("recipeVal").value + '&number=1&limitLicense=true&instructionsRequired=true', // NUMBER IS SET TO 1 FOR NOW, CHANGE TO 10
        });
        alert(result[0].id);
    } catch (error) {
        alert(error);
    }
    

    // for(let i=0; i<result.length; i++) {
    //     if (result[i].data.id == event.target.id) {
    //         oldTweet = result[i].data;
    //     }
    // 
    // alert(result.results);
    
    // let recipes = result["results"];
    // alert(recipes[0].title);
}

// $(document).on('click', '#recSearch', recipeSearch);