//fonction de filtrage par mots clés
function filterByKeyWord(keyword) {
    var keyW = keyword;

    var elementsList = getShowElementsList(keyW);
    var newFilteredList = getShowRecipesList(elementsList);
    return newFilteredList;

    function getShowElementsList(keyW) {
        var showedRecipes = document.querySelectorAll('.recipeCard');
        var filteredElementsListId = new Array();
        //effectue le triage des element du dom (contien le mots clé dans la description / titre / aliment)
        showedRecipes.forEach((e) => {
            var ref = e.lastChild;
            var title = ref.firstChild;
            var desc = ref.querySelector('.recipeDescription');
            var ingr = ref.querySelector('.ingredientList');
            var ingrList = ingr.querySelectorAll('.ingredient_name');
            var ingrListContent = new Array();
            ingrList.forEach((e) => {
                ingrListContent.push(e.innerText);
            });
            if (
                title.innerText.toLowerCase().includes(keyW) ||
                desc.innerText.toLowerCase().includes(keyW) ||
                ingrListContent
                    .map((a) => {
                        return a.toLowerCase();
                    })
                    .includes(keyW)
            ) {
                filteredElementsListId.push(e.id.split('_').pop());
            }
        });
        return filteredElementsListId;
    }
    //efectue le triage dans la "data"
    function getShowRecipesList(elementsList) {
        var comparativArr;
        if (secondaryRecipesList.length == 0) {
            comparativArr = recipes;
        } else {
            comparativArr = secondaryRecipesList;
        }
        var recipesShowList = comparativArr.filter((item) => {
            if (elementsList.includes(JSON.stringify(item.id))) {
                return true;
            } else {
                return false;
            }
        });
        primaryRecipesList = recipesShowList; //ini pour la prochaine recherche par filtre
        return recipesShowList;
    }
}
