function insertTemplate(nb) {
    var label = document.createElement('p');
    label.innerText = 'recettes';
    var counter = document.createElement('p');
    counter.setAttribute('id', 'recipeCounter');
    counter.innerText = nb;

    return { label, counter };
}
