export default {
    render() {
        let ws = new Worker("../storage/wsMyFood.js");

        const searchBtn = document.getElementById('search-btn');
        const mealList = document.getElementById('meal');
        const mealDetailsContent = document.querySelector('.meal-details-content');
        const recipeCloseBtn = document.getElementById('recipe-close-btn');
        // event listeners
        searchBtn.addEventListener('click', getMealList);
        mealList.addEventListener('click', getMealRecipe);
        recipeCloseBtn.addEventListener('click', () => {
            mealDetailsContent.parentElement.classList.remove('showRecipe');
        });

        // get meal list that matches with the ingredients
        function getMealList() {
            let searchInputTxt = document.getElementById('search-input').value.trim().toLowerCase();
            if (!searchInputTxt) return;
            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`;

            ws.postMessage({ message: "getMealList", url: url});
        }
        // get recipe of the meal
        function getMealRecipe(e) {
            e.preventDefault();
            if (e.target.classList.contains('recipe-btn')) {
                let mealItem = e.target.parentElement.parentElement;
                let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
                ws.postMessage({ message: "getDetails", url: url });
            }
        }

        ws.onmessage = (e) => {
            let { message, data } = e.data;

            if (message === "getMealList") {
                mealList.innerHTML = data;
            } else if (message === "getDetails") {
                mealDetailsContent.innerHTML = data;
                mealDetailsContent.parentElement.classList.add('showRecipe');
            }else if (message === "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Please enter a valid ingredient'
                })
            }
        }
    }
}
