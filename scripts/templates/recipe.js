function recipeTemplate(data) {
    const { id, image, name, serving, ingredients, time, description, appliance, ustensils } = data;
    //const { image, name } = data;

    function createRecipeCard() {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipeCard');
        recipeCard.id = `rcp_${id}`;
        const img_container = document.createElement('div');
        img_container.classList = 'img_container';
        const img = document.createElement('img');
        img.setAttribute('src', `assets/images/recipes/${image}`);
        const cardInsert = document.createElement('div');
        cardInsert.classList = 'card_insert';
        const cookTime = document.createElement('p');
        cookTime.innerText = `${time}min`;
        const title = document.createElement('h2');
        title.innerText = name;
        const info_container = document.createElement('div');
        info_container.classList = 'recipeDetail ';
        const label_recipe = document.createElement('h3');
        const label_ingredient = document.createElement('h3');
        label_recipe.innerText = 'RECETTE';
        label_ingredient.innerText = 'INGREDIENTS';
        const recipeDescription = document.createElement('p');
        recipeDescription.innerText = description;
        recipeDescription.classList = 'recipeDescription';
        const ingredients_container = document.createElement('div');
        ingredients_container.classList = 'ingredientList';
        ingredients.forEach((element) => {
            var ingredient_box = document.createElement('div');
            var ingredient_name = document.createElement('p');
            ingredient_name.classList = 'ingredient_name';
            ingredient_name.innerText = element.ingredient;
            var ingredient_qty = document.createElement('p');
            ingredient_qty.classList = 'ingredient_qty';
            if (element.quantity != undefined) {
                if (element.unit == 'grammes') {
                    ingredient_qty.innerText = `${element.quantity}g`;
                } else if (element.unit != ('grammes' && undefined)) {
                    ingredient_qty.innerText = `${element.quantity}${element.unit}`;
                } else if (element.unit === undefined) {
                    ingredient_qty.innerText = `${element.quantity}`;
                }
            }

            ingredient_box.appendChild(ingredient_name);
            ingredient_box.appendChild(ingredient_qty);
            ingredients_container.appendChild(ingredient_box);
        });

        cardInsert.appendChild(cookTime);
        img_container.appendChild(img);
        img_container.appendChild(cardInsert);
        info_container.appendChild(title);
        info_container.appendChild(label_recipe);
        info_container.appendChild(recipeDescription);
        info_container.appendChild(label_ingredient);
        info_container.appendChild(ingredients_container);
        recipeCard.appendChild(img_container);
        recipeCard.appendChild(info_container);
        // recipeCard.appendChild(cookTime);

        return recipeCard;
    }
    return { createRecipeCard };
}
