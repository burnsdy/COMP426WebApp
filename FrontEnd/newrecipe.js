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
            url: "http://localhost:3000/private/recipes",
            headers: {Authorization: `Bearer ${tokenStr}`},
            data: {
                data: {
                    item: {
                        id: id,
                        name: name,
                        ingredients: ingredients,
                        instructions: instructions,
                    }
                }
            },
            type: "merge",
        })
    } catch (error) {
        alert(error);
    }
}