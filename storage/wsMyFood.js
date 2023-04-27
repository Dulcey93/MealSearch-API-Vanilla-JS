let plantilla;
const mealList = document.getElementById('meal');

let getMealList = async (url) => {
    try {
        let respuesta = await fetch(url);
        let resultado = await respuesta.json();

        let meals = await Promise.all(resultado.meals.map(async (index) => {
            plantilla =/*html*/ 
            `
                <div class = "meal-item" data-id = "${index.idMeal}">
                    <div class = "meal-img">
                        <img src = "${index.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${index.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `
            return plantilla;
        }));

        let data = meals.join('');
        mealList.classList.remove('notFound');
        postMessage({ message: "getMealList", data: data });

    } catch (error) {
        mealList.classList.add('notFound');
        postMessage({ message: "error" })
    }
}

let getDetails = async (url) => {
    try {
        let respuesta = await fetch(url);
        let resultado = await respuesta.json();
        meal = resultado.meals["0"];
        let modal = `
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
        `
        postMessage({ message: "getDetails", data: modal });

    } catch (error) {
        console.log(error);
    }
}

onmessage = (e) => {
    let { message, url } = e.data;

    if (message === "getMealList") {
        getMealList(url);
    } else if (message === "getDetails") {
        getDetails(url);
    }
}