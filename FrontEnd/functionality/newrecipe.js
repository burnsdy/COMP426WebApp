async function addRecipePrivate() {
    event.preventDefault();
    // const id = document.getElementById("id").value;
    // alert(id);
    const name = document.getElementById("name").value;
    const id = stringToHash(name);
    // id = stripSlashes(id);
    // alert(name);
    const ingredients = document.getElementById("ingredients").value;
    let ingredientsArr = ingredients.split(',');
    for(let i=0; i<ingredientsArr.length; i++) {
        ingredientsArr[i] = ingredientsArr[i].trim();
    }
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
                    'name': name,
                    'ingredients': ingredientsArr,
                    'instructions': instructions,
                }
            }
        });
        addRecipeUser(id, name, ingredients, instructions);
    } catch (error) {
        alert(error);
    }
}
function stripSlashes(str){
    return (str + '')
    .replace(/\\(.?)/g, function (s, n1) {
      switch (n1) {
        case '\\':
          return '\\'
        case '0':
          return '\u0000'
        case '':
          return ''
        default:
          return n1
      }
    })
}
async function addRecipeUser(id, name, ingredients, instructions){
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
        alert("Congrats! You just made a new recipe! Click your account name to see your stored recipes!")
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