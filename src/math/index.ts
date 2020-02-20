import * as W from '../wheel'
/**
 * goal is to do the math required to position the elements
 *
 * items will contain the coords
 * should we add radius so that we have very specific coords rather than ratios
 */

const TOTAL = Math.PI * 2;

export function getCoords(max: number, items: W.Item[], radius: number) {
    if (items.length > max || max > 360)
        throw Error("too many items");
    else if (items.length === 0)
        throw Error("too few items");
    else
        return slices(max, items, radius);
}

// maybe we add the triangle object to the item itself?
// triangle, a, b, c
// for now we are passing in radius, but if you pass in 1 it can just give us the ratios

// Math.cos(rads) * r == x
// Math.tan(rads) * x == y

function slices(max: number, items: W.Item[], radius: number) {
    let sliceArc = TOTAL / max;

    return items.map((item, index) => {
        let itemArc = sliceArc * (index);

        let y = Math.cos(itemArc) * radius; // leaving the 1 as a placeholder for the radius
        let x = Math.tan(itemArc) * y;

        item.y = y;
        item.x = x;

        // for now I don't think we need arc
        // item.arc = itemArc;

        return item;
    })
}



// not sure if I will need these
// function calcY(x: number, r: number) {
//     return rt(sq(r) - sq(x));
// }

// function calcX(y: number, r: number) {
//     return rt(sq(r) - sq(y));
// }

// const sq = (base: number) => Math.pow(base, 2);
// const rt = (number: number) => Math.sqrt(number);