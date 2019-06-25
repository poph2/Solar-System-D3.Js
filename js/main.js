// var now = d3.time.year.floor(new Date());

// https://www.schemecolor.com/venus-planet-colors.php

var colors = {
    "sun": "#FC9601",
    "mercury": "#97979F",
    "venus": "#BBB7AB",
}

var radii = {
    "sun": 2.84 * 30,
    "mercury": 0.39 * 30,
    "venus": 0.78 * 30
}

var orbitalRadii = {
    "mercury": 150,
    "venus": 190,
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Body {

    constructor(name, radius, orbitalRadius, orbitalAngle, color) {
        this.name = name;
        this.radius = radius;
        this.orbitalRadius = orbitalRadius;
        this.orbitalAngle = orbitalAngle;
        this.color = color;

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

    constructor(name, radius, color) {
        super(name, radius, 0, 0, color);
    }

}

class Planet extends Body {

    constructor(name, radius, orbitalRadius, orbitalAngle, color) {
        super(name, radius, orbitalRadius, orbitalAngle, color)
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

var width = 960,
    height = 500,
    radius = Math.min(width, height);

// Space
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

sun = new Star("Sun", radii.sun, colors.sun);
sun.init(svg)

mercury = new Planet("Mercury", radii.mercury, orbitalRadii.mercury, 90, colors.mercury);
mercury.init(svg)

venus = new Planet("Venus", radii.venus, orbitalRadii.venus, 0, colors.venus);
venus.init(svg)

 t = 0;

setInterval(function () {
    t += 0.1;

    mercury.update(t);

    venus.update(t/1.8);

}, 10);

