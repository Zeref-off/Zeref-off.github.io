document.getElementById('clickText1').addEventListener('click', function () {
    var tapalo_todo = document.getElementById('tapalotodo');
    var newContent = document.getElementById('nuevo');
    var newContent2 = document.getElementById('nuevo2');
    var newContent3 = document.getElementById('nuevo3');

    if (tapalo_todo.style.display !== 'none') {
        tapalo_todo.style.display = 'none';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
        newContent.style.display = 'block';
    } else {
        originalContent.style.display = 'block';
        newContent.style.display = 'none';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
    }
});

document.getElementById('clickText2').addEventListener('click', function () {
    var tapalo_todo = document.getElementById('tapalotodo');
    var newContent = document.getElementById('nuevo2');
    var newContent2 = document.getElementById('nuevo');
    var newContent3 = document.getElementById('nuevo3');

    if (tapalo_todo.style.display !== 'none') {
        tapalo_todo.style.display = 'none';
        newContent.style.display = 'block';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
    } else {
        originalContent.style.display = 'block';
        newContent.style.display = 'none';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
    }
});

document.getElementById('clickText3').addEventListener('click', function () {
    var tapalo_todo = document.getElementById('tapalotodo');
    var newContent = document.getElementById('nuevo3');
    var newContent2 = document.getElementById('nuevo2');
    var newContent3 = document.getElementById('nuevo');

    if (tapalo_todo.style.display !== 'none') {
        tapalo_todo.style.display = 'none';
        newContent.style.display = 'block';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
    } else {
        originalContent.style.display = 'block';
        newContent.style.display = 'none';
        newContent2.style.display = 'none';
        newContent3.style.display = 'none';
    }
});



function mostrar_todo(){
    var tapalo_todo;
    var linea_bifiliar;
    var linea_microcinta;
    var muestra_coaxial;
    var muestra_paralelas;
    var muestra_bifiliar;
    var muestra_microcinta

        tapalo_todo = document.getElementById("tapalotodo");
        linea_bifiliar = document.getElementById("nuevo");
        linea_microcinta = document.getElementById("nuevo2");
        muestra_coaxial = document.getElementById("nuevo3");
        muestra_paralelas = document.getElementById("muestra_paralelas");
        muestra_bifiliar = document.getElementById("muestra_bifiliar");
        muestra_microcinta = document.getElementById("muestra_microcinta");

        tapalo_todo.style.display = "block";
        linea_bifiliar.style.display = "none";
        linea_microcinta.style.display = "none"
        muestra_coaxial.style.display = "none";
        muestra_paralelas.style.display = "none";
        muestra_bifiliar.style.display = "none";
        muestra_microcinta.style.display = "none"
}

function mostrar_1(){
    var tapalo_todo;
    var linea_bifiliar;
    var linea_microcinta;
    var muestra_coaxial;
    var muestra_paralelas;
    var muestra_bifiliar;
    var muestra_microcinta

        tapalo_todo = document.getElementById("tapalotodo");
        linea_bifiliar = document.getElementById("nuevo");
        linea_microcinta = document.getElementById("nuevo2");
        muestra_coaxial = document.getElementById("nuevo3");
        muestra_paralelas = document.getElementById("muestra_paralelas");
        muestra_bifiliar = document.getElementById("muestra_bifiliar");
        muestra_microcinta = document.getElementById("muestra_microcinta");

        tapalo_todo.style.display = "none";
        linea_bifiliar.style.display = "block";
        linea_microcinta.style.display = "none"
        muestra_coaxial.style.display = "none";
        muestra_paralelas.style.display = "none";
        muestra_bifiliar.style.display = "none";
        muestra_microcinta.style.display = "none"
}
function mostrar_2(){
    var tapalo_todo;
    var linea_bifiliar;
    var linea_microcinta;
    var muestra_coaxial;
    var muestra_paralelas;
    var muestra_bifiliar;
    var muestra_microcinta

        tapalo_todo = document.getElementById("tapalotodo");
        linea_bifiliar = document.getElementById("nuevo");
        linea_microcinta = document.getElementById("nuevo2");
        muestra_coaxial = document.getElementById("nuevo3");
        muestra_paralelas = document.getElementById("muestra_paralelas");
        muestra_bifiliar = document.getElementById("muestra_bifiliar");
        muestra_microcinta = document.getElementById("muestra_microcinta");

        tapalo_todo.style.display = "none";
        linea_bifiliar.style.display = "none";
        linea_microcinta.style.display = "block"
        muestra_coaxial.style.display = "none";
        muestra_paralelas.style.display = "none";
        muestra_bifiliar.style.display = "none";
        muestra_microcinta.style.display = "none"
}

function mostrar_3(){
    var tapalo_todo;
    var linea_bifiliar;
    var linea_microcinta;
    var muestra_coaxial;
    var muestra_paralelas;
    var muestra_bifiliar;
    var muestra_microcinta

        tapalo_todo = document.getElementById("tapalotodo");
        linea_bifiliar = document.getElementById("nuevo");
        linea_microcinta = document.getElementById("nuevo2");
        muestra_coaxial = document.getElementById("nuevo3");
        muestra_paralelas = document.getElementById("muestra_paralelas");
        muestra_bifiliar = document.getElementById("muestra_bifiliar");
        muestra_microcinta = document.getElementById("muestra_microcinta");

        tapalo_todo.style.display = "none";
        linea_bifiliar.style.display = "none";
        linea_microcinta.style.display = "none"
        muestra_coaxial.style.display = "block";
        muestra_paralelas.style.display = "none";
        muestra_bifiliar.style.display = "none";
        muestra_microcinta.style.display = "none"
}

function tapa_todo(){
    var muestra_coaxial;
    var muestra_paralelas;
    var muestra_bifiliar;
    var muestra_microcinta;

        muestra_coaxial = document.getElementById("nuevo");
        muestra_paralelas = document.getElementById("nuevo2");
        muestra_bifiliar = document.getElementById("nuevo3");
        muestra_microcinta = document.getElementById("muestra_microcinta");

        muestra_coaxial.style.display = "none";
        muestra_paralelas.style.display = "none";
        muestra_bifiliar.style.display = "none";
        muestra_microcinta.style.display = "none";
}



