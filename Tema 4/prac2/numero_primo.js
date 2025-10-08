console.log(numero_primo(5));

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

    console.log(contador_divisores);

    return es_primo;
}