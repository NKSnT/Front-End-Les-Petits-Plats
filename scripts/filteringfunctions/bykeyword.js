function filterByKeyWord(keyword) {
    var keyW = keyword;

    var elementsList = getShowElementsList(keyW);
    var newFilteredList = getShowRecipesList(elementsList);
    return newFilteredList;

    function getShowElementsList(keyW) {
        var showedRecipes = document.querySelectorAll('.recipeCard');

        var filteredElementsListId = new Array();
        for (i = 0; i < showedRecipes.length; i++) {
            var ref = showedRecipes[i].lastChild;
            var title = ref.firstChild;
            var desc = ref.querySelector('.recipeDescription');
            var ingr = ref.querySelector('.ingredientList');
            var ingrList = ingr.querySelectorAll('.ingredient_name');
            var ingrListContent = new Array();
            for (n = 0; n < ingrList.length; n++) {
                ingrListContent.push(ingrList[n].innerText);
            }
            if (
                title.innerText.toLowerCase().includes(keyW) ||
                desc.innerText.toLowerCase().includes(keyW) ||
                ingrListContent
                    .map((a) => {
                        return a.toLowerCase();
                    })
                    .includes(keyW)
            ) {
                filteredElementsListId.push(showedRecipes[i].id.split('_').pop());
            }
        }
        return filteredElementsListId;
    }
    function getShowRecipesList(elementsList) {
        console.log(elementsList);
        var recipesShowList = new Array();
        var comparativArr;
        if (secondaryRecipesList.length == 0) {
            comparativArr = recipes;
        } else {
            comparativArr = secondaryRecipesList;
        }
        var j = 0;

        while (j < comparativArr.length) {
            for (k = 0; k < elementsList.length; k++) {
                if (elementsList[k] == JSON.stringify(comparativArr[j].id)) {
                    recipesShowList.push(comparativArr[j]);
                }
            }
            j++;
        }
        primaryRecipesList = recipesShowList;
        return recipesShowList;
    }
}
