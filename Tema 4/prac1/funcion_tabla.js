function crearTabla(numfilas = 10,numcolumnas = 4,color = "black",iddiv) {
    html = `<style>
                table, td, tr {

                }
            </style>`

    html += `<table>`;
    
    for (let i = 0; i < numfilas; i++) {

        html += `<tr>`; 

        for (let j = 0; j < numcolumnas; j++) {
            html += `<td>Hello world!</td>`;
        }

        html += `</tr>`; 
    }   

    html += `</table>`

    document.getElementById(iddiv).innerHTML(html);
}