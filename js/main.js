// var now = d3.time.year.floor(new Date());

// https://www.schemecolor.com/venus-planet-colors.php

var r = 10;
var Rmin = 0; //3.5 * r;
var Rmax = window.innerHeight * 1.5/3;
var R = Rmax / 10;

var star_data = {
    "sun":      ["Sun",     "#FC9601",  3.04 * r,   0],
}

var planet_data = {
    "mercury":  ["Mercury", "#97979F",  0.58 * r,   1.2 * R],
    "venus":    ["Venus",   "#BBB7AB",  0.98 * r,   2 * R],
    "earth":    ["Earth",   "#255FDB",  1.00 * r,   3 * R],
    "mars":     ["Mars",    "#C67B5C",  0.73 * r,   4 * R],
    "jupiter":  ["Jupiter", "#90614D",  2.04 * r,   5 * R],
    "saturn":   ["Saturn",  "#A49B72",  1.96 * r,   6 * R],
    "uranus":   ["Uranus",  "#BBE1E4",  1.60 * r,   7 * R],
    "neptune":  ["Neptune", "#3E54E8",  1.59 * r,   8 * R],
    "pluto":    ["Pluto",   "#ddc4af",  0.27 * r,   9 * R],
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Body {

    constructor(data, orbitalAngle) {
        this.name           = data[0];
        this.color          = data[1];
        this.radius         = data[2];
        this.orbitalRadius  = data[3];
        this.orbitalAngle   = orbitalAngle;

        this.center = this.getCenter();
    }

    init(svg) {
        svg.append("circle")
            .attr("class", this.name)
            .attr("r", this.radius)
            .attr("transform", "translate(" + this.center.x + ", " + this.center.y + ")")
            .style("fill", this.color);
    }

    getCenter() {
        // Position => [0 - 359]
        var x = this.orbitalRadius * Math.cos(this.degToRad(this.orbitalAngle));
        var y = this.orbitalRadius * Math.sin(this.degToRad(this.orbitalAngle));
        return new Point(x, y);
    }

    degToRad(deg) {
        var rad = deg * Math.PI/180;
        return rad;
    }

    update(orbitalAngle) {

        this.orbitalAngle = orbitalAngle;
        this.center = this.getCenter();

        d3.select("." + this.name)
            .attr("transform", "translate(" + this.center.x + "," + this.center.y + ")");
    }
}

class Star extends Body {

    constructor(data) {
        super(data, 0);
    }

}

class Planet extends Body {

    constructor(data, orbitalAngle) {
        super(data, orbitalAngle);
    }

    init(svg) {

        svg.append("circle")
            .attr("class", this.name + "Orbit")
            .attr("r", this.orbitalRadius)
            .style("fill", "none")
            .style("stroke", "rgba(25, 126, 0, 0.25)");

        super.init(svg);

    }

}

//class Position {
//    constructor(orbitalCenterPoint, orbitalRadius, orbitalAngle) {
//        this.orbitalCenterPoint = orbitalCenterPoint;
//        this.orbitalRadius = orbitalRadius;
//        this.orbitalAngle = orbitalAngle;
//    }
//
//    getPosition(position) {
//        // 0 <= Position <= 359 [0 - 359]
//        x = (this.orbitalRadius * Math.cos(degToRad(position))) + this.orbitalCenterPoint.x;
//        y = (this.orbitalRadius * Math.sin(degToRad(position))) + this.orbitalCenterPoint.y;
//        return new Point(x, y);
//    }
//
//    degToRad(deg) {
//        rad = deg * Math.PI/180;
//        return rad;
//    }
//
//}

//class Planet extends Body {
//
//    constructor(name, radius, orbitalRadius, orbitalAngle, color) {
//        super(name, radius, color, this.getCenter(orbitalRadius, orbitalAngle));
//        this.orbitalRadius = orbitalRadius;
//        this.orbitalAngle = orbitalAngle;
//    }
//
//
//
//}

var spacetime = d3.select('body');

var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height);

// Space
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

sun = new Star(star_data.sun);
sun.init(svg)

planets = [];

for(var key in planet_data) {
    var planet = new Planet(planet_data[key], 0);
    planet.init(svg);
    planets.push(planet);
}

//mercury = new Planet(data.mercury, 90);
//mercury.init(svg)

//venus = new Planet(data.venus, 0);
//venus.init(svg)
//
//earth = new Planet(data.earth, 0);
//earth.init(svg)
//
//mars = new Planet(data.mars, 0);
//mars.init(svg)
//
//jupiter = new Planet(data.jupiter, 0);
//jupiter.init(svg);
//
//pluto = new Planet(data.pluto, 0);
//pluto.init(svg)

t = 0;

setInterval(function () {
    t += 0.1;

    for(planet of planets) {
        planet.update(t/1.8);
    }

}, 10);

