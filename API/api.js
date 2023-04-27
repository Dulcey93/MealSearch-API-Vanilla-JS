
// get populars
const getAll =  async (searchInputTxt)=>{
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


// Get Details 
const searchOne = async (id) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}



export default{
    getAll,
    searchOne
}