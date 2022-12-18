// TODO PROGRAMA O SISTEMA, CONSTA DE 3 PARTES
// ENTRADA > PROCESO > SALIDA


// ENTRADA DE DATOS
const productos = [
    {id:1, nombre:"Servicio de DJ", precio:80000},
    {id:2, nombre:"Servicio de fotografía", precio:60000},
    {id:3, nombre:"Servicio de video", precio:80000},
    {id:4, nombre:"Catering", precio:120000},
    {id:5, nombre:"Decoración", precio:50000},
    {id:6, nombre:"Animación", precio:30000},
]; //Defino mi Array de Productos del Catálogo. Cada producto es un objeto


const productos_carrito = []; //Defino mi Array de Productos del Carrito

// Defino la Clase Producto
class Producto {
    constructor (id, nombre, precio) {//Armo una función constructora para agregar más servicios 
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.iva = 1.21;
    }

    aplicarIVA() {//función para aplicar IVA
        this.precio = this.precio*this.iva;
    }
}

// Declaro la función Buscar Producto
function buscarProducto(id) {
    return (productos.find(item => item.id === id) || null); // Devuelve un Objeto
}

// Declaro la función Agregar Producto al Carrito
function agregarProducto(producto) {
    productos_carrito.push(producto);
}

// Declaro la función Eliminar Producto del Carrito
function eliminarProducto(id) {
    let pos = productos_carrito.findIndex(item => item.id === id);

    if (pos > -1) {
        productos_carrito.splice(pos, 1);
    }else{
        alert("No se seleccionó un ID válido")
    }
}

// Recorro los Productos del Catálogo
function recorrerProductos() {
    let contenido_productos = "";

    for (let producto of productos) {
        contenido_productos += producto.id + "- " + producto.nombre + " $" + producto.precio + "\n";
    }

    return contenido_productos;
}

// Recorro los Productos del Carrito
function recorrerProductosCarrito() {
    let contenido_productos = "";
    for (let producto of productos_carrito) {
        contenido_productos += producto.id + "- " + producto.nombre + " $" + producto.precio + "\n";
    }

    return contenido_productos;
}
let prod_disp = recorrerProductos();
console.log(prod_disp)

// Realizo la carga de Productos de Catálogo
let masserv=confirm("Quiere ingresar algún servicio adicional?\n\n Los servicios disponibles son:\n\n"+prod_disp);
console.log(masserv);

//Cargo servicios adicionales al carrito
while (masserv) {
    //Defino los valores de mi Producto
    let id_producto = productos.length + 1;
    let nombre_producto = prompt("Ingrese el Nombre del Producto:")
    let precio_producto = parseFloat(prompt("Ingrese el Precio del Producto:"));
    // Creo mi Producto
    let producto = new Producto(id_producto, nombre_producto, precio_producto);
    // Agrego mi Producto al Array de Productos
    productos.push(producto);
    // Pregunto si deseo continuar cargando Productos
    masserv = confirm("Desea agregar otro Producto?");

}

// Realizo la carga de Productos en el Carrito
cargarProducto = true;

while (cargarProducto) {
    let contenido_productos = recorrerProductos();

    // Indico el ID del Producto
    let id_producto = parseInt(prompt("Seleccione el Producto a agregar al Carrito:\n\n" + contenido_productos))
    // Buscar el Producto
    let producto = buscarProducto(id_producto);
    // Verifico si el Producto seleccionado es válido
    if (producto != null) {
        // Agregar el Producto seleccionado al Carrito
        agregarProducto(producto);
    } else {
        alert("No existe el Producto con el ID: " + id_producto + "!");
        console.log(producto);
    }
    
    // Pregunto si deseo continuar cargando Productos al Carrito
    cargarProducto = confirm("Desea agregar otro Producto al Carrito?");
}

// Realizo la eliminación de Productos que no deseo que estén en el Carrito
cargarProducto = true;

while (cargarProducto) {
    let contenido_productos = recorrerProductosCarrito();

    // Indico el ID del Producto
    let id_producto = parseInt(prompt("Seleccione el Producto que desee eliminar del Carrito: (0 - Salir)\n\n" + contenido_productos));
    console.log(id_producto)

    // Valido si existe el ID del Producto
    if (id_producto > 0) {
        //Eliminar el Producto del Carrito
        eliminarProducto(id_producto);
    } else if(id_producto<0){
        alert("No existe el Producto con el ID: " + id_producto + "!");
    }else{
        break
    }
    
    // Pregunto si deseo continuar cargando Productos al Carrito
    cargarProducto = confirm("Desea eliminar otro Producto del Carrito?");
}

// Imprimo el total de Productos de mi Carrito
let descuento=prompt("Si tiene cupón de descuento, agréguelo (123456) y consiga un descuento del 20%")
let suma_total = 0;
let contenido_productos = "";
if(descuento==="123456"){
    for (let prod of productos_carrito) {
        // Creo una nueva instancia de la Clase Producto
        let producto = new Producto(prod.id, prod.nombre, prod.precio);
        producto.aplicarIVA(); // Aplico el método Calcular IVA
        contenido_productos += producto.id + "- " + producto.nombre + " $" + producto.precio*0.8 + "\n";
        suma_total += producto.precio*0.8; // Sumo al Contador "Suma Total" el valor precio del producto
        
    }
    alert("CUPON DE DESCUENTO VALIDO!!\nProductos Seleccionados:\n\n" + contenido_productos + "\n\nTotal a Pagar: $" + suma_total);
    }else{
        for (let prod of productos_carrito) {
        // Creo una nueva instancia de la Clase Producto
        let producto = new Producto(prod.id, prod.nombre, prod.precio);
        producto.aplicarIVA(); // Aplico el método Calcular IVA
        contenido_productos += producto.id + "- " + producto.nombre + " $" + producto.precio + "\n";
        suma_total += producto.precio; // Sumo al Contador "Suma Total" el valor precio del producto
       
    }
    alert("Productos Seleccionados:\n\n" + contenido_productos + "\n\nTotal a Pagar: $" + suma_total);
}

