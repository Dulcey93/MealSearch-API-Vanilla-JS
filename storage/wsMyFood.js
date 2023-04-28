
import api from "../API/api.js";

let ws = {
    async showAll(searchInputTxt) {
        const data = await api.getAll(searchInputTxt);
        console.log(data.meals);
        let html = ``;
        data.meals.forEach(element => {
            const { idMeal, strMealThumb, strMeal } = element;
            html += `
            <div class = "meal-item" data-id = "${idMeal}">
                <div class = "meal-img">
                    <img src = "${strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
            </div>
            `
        });
        return [html];
    },

    async searchOneBYName(meal) {
        const search = await api.searchOne(meal);
        console.log(search);
        meal = await search.meals[0];
        let html = `
            <h2 class = "recipe-title">${meal.strMeal}</h2>
            <p class = "recipe-category">${meal.strCategory}</p>
            <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>
            <div class = "recipe-meal-img">
                <img src = "${meal.strMealThumb}" alt = "">
            </div>
            <div class = "recipe-link">
                <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
            </div>
        `;
        return html;
    }
}

self.addEventListener("message", (e) => {
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body) ? e.data.body : undefined)).then(res => postMessage(res));
})