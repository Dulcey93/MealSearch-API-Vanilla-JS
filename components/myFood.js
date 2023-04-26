export default {
    render() {
        const worker = new Worker('storage/wsMyCard.js', {type: 'module'});
        worker.postMessage({action: 'init'});
        worker.addEventListener('message', response => {
            document.querySelector('#contenedor-pokemon').insertAdjacentHTML('beforeend', response.data);
        })
    }
}