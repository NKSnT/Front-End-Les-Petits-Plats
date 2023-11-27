function createRecipeDOM(recipes) {
    const section = document.createElement('section');
    section.classList = 'recipesListe';
    recipes.forEach((recipe) => {
        const Template = recipeTemplate(recipe);
        const recipCard = Template.createRecipeCard();
        section.appendChild(recipCard);
    });
    return section;
}
