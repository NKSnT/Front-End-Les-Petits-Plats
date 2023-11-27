function tagTemplate(element) {
    var selectedTagName = element.innerText.toLowerCase();

    var anchor = element.parentElement.firstChild;
    var tagOption_active = document.createElement('div');
    var tagOption_active_label = document.createElement('p');
    var tagOption_active_cancel = document.createElement('img');
    tagOption_active_cancel.setAttribute('src', 'assets/icons/close_circle.svg');
    tagOption_active_label.innerText = selectedTagName;
    tagOption_active.classList = 'tagOption_active';
    tagOption_active.appendChild(tagOption_active_label);
    tagOption_active.appendChild(tagOption_active_cancel);
    anchor.insertAdjacentElement('afterend', tagOption_active);
    element.style.display = 'none';

    tagOption_active_cancel.addEventListener('click', function (e) {
        removeTag(this.parentElement.firstChild.innerText.toLowerCase());
    });

    var selectedTagDOM = document.createElement('div');
    selectedTagDOM.classList = 'selectedTag';
    selectedTagDOM.innerHTML = `<p>${selectedTagName}</p>`;
    var closeSelectedTag = document.createElement('img');
    closeSelectedTag.setAttribute('src', 'assets/icons/close.svg');

    closeSelectedTag.addEventListener('click', function (e) {
        removeTag(this.parentElement.firstChild.innerText.toLowerCase());
    });

    selectedTagDOM.appendChild(closeSelectedTag);
    activeFilters.appendChild(selectedTagDOM);

    function removeTag(tagToRemove) {
        //suprime le tag si déja présent
        element.style.display = 'block';
        var headings1 = document.evaluate(
            `//div[@class='selectedTag']//p[contains(., '${tagToRemove}')]`,
            document,
            null,
            XPathResult.ANY_TYPE,
            null
        );
        var headings2 = document.evaluate(
            `//div[@class='tagOption_active']//p[contains(., '${tagToRemove}')]`,
            document,
            null,
            XPathResult.ANY_TYPE,
            null
        );
        //remove the coresponding selected tag div
        var tagRemoved = headings1.iterateNext().parentElement;
        var activeOptionRemoved = headings2.iterateNext().parentElement;
        tagRemoved.remove();
        activeOptionRemoved.remove();

        var index = selectedTagList.indexOf(tagToRemove.toLowerCase());
        selectedTagList.splice(index, 1); //remove the tag frome the selected tag list

        secondaryRecipesList = [];
        newRecipesbis = filterByKeyWord(activeResearch);
        newRecipes = filterByTags(selectedTagList);
        g_ShowRecipesList(newRecipes);
    }

    return { tagOption_active, selectedTagDOM };
}
