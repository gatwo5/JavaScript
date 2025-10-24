class Vehiculo {

    // --- CONSTRUCTORES ---

    constructor (marca, modelo, anno = 2020, potencia = 100, tipo_combustible = 'gasolina', velocidad_max = 180, encendido = false) {
        this.marca = marca;
        this.modelo = modelo;
        this.anno = anno;
        this.potencia = potencia;
        this.tipo_combustible = tipo_combustible;
        this.velocidad_max = velocidad_max;
        this.encendido = encendido;
    }  

    // --- MÉTODOS ---

    encender() {
        this.encendido = true;
        console.log('Vehículo encendido');
    }

    apagar() {
        this.encendido = false;
        console.log('Vehículo apagado');
    }

    acelerar(velocidad) {
        if (this.encendido) {
            console.log(`Se ha alcanzado una velocidad de ${velocidad}`);
        }

        else {
            console.log(`Enciende el vehículo antes de acelerar`);
        }
    }

    toString() {
        return `Marca: ${this.marca}\nModelo: ${this.modelo}\nAño: ${this.anno}\nPotencia: ${this.potencia} CV\nTipo de combustible: ${this.tipo_combustible}\nVelocidad máxima: ${this.velocidad_max}Km/h\nEncendido: ${this.encendido}`;
    }
} 

class Electrico extends Vehiculo{

    // --- CONSTRUCTORES ---

    constructor (marca, modelo, anno, potencia = 150, tipo_combustible = 'eléctrico', velocidad, encendido, autonomia = 300, bateria = 100) {
        super(marca, modelo, anno, potencia, tipo_combustible, velocidad, encendido);
        this.autonomia = autonomia;
        this.bateria = bateria;
    }

    // --- MÉTODOS ---

    cargar() {
        this.bateria = 100;
        console.log('Batería cargada al máximo');
    }

    consumir(kw) {
        this.bateria -= kw;

        if (this.bateria <= 0) {
            this.encendido = false;
        }
    }

    toString() {
        return `Marca: ${this.marca}\nModelo: ${this.modelo}\nAño: ${this.anno}\nPotencia: ${this.potencia} CV\nTipo de combustible: ${this.tipo_combustible}\nVelocidad máxima: ${this.velocidad_max}Km/h\nEncendido: ${this.encendido}\nAutonomía: ${this.autonomia}Km\nBatería: ${this.bateria}%`;
    }
}

// ---- PRUEBAS ----

// Crear objetos de prueba
var v1 = new Vehiculo("Toyota", "Corolla", 2018, 132, "gasolina", 190);
var v2 = new Vehiculo("Ford", "Focus");

var e1 = new Electrico("Tesla", "Model 3", 2022, 283, "eléctrico", 250, false, 500, 85);
var e2 = new Electrico("Nissan", "Leaf");

// Mostrar información inicial
console.log("=== ESTADO INICIAL ===");
console.log(v1.toString());
console.log("--------------------");
console.log(v2.toString());
console.log("--------------------");
console.log(e1.toString());
console.log("--------------------");
console.log(e2.toString());
console.log("--------------------");

// Probar métodos de Vehiculo
console.log("\n=== PRUEBAS DE VEHICULO ===");

v1.encender();
v1.acelerar(100);
v1.apagar();
v1.acelerar(60);

console.log("--------------------");

v2.acelerar(80);
v2.encender();
v2.acelerar(120);
v2.apagar();

// Probar métodos de Electrico
console.log("\n=== PRUEBAS DE ELECTRICO ===");

e1.encender();
e1.acelerar(150);
e1.consumir(20);
console.log(`Batería actual de e1: ${e1.bateria}%`);
e1.cargar();
console.log(`Batería tras cargar e1: ${e1.bateria}%`);
e1.apagar();

console.log("--------------------");

e2.encender();
e2.acelerar(100);
e2.consumir(90);
console.log(`Batería actual de e2: ${e2.bateria}%`);
e2.cargar();
console.log(`Batería tras cargar e2: ${e2.bateria}%`);
e2.apagar();

// Mostrar estado final
console.log("\n=== ESTADO FINAL ===");
console.log(v1.toString());
console.log("--------------------");
console.log(v2.toString());
console.log("--------------------");
console.log(e1.toString());
console.log("--------------------");
console.log(e2.toString());