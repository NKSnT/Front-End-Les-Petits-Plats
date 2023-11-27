function filterByKeyWord(keyword) {
    var keyW = keyword;

    var elementsList = getShowElementsList(keyW);
    var newFilteredList = getShowRecipesList(elementsList);
    return newFilteredList;

    function getShowElementsList(keyW) {
        var showedRecipes = document.querySelectorAll('.recipeCard');

        var filteredElementsListId = new Array();
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
                filteredElementsListId.push(e.id.slice(-1));
            }
        });
        return filteredElementsListId;
    }
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
        primaryRecipesList = recipesShowList;
        return recipesShowList;
    }
}
