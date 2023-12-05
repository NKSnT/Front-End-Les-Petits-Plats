//fonction de filtrage par filtre
function filterByTags(data) {
    // recuper les donnée triés

    var newFilteredList = getShowRecipesList(data);
    var tagoptionList = document.querySelectorAll('.tagOption');
    /* gere l'update des tag possible apres une recherche */
    var newfilersList = createFilterDOM(newFilteredList);
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

        if (primaryRecipesList.length == 0) {
            comparativArr = recipes;
        } else {
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
                comparativArr = recipesShowList;
            });
        }
        dataToReturn = comparativArr;
        secondatryRecipesList = comparativArr; // ini pour une recherche par mots clée
        return dataToReturn;
    }
}
