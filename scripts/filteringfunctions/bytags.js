//let newRecipes = new Array();

function filterByTags(data) {
    var newFilteredList = getShowRecipesList(data);

    /* gere l'update des tag possible apres une recherche */
    var newfilersList = createFilterDOM(newFilteredList);
    var tagoptionList = document.querySelectorAll('.tagOption');
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
    return newFilteredList;

    /* obtien la liste des recete a afficher apres le filtrage */
    function getShowRecipesList(data) {
        var comparativArr;
        var dataToReturn;
        //var tagtoggle = selectedTagList.length;

        if (primaryRecipesList.length == 0) {
            comparativArr = recipes;
        } else {
            //comparativArr = secondatryRecipesList; update by keyword
            comparativArr = primaryRecipesList;
        }
        if (data.length >= 1) {
            data.forEach((e) => {
                targetTag = e;
                var recipesShowList = comparativArr.filter((item) => {
                    if (
                        item.appliance.toLowerCase() == targetTag ||
                        item.ingredients.some((e) => e.ingredient.toLowerCase() == targetTag) ||
                        item.ustensils
                            .map((a) => {
                                return a.toLowerCase();
                            })
                            .includes(`${targetTag}`)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                });
                //return recipesShowList;
                dataToReturn = recipesShowList;
            });
        } else if (selectedTagList.length == 0) {
            dataToReturn = comparativArr;
        }
        secondatryRecipesList = comparativArr;
        return dataToReturn;
    }
}
