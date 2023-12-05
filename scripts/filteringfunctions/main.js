let primaryRecipesList = new Array();
//arr modifier by keyword, used for secondary tag search
let secondaryRecipesList = new Array();
//arr modifier by tag used for secondary keyword search

let newFilteredList = new Array();
let selectedTagList = new Array();

let activeResearch = undefined;
let error = undefined;

function filterIni() {
    function bykeyword(data) {
        if (data) {
            activeResearch = data;
            var newList = filterByKeyWord(data); //recupere la list de recette a afficher
            //var newList = filterByKeyWordBis(data);
            g_ShowRecipesList(newList); //effectue l'affichage des recette nécessair
            if (newList.length == 0) {
                //crée l'element d'erreur dans le cas ou aucune recette ne corespond a la recherce
                if (!error) {
                    error = document.createElement('p');
                    error.id = 'error';
                    error.innerText = `Aucune recette ne contient "${data}"`;
                    document.getElementById('main').insertAdjacentElement('beforeend', error);
                } else {
                    error.innerText = `Aucune recette ne contient "${data}"`;
                }
            }
            var newfilersList = createFilterDOM(newList);
            var tagoptionList = document.querySelectorAll('.tagOption');

            /* gere l'update des tag possible apres une recherche */
            tagoptionList.forEach((e) => {
                if (!newfilersList.includes(e.innerText.toLowerCase())) {
                    if (!e.classList.contains('hidden')) {
                        e.classList.toggle('hidden');
                    }
                } else {
                    if (e.classList.contains('hidden')) {
                        e.classList.toggle('hidden');
                    }
                }
            });
        } else {
            //gere le cas ou aucun mot clé n'est passer en argument ( lenght < 3)
            //if research is canceled
            if (error) {
                error.remove();
                error = undefined;
            }
            if (primaryRecipesList.length != 0) {
                primaryRecipesList = []; //reset la base pour le tri par tag
            }
            if (secondaryRecipesList.length == 0) {
                g_ShowRecipesList(recipes);
            } else {
                var resetList = secondaryRecipesList;
                g_ShowRecipesList(resetList);
            }
            activeResearch = undefined;
        }
    }
    function bytag(data) {
        tagTemplate(data);
        var tagName = data.innerText.toLowerCase();
        selectedTagList.push(tagName); //ajout le tag passer en argument a la liste des filtres actif
        var newList = filterByTags(selectedTagList);
        g_ShowRecipesList(newList);
    }
    return { bykeyword, bytag };
}
function g_ShowRecipesList(newRecipesList) {
    var recipeCount = newRecipesList.length;
    var recipeCounter = document.getElementById('recipeCounter');
    recipeCounter.innerText = recipeCount;
    recipes.some((e) => {
        if (newRecipesList.includes(e)) {
            g_showElement(e);
        } else {
            g_hideElement(e);
        }
    });
}
function g_showElement(element) {
    var domElement = document.getElementById(`rcp_${element.id}`);
    if (domElement.classList.contains('hidden')) {
        domElement.classList.toggle('hidden');
    }
}
function g_hideElement(element) {
    var domElement = document.getElementById(`rcp_${element.id}`);
    if (!domElement.classList.contains('hidden')) {
        domElement.classList.toggle('hidden');
    }
}
