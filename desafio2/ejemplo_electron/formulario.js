
const tabla = document.getElementById("table-body");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnAgregar = document.getElementById("btn-agregar");
const btnImprimir = document.getElementById("btn-imp");
const btnVolver = document.getElementById("btn-volver");
var maxProductos = "Sin limite";
var iva = 0.16;
var productos = [];
var subtotal = 0;
var montoIva = 0;
var total = 0;
var productosAgregados = 0;

document.form1.maxProductos.focus();

function validarNumero(input) {
    console.log(input)
    const msg = `mensaje-error-${input.name}` 
    const valor = parseInt(input.value);
    const mensajeError = document.getElementById(msg);
    
    if (valor <= 0) {
      input.classList.add("invalido");
      mensajeError.textContent = "Por favor, ingrese un número mayor a 0";
     btnSiguiente.disabled=true;
    } 
    if (valor >= 1 ) {
      input.classList.remove("invalido");
      mensajeError.textContent = "";
      btnSiguiente.disabled=false;
    }
  }

btnSiguiente.onclick = () => {
   if (parseInt(document.form1.maxProductos.value) > 0 && parseFloat(document.form1.iva.value) > 0) {
    
        //ANIMACION
        document.form1.style.transform = "translateX(-100%)";
        document.form2.style.transform = "translateX(0)";
    
        //CAMBIO EL maxProductos SI EL USUARIO LO INGRESO Y MUESTRO
        if (document.form1.maxProductos.value.trim() != "" && parseInt(document.form1.maxProductos.value) >= 1)
            maxProductos = parseInt(document.form1.maxProductos.value);
    
        document.getElementById("max-rest").innerText = maxProductos;
    
        //CAMBIO EL iva SI EL USUARIO LO INGRESO Y MUESTRO
        if (document.form1.iva.value.trim() != "" && parseFloat(document.form1.iva.value) >= 0.1)
            iva = parseFloat(document.form1.iva.value) / 100;
    
        document.getElementById("iva-prc").innerText = iva * 100 + "%";
    
        document.getElementById("main-msg").innerText = "Haga click en (Imprimir factura) cuando haya excedido el máximo o cuando haya terminado de agregar productos";
    
        document.form1.maxProductos.value = "";
        document.form1.iva.value = "";
    }else{
       if( parseInt(document.form1.maxProductos.value) <= 0){
           alert("Ingrese un valor mayor a 0 para el maximo de productos");
            
      }
      if (parseInt(document.form1.iva.value) <= 0) {
        alert("Ingrese un valor mayor a 0 para el iva");
      }
  }

}

//BOTON AGREGAR

btnAgregar.onclick = () => {
    //OBTENGO EL PRODUCTO
    let producto = llenarProducto();

    if (producto != null) {
        productos.push(producto);
        let fila = tabla.insertRow(-1);
        for (let index = 0; index < 3; index++) {
            fila.insertCell(index);
        }
        fila.cells.item(0).innerText = producto.nombre;
        fila.cells.item(1).innerText = producto.cantidad;
        fila.cells.item(2).innerText = producto.precio.toFixed(2) + "$";

        //LIMPIO INPUTS
        document.form2.nombre.value = "";
        document.form2.cantidad.value = "";
        document.form2.precio.value = "";

        //HAGO FOCO AL INPUT DE NOMBRE
        document.form2.nombre.focus();

        //CALCULO
        subtotal += (producto.precio * producto.cantidad);
        montoIva = subtotal * iva;
        total = subtotal + montoIva;

        //MUESTRO
        document.getElementById("t-subtotal").innerText = subtotal.toFixed(2);
        document.getElementById("t-montoIva").innerText = montoIva.toFixed(2);
        document.getElementById("t-total").innerText = total.toFixed(2);

        document.getElementById("factura").style.display = "block";

        //MANEJO QUE SE HAYA PASADO DEL LIMITE DE PRODUCTOS SI LO TIENE
        if (maxProductos != "Sin limite") {
            productosAgregados++;
            document.getElementById("max-rest").innerText = maxProductos - productosAgregados;

            if (productosAgregados >= maxProductos) {
                btnAgregar.disabled = true;
                document.form2.nombre.disabled = true;
                document.form2.cantidad.disabled = true;
                document.form2.precio.disabled = true;
                document.getElementById("max-rest").innerText = "Excedido";
                document.getElementById("max-rest").style.color = "red";
            }
        }
    }
}

//BOTON IMPRIMIR

btnImprimir.onclick = () => {
    //MUESTRO EL loading Y ESCONDO Y CAMBIO LO DEMAS
    document.getElementById("factura").style.display = "none";
    document.getElementById("forms-container").style.display = "none";
    document.getElementById("loading").style.display = "block";
    document.getElementById("main-msg").innerText = "Imprimiendo factura, por favor espere";

    //SIMULACION DE TIEMPO DE CARGA
    setTimeout(function () {
        document.getElementById("main-title").innerText = "Factura impresa con los siguientes datos";
        btnImprimir.style.display = "none";
        document.getElementById("btn-volver").style.display = "block";
        document.getElementById("table-title").innerText = "FACTURA"
        document.getElementById("loading").style.display = "none";
        document.getElementById("factura").style.display = "block";
        document.getElementById("main-msg").innerText = "Haga click en (Registrar otra factura) para volver al inicio";
    }, 2000);
}

//BOTON VOLVER
btnVolver.onclick = () => {
    //REESTABLEZCO TODO
    document.form1.style.transform = "translateX(0)";
    document.form2.style.transform = "translateX(100%)";
    document.getElementById("main-msg").innerText = "Los valores por defecto del Máximo de productos y el IVA son (Sin límite) y (16%) Respectivamente";
    document.getElementById("main-title").innerText = "Sistema de facturación";
    document.getElementById("table-title").innerText = "Productos procesados"
    btnImprimir.style.display = "block";
    document.getElementById("btn-volver").style.display = "none";
    maxProductos = "Sin limite";
    iva = 0.16;
    productos = [];
    subtotal = 0;
    montoIva = 0;
    total = 0;
    productosAgregados = 0;
    tabla.innerHTML = "";
    btnAgregar.disabled = false;
    document.form2.nombre.disabled = false;
    document.form2.cantidad.disabled = false;
    document.form2.precio.disabled = false;
    document.getElementById("max-rest").style.color = "#000000";
    document.getElementById("t-subtotal").innerText = "";
    document.getElementById("t-montoIva").innerText = "";
    document.getElementById("t-total").innerText = "";

    document.getElementById("factura").style.display = "none";
    document.getElementById("forms-container").style.display = "block";

    document.form1.maxProductos.focus();
}



//LLENAR PRODUCTO
function llenarProducto() {
    let valido = true;

    let producto = {
        nombre: "",
        cantidad: 0,
        precio: 0
    }

    producto.nombre = document.form2.nombre.value.toUpperCase();
    producto.cantidad = parseInt(document.form2.cantidad.value);
    producto.precio = parseFloat(document.form2.precio.value);

    //VEO SI EL PRODUCTO EXISTE EN EL ARREGLO
    let indexRegistrado = productos.map(function (e) {
        return e.nombre.trim();
    }).indexOf(producto.nombre.trim());

    //EVALUO SI EXISTE
    if (indexRegistrado != -1 || producto.nombre.trim() == "") {
        valido = false;
        pintarInput(document.form2.nombre, "red", "#ffb8b8", "error-nombre", "block");
        console.log("ml")

    } else
        pintarInput(document.form2.nombre, "lightgrey", "white", "error-nombre", "none");

    //EVALUO LA CANTIDAD
    if (isNaN(producto.cantidad) || producto.cantidad < 1) {
        valido = false;
        pintarInput(document.form2.cantidad, "red", "#ffb8b8", "error-cantidad", "block");
        console.log("ml")
    } else
        pintarInput(document.form2.cantidad, "lightgrey", "white", "error-cantidad", "none");

    //EVALUO EL PRECIO
    if (isNaN(producto.precio) || producto.precio <= 0) {
        valido = false;
        pintarInput(document.form2.precio, "red", "#ffb8b8", "error-precio", "block");
        console.log("ml")
    } else
        pintarInput(document.form2.precio, "lightgrey", "white", "error-precio", "none");


    if (valido)
        return producto; //SI TODO ESTA BIEN RETORNO EL OBJETO
    else
        return null; //SI HAY UN ERROR RETORNO NULL
}

//PINTAR INPUTS
function pintarInput(elemento, colorBorde, colorFondo, idTexto, valorDisplay) {
    elemento.style.borderColor = colorBorde;
    elemento.style.backgroundColor = colorFondo;
    document.getElementById(idTexto).style.display = valorDisplay;
}