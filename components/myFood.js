export default {
    cargaInicio() {
        const searchBtn = document.getElementById('search-btn');
        const mealList = document.getElementById('meal');

        searchBtn.addEventListener('click', () => {
            let searchInputTxt = document.getElementById('search-input').value.trim().toLowerCase();
            const all = new Worker("../storage/wsMyFood.js", { type: "module" });
            all.postMessage({ accion: "showAll", body: searchInputTxt });
            all.addEventListener("message", (e) => {
                mealList.innerHTML = [...e.data];
                all.terminate()
            })
            this.searchOneByName();            
        });
    },


    searchOneByName() {
        addEventListener('click', (e) => {
            if (e.target.classList.contains('recipe-btn')) {
                const recipeCloseBtn = document.getElementById('recipe-close-btn');
                const mealDetailsContent = document.querySelector('.meal-details-content');
                e.preventDefault();
                let mealItem = e.target.parentElement.parentElement;
                const searchs = new Worker("../storage/wsMyFood.js", { type: "module" });
                searchs.postMessage({ accion: "searchOneBYName", body: mealItem.dataset.id })
                searchs.addEventListener("message", (e) => {
                    mealDetailsContent.innerHTML = e.data;
                    mealDetailsContent.parentElement.classList.add('showRecipe');
                    searchs.terminate()
                })
                recipeCloseBtn.addEventListener('click', () => {
                    mealDetailsContent.parentElement.classList.remove('showRecipe');
                });
            }
        })
    }
}