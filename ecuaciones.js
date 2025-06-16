// Obtener el elemento de la cuenta regresiva
var countdownElement = document.getElementById('countdown');

// Establecer la hora inicial en 5:0:0
var horas = 5;
var minutos = 0;
var segundos = 0;

// Función para actualizar la cuenta regresiva
function actualizarCuentaRegresiva() {
  // Formatear la hora, minuto y segundo con ceros a la izquierda si es necesario
  var horaFormateada = horas < 10 ? '0' + horas : horas;
  var minutoFormateado = minutos < 10 ? '0' + minutos : minutos;
  var segundoFormateado = segundos < 10 ? '0' + segundos : segundos;

  // Mostrar la hora, minuto y segundo en el elemento de cuenta regresiva
  countdownElement.innerHTML = horaFormateada + 'hr :' + minutoFormateado + 'min :' + segundoFormateado + 'seg';

  // Restar un segundo al tiempo actual
  segundos--;

  // Si los segundos llegan a cero, restar un minuto
  if (segundos < 0) {
    segundos = 59;
    minutos--;

    // Si los minutos llegan a cero, restar una hora
    if (minutos < 0) {
      minutos = 59;
      horas--;

      // Si las horas llegan a cero, reiniciar la cuenta regresiva
      if (horas < 0) {
        horas = 0;
        minutos = 0;
        segundos = 0;
      }
    }
  }
}

// Llamar a la función de actualización cada segundo
setInterval(actualizarCuentaRegresiva, 1000);


