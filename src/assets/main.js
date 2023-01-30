const API_YOUTUBE = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=5';

// aca seleccionamos el contenedor donde vamos a poner los videos
const content = null || document.getElementById("content");


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '55ddeecbbbmshd3d45a873577915p1cc0e2jsn2cc50726f56a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function obtenerDatosConFetch(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
};

// funcion anonima autoejecutable que se invoque a si misma
(async ()=>{
    //Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
    try {
        let videos = await obtenerDatosConFetch(API_YOUTUBE);
        // ya almacenados los videos, tenemos que mostrarlos en el HTML, para eso tenemos que hacer exactamente lo mismo que hicimos en el curso practico de JS, crear la plantilla HTML y hacer los inners, los appendchild, etc.

        // pero lo vamos a hacer de otra forma, mediante una plantilla/template, que nos permitira iterar por cada uno de los elementos y se hace asi:


        // <div class="group relative">
        //   <div
        //     class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        //     <img src="" alt="" class="w-full">
        //   </div>
        //   <div class="mt-4 flex justify-between">
        //     <h3 class="text-sm text-gray-700">
        //       <span aria-hidden="true" class="absolute inset-0"></span>
        //       title
        //     </h3>
        //   </div>
        // </div>

        // MAP PARA TRANSFORMAR EL ARREGLO, EN ESTE CASO, TRANSFORMARLO A LA PLANTILLA QUE LE APLICO A CADA ELEMENTO
        // esto itera por si solo con el .map
        let plantilla = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0,4).join("")} 
        `;

        content.innerHTML = plantilla;

        // ahora toca iterar sobre los elementos que son respuesta de la peticion, para eso ir hasta arriba en la variable plantilla y hacer lo de la linea 43, dentro de la arrow function de dicha linea pegar la plantilla 

    } catch (error) {
        console.log(error);

        // reto, el error mostrarlo en pantalla para el usuario
    }
})();