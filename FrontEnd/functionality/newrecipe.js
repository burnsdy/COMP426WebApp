async function addRecipePrivate() {
    event.preventDefault();
    // const id = document.getElementById("id").value;
    // alert(id);
    const name = document.getElementById("name").value;
    const id = stringToHash(name);
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
        document.write(`
        <style>
        .alert {
          padding: 20px;
          background-color: #00ff00;
          color: white;
        }
        
        .closebtn {
          margin-left: 15px;
          color: white;
          font-weight: bold;
          float: right;
          font-size: 22px;
          line-height: 20px;
          cursor: pointer;
          transition: 0.3s;
        }
        
        .closebtn:hover {
          color: black;
        }
        </style>
        <div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Congrats!</strong> You just made a new recipe! Click <a href="myrecipes.html">Here</a> to look at your recipes.
        </div>
        `);
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