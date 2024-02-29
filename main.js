// Contenido de segundaER.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function ER() {
    var cadena = document.getElementById('cadenaInput2').value.toUpperCase();

    if (cadena.length >= 4 && /^(P|p)[OGLopojl]{3}$/.test(cadena)) {
        document.getElementById('result').innerText = cadena + ' - Cadena Valida.';
        CrearAutomataER(cadena);
    } else {
        document.getElementById('result').innerText = cadena + ' - Cadena no valida. Intente con otra cadena';
        d3.select(".box-er svg").remove();
    }
}

export function  CrearAutomataER(cadena) {
    d3.select(".box-er svg").remove(); // Elimina el SVG existente

    // Datos del automata
    var estados = [];
    var transiciones = [];

    for (var i = 0; i <= cadena.length; i++) {
        estados.push("q" + i);
        if (i < cadena.length) {
            transiciones.push({
                source: "q" + i,
                target: "q" + (i + 1),
                label: cadena[i]
            });
        }
    }

    // Crear el contenedor SVG
    var svg = d3.select(".box-er").append("svg")
        .attr("width", 400) // Aumentar el ancho para mejorar la visualización
        .attr("height", 150); // Aumentar la altura para mejorar la visualización

    // Crear nodos (estados)
    var nodes = svg.selectAll("circle")
        .data(estados)
        .enter().append("circle")
        .attr("cx", function(d, i) { return i * 80 + 40; }) // Ajustar el espaciado
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "blue");

    // Crear etiquetas para los nodos
    svg.selectAll("text")
        .data(estados)
        .enter().append("text")
        .attr("x", function(d, i) { return i * 80 + 40; })
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function(d) { return d; });

    // Crear enlaces (transiciones)
    var links = svg.selectAll(".link")
        .data(transiciones)
        .enter().append("line")
        .attr("x1", function(d) { return (estados.indexOf(d.source) * 80 + 40) + 20; }) // Coordenada x del centro del nodo origen
        .attr("y1", 80)
        .attr("x2", function(d) { return (estados.indexOf(d.target) * 80 + 40) - 20; }) // Coordenada x del centro del nodo destino
        .attr("y2", 80)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

    // Etiquetas para las transiciones
    svg.selectAll("text.linkLabel")
        .data(transiciones)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", function(d) { return (estados.indexOf(d.source) * 80 + estados.indexOf(d.target) * 80) / 2 + 40; })
        .attr("y", 75) // Ajustar la posición vertical
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function(d) { return d.label; });

    // Agregar un estado inicial (triángulo)
    svg.append("polygon")
        .attr("points", function() {
            var x = 6; // Ajustar la posición x del triángulo
            var y = 90; // Ajustar la posición y del triángulo
            var size = 15; // Ajustar el tamaño del triángulo
            return (x) + "," + (y) + " " + (x - size / 2) + "," + (y - size) + " " + (x + size / 2) + "," + (y - size);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "yellow")
        .attr("transform", "rotate(28, 15, 90)"); // Rotar 30 grados alrededor del punto (15, 90);

    // Agregar un estado final (doble círculo)
    svg.append("circle")
        .attr("cx", (estados.length - 1) * 80 + 40)
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "blue");

    svg.append("circle")
        .attr("cx", (estados.length - 1) * 80 + 40)
        .attr("cy", 80)
        .attr("r", 16)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "blue");

    // Etiqueta para el estado final
    svg.append("text")
        .attr("x", (estados.length - 1) * 80 + 40)
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(estados[estados.length - 1]);

    // Definir la flecha
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

}
