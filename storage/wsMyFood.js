export let wsmyCards = {
    async render_data_cards(){
      let datos = "";
      for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            datos += /*html*/
            `
            <div class="col pt-4">
              <div class="card">
                <img src="./images/bg-pattern-card.svg" alt="imagen header card" class="card-header" />
                <div class="card-body">
                  <img src=${pokemon.sprites.other.dream_world.front_default} alt="imagen de vitoko" class="card-body-img" />
                  <h1 class="card-body-title">
                    ${pokemon.name} hp 
                    <span>${pokemon.stats[0].base_stat} hp</span>
                  </h1>
                  <p class="card-body-text">${pokemon.base_experience} exp</p>
                </div>
                <div class="card-footer">
                  <div class="card-footer-social">
                    <h3>${pokemon.stats[1].base_stat}K</h3>
                    <p>Ataque</p>
                  </div>
                  <div class="card-footer-social">
                    <h3>${pokemon.stats[3].base_stat}K</h3>
                    <p>Ataque especial</p>
                  </div>
                  <div class="card-footer-social">
                    <h3>${pokemon.stats[2].base_stat}K</h3>
                    <p>Defensa</p>
                  </div>
                </div>
              </div>
            </div>
            
          `
        }
        catch (error) {
            console.error(error);
        }
      }
      return datos;
    }    
}

// Escucha los mensajes que recibe el Worker.
self.addEventListener('message', async(e)=> {
    let result= await wsmyCards.render_data_cards();
    postMessage(result);
});