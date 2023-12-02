let load = true;
//fonction qui récupere chaque élément unique parmis les ingrédient,lesustensile,...
//et qui les fournis au constructeur des filtres
function createFilterDOM(recipes) {
    function getUniqueItemList(recipes, typeOfItem) {
        var allUniqueItem = new Array();
        if (typeOfItem == 'appliance') {
            allUniqueItem = [...new Set(recipes.map((item) => item.appliance.toLowerCase()))];
        } else {
            var allItems = new Array();
            recipes.forEach(function (recipe) {
                if (typeOfItem == 'ingredients') {
                    var recipeItemList = recipe.ingredients.map((item) =>
                        item.ingredient.toLowerCase()
                    );
                    allItems = allItems.concat(recipeItemList);
                } else if (typeOfItem == 'ustensils') {
                    var recipeItemList = recipe.ustensils.map((item) => item.toLowerCase());
                    allItems = allItems.concat(recipeItemList);
                }
            });
            allUniqueItem = [...new Set(allItems.map((item) => item))];
        }
        return allUniqueItem;
    }

    var applianceList = getUniqueItemList(recipes, 'appliance');
    var ingredientsList = getUniqueItemList(recipes, 'ingredients');
    var ustensilsList = getUniqueItemList(recipes, 'ustensils');

    if (load) {
        var applianceFilter = filterTemplate(applianceList, 'appliance');
        var ingredientFilter = filterTemplate(ingredientsList, 'ingredients');
        var ustensilFilter = filterTemplate(ustensilsList, 'ustensiles');
        load = false;
        return { applianceFilter, ingredientFilter, ustensilFilter };
    } else {
        var fullList = applianceList.concat(ingredientsList, ustensilsList);
        return fullList;
    }
}
