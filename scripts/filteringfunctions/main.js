let primaryRecipesList = new Array();
//arr modifier by keyword, used for secondary tag search
let secondaryRecipesList = new Array();
//arr modifier par tag used for secondary keyword search

let newFilteredList = new Array();

let selectedTagList = new Array();

let activeResearch = undefined;
//a déplacé plus tard, mais est appeler en premier, puis apelle les fonction bytag/bykeyword
function filterIni() {
    function bykeyword(data) {
        if (data) {
            activeResearch = data;
            var newList = filterByKeyWord(data);
            g_ShowRecipesList(newList);
            var newfilersList = createFilterDOM(newList);
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
        } else {
            //if research is canceled
            if (secondaryRecipesList.length == 0) {
                g_ShowRecipesList(recipes);
            } else {
                primaryRecipesList = []; //reset la base pour le tri par tag
                var resetList = filterByTags(selectedTagList);
                g_ShowRecipesList(resetList);
            }
            activeResearch = undefined;
        }
    }
    function bytag(data) {
        tagTemplate(data);
        var tagName = data.innerText.toLowerCase();
        selectedTagList.push(tagName);
        var newList = filterByTags(selectedTagList);
        g_ShowRecipesList(newList);
        //secondaryRecipesList = newList;
    }
    return { bykeyword, bytag };
}
function g_ShowRecipesList(newRecipesList, refArr) {
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
