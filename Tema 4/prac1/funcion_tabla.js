function crearTabla(numfilas = 10,numcolumnas = 4,color = "black",iddiv) {
    let html = '';

    html += `<table style = "border-collapse:collapse; border:3px solid ${color}; width: 100%;>`;
    
    for (let i = 0; i < numfilas; i++) {

        html += `<tr>`; 

        for (let j = 0; j < numcolumnas; j++) {
            html += `<td style = "border:1px solid ${color}">${i} ${j}</td>`;
        }

        html += `</tr>`; 
    }   

    html += `</table>`;

    document.getElementById(iddiv).innerHTML += html;
}