async function addRecipePrivate() {
    event.preventDefault();
    const id = document.getElementById("id").value;
    // alert(id);
    const name = document.getElementById("name").value;
    // alert(name);
    const ingredients = document.getElementById("ingredients").value;
    // alert(ingredients);
    const instructions = document.getElementById("instructions").value;
    // alert(instructions);
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
        addRecipeUser(id, name, ingredients, instructions);
    } catch (error) {
        alert(error);
    }
}

async function addRecipeUser(id, name, ingredients, instructions){
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