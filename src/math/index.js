/**
 * goal is to do the math required to position the elements
 *
 * items will contain the coords
 * should we add radius so that we have very specific coords rather than ratios
 */

const TOTAL = Math.PI * 2;
const sq = (base) => Math.square(base);
const rt = (number) => Math.sqrt(number);

export function getCoords(max, items, radius) {
    if (items.length > max || max > 360)
        throw Error("too many items");
    else if (items.length === 0)
        throw Error("too few items");
    else
        return slices(max, items, radius);
}

// maybe we add the triangle object to the item itself?
// triangle, a, b, c
// maybe its just in ratios where c = 1 and we just multiply the whole thing by r when we get it
// do we even need radius at this point?

// Math.cos(rads) * r == x
// Math.tan(rads) * x == y

function slices(max, items, radius) {
    let sliceArc = TOTAL / max;

    return items.map((item, index) => {
        let itemArc = sliceArc * (index);

        let y = Math.cos(itemArc) * radius; // leaving the 1 as a placeholder for the radius
        let x = Math.tan(itemArc) * y;

        item.y = y;
        item.x = x;
        item.arc = itemArc;

        return item;
    })
}



// not sure if I will need these
function calcY(x, r) {
    return rt(sq(r) - sq(x));
}

function calcX(y, r) {
    return rt(sq(r) - sq(y));
}

