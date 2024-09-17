// Importacion de paquetes
var readlineSync = require('readline-sync');
// Inicializacion de variables
var nombre = readlineSync.question("Ingrese su nombre : ");
var rif = readlineSync.question("Ingrese su Rif : ");
var productosFactura = [];
var subTotal = 0;
var iva = 0;
var totalAPagar = 0;
var cantItem = 0
// condicional para lectura de datos recibidos por parametro y validacion de numeros
if (process.argv[2]) {
    if (parseInt(process.argv[2])) {
        cantItem = process.argv[2]
    }else{
        cantItem = 10
    }
} else{
    cantItem = 10
}
// Ciclo de lectura de datos
for (let index = 1; index <= cantItem; index++) {
    let nombreProduct = readlineSync.question(`Ingrese el nombre del producto ${index}: `);
    let cantidad = readlineSync.questionInt(`Ingrese la cantidad del producto ${index}: `);
    let precio = readlineSync.questionFloat(`Ingrese el precio del producto ${index}: `);
// Almacenaje de datos en un arreglo
    productosFactura.push({
        nombre: nombreProduct,
        cantidad: cantidad,
        precio: precio
    })
}
// Ciclo de lectura del arreglo y sumatoria del Subtotal de cada producto
for (let  productos of productosFactura) {
    subTotal += productos.cantidad * productos.precio;
}
// Procesamiento de datos
iva = subTotal * 0.16;
totalAPagar = subTotal + iva;
// Impresion de datos totalizados para informar total de la factura
console.log("==========================================");
console.log("***************Factura Compra*************");
console.log("==========================================");
console.log('Nombre: ' + nombre);
console.log('Rif: ' + rif);
console.log("==========================================");
// Ciclo para mostrar cada producto cargado a la factura
for (let  product of productosFactura) {
    console.log(`Cantidad ${product.cantidad} - ${product.nombre} - Bs. ${product.precio}`);
}  
console.log("==========================================");
console.log("Sub total: " + subTotal + " Bs.");
console.log("Monto IVA 16%: " + iva + " Bs.");
console.log("Total a pagar: " + totalAPagar + " Bs.");
console.log("==========================================");
console.log("**********Gracias por su compra!**********");
console.log("==========================================");

