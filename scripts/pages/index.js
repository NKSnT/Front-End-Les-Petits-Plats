async function getRecipe() {
    let recipe_liste = recipes;
    return recipe_liste;
}
/* 
async function sortData(recipes) {
    var recipesListe = new Array();
    recipes.forEach((recipe) => {
        //if params x == y
        //do 
        //filter
    })
} 
*/
let areFiltersReset = false;

async function displayData(recipes) {
    const main = document.getElementById('main');
    const searchBarre = document.getElementById('search');
    searchBarre.addEventListener('keyup', () => {
        var reserch = searchBarre.value;
        if (reserch.length >= 3) {
            filterIni().bykeyword(reserch);
            areFiltersReset = false;
        } else if (reserch.length < 3 && areFiltersReset == false) {
            filterIni().bykeyword();
            areFiltersReset = true;
        }
    });
    const filters = document.getElementById('filters');
    const filterDOM = createFilterDOM(recipes);
    const userCardDOM = createRecipeDOM(recipes);
    filters.appendChild(filterDOM.applianceFilter);
    filters.appendChild(filterDOM.ingredientFilter);
    filters.appendChild(filterDOM.ustensilFilter);

    main.appendChild(userCardDOM);
}

async function init() {
    const recipes = await getRecipe();
    displayData(recipes);
}

init();
