document.addEventListener('DOMContentLoaded', function () {
    loadGalery();
});
function loadGalery() {
    const Image1 = document.querySelector('#udemy01');
    Image1.dataset.imageId = '1';
    Image1.onclick = clicImage;
    const Image2 = document.querySelector('#udemy02');
    Image2.dataset.imageId = '2';
    Image2.onclick = clicImage;
    const Image3 = document.querySelector('#udemy03');
    Image3.dataset.imageId = '3';
    Image3.onclick = clicImage;
    const Image4 = document.querySelector('#udemy04');
    Image4.dataset.imageId = '4';
    Image4.onclick = clicImage;

    // const Gallery = document.querySelector('.imageList');
    //  for (let i = 1; i <= 4; i++) {
    //      const Image = document.querySelector('.imageCert');
    //      Image.src = `img/certificados/${id}.png`;
    //      Image.dataset.imageId = i;
    //      //Evento Click en Imagen
    //      Image.onclick = clicImage;
    //      //ItemLista
    //      const List = document.createElement('LI');
    //      List.appendChild(Image);
    //      Gallery.appendChild(List);
    //  }
    //alert('Galeria cargada correctamente');
}

function clicImage(e) {
     //alert('Diste click en una Imagen ' + e.target.dataset.imageId);
    //generando imagen
    const id = e.target.dataset.imageId;
    const Image = document.createElement('IMG');
    Image.src = `img/certificados/${id}.png`;
    Image.classList.add('thumbImage');

    //crear overlay para mostrar imagen
    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');

    //contenedor btnCerrar
    const closeBTNDIV = document.createElement('DIV');
    closeBTNDIV.classList.add('alignRigth');

    //boton cerrar
    const closeBTN = document.createElement('P');
    closeBTN.textContent = 'X';
    closeBTN.classList.add('btnClose');
    closeBTN.onclick = function () {
        overlay.remove();
        body.classList.remove('fijarBody');
    };
    closeBTNDIV.appendChild(closeBTN);
    
    /*Agregar Boton de Cerrar*/
    overlay.appendChild(closeBTNDIV);
    /*Agregar Imagen*/
    overlay.appendChild(Image);

    //mostrar en HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijarBody');


}