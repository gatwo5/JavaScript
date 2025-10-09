let html = '';

for (let i = 1; i <= 1000; i++) {
    if (numero_primo(i)) {
        html += `${i} - `;
    }    
}

document.getElementById("numprimo").innerHTML += html;

function numero_primo(numero) {
    let es_primo = true;
    let contador_divisores = 0;
    let i = numero;

    while (contador_divisores < 3 && i >= 1) {
        if (numero % i == 0) {
            contador_divisores++;
        }

        i--;
    }

    if (contador_divisores > 2 || numero == 1) {
        es_primo = false;
    }

    return es_primo;
}