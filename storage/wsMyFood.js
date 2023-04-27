
import api from "../API/api.js";

let ws = {
    async showAll(searchInputTxt){
        const data = await api.getAll(searchInputTxt);
        console.log(data.meals);
        let  html = ``;
        data.meals.forEach(element => {
            const { idMeal, strMealThumb, strMeal } = element;
            html+=`
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


    // Falta terminar
    async searchOneBYName(id) {
        let html = '';
        const data = await api.searchOne(id);
        data.results.forEach(element => {
            const { id, title, overview, poster_path  } = element;
            if (poster_path) {
                html+=`
                <div class="card text-center cardhover" style="width: 18rem; border: 1px solid black;">
                    <div class="w-100 h-100 position-absolute cardcover d-danger">
                        <h5 class="card-title ">${title}</h5>
                        <button type="button" class="btn btn-primary z-3  details" data-movie="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top imgs" alt="..." >
                </div>
            `
            }   
        });
        return [html];
    }
}

self.addEventListener("message", (e)=>{
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body)? e.data.body: undefined)).then(res => postMessage(res));
})