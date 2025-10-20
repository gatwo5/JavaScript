class Ordenador {

    // --- CONSTRUCTORES ---

    constructor(marca, modelo, ram=4, disco=512, pulgadas =17) {
        this.marca = marca;
        this.modelo = modelo;
        this.ram = ram;
        this.disco = disco;
        this.pulgadas = pulgadas;
    }

    // --- MÉTODOS ---

    toString() {
        return (`Marca: ${this.marca}\nModelo: ${this.modelo}\nRAM: ${this.ram}\nDisco Duro: ${this.disco}\nPulgadas: ${this.pulgadas}`);
    }
}

class Portatil extends Ordenador {

    // --- CONSTRUCTORES ---

    constructor(marca, modelo, ram, disco = 256, pulgadas = 12, autonomia = 4) {
        super(marca, modelo, ram, disco, pulgadas);
        this.autonomia = autonomia;
    }

    // --- MÉTODOS ---

    toString() {
        return (`Marca: ${this.marca}\nModelo: ${this.modelo}\nRAM: ${this.ram}\nDisco Duro: ${this.disco}\nPulgadas: ${this.pulgadas}\nAutonomía: ${this.autonomia}`);
    }
}

var o1 = new Ordenador("HP", "EliteDisplay",8, 256, 23);
var o2 = new Ordenador("Dell", "Inspiron AIO");
var p1 = new Portatil("Apple", "Macbook Air", 8, 128, 13, 12);
var p2 = new Portatil("Acer", "Aspire");

console.log(o1.toString());
console.log(o2.toString());
console.log(p1.toString());
console.log(p2.toString());