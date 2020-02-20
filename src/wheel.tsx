import * as React from 'react';
import * as M from './math/index'


/** Organization */

/** Item
 * wheel menu items, will have an extensible api
 */

export interface Item {
    name: string;
    x: number;
    y: number;
}

/** Wheel
 * this will be the master entry point for the lib
*/

export interface WheelProps {
    items: Item[];
    organization: string;
    // unit: string
    // clockwise: boolean;
}

interface WheelState {
    circle: React.ReactElement | null;
    error?: string ;
}

export class Wheel extends React.Component<WheelProps, WheelState> {
    constructor(props: WheelProps) {
        super(props)
        this.state = {
            circle: null
        }
    }


    componentDidMount() {
        this.organize()
    }

    organize() {
        if (this.props.organization === "opposite") {
            return this.stacking()
        } else {
            this.error("stacking organization not supported yet")
        }
    }

    // maybe this isn't where this should happen

    stacking() {
        let items = M.getCoords(5, this.props.items, 80)
        let slices = (items || []).map((item: Item, index: number) => {
            return <MenuItem key={index*Math.random()} item = {item} index = {index}/>
        })


        return this.circle(slices)
    }

    circle(slices: React.ReactElement[]) {
        let circleStyle = {
            background: "white",
            border: "1px solid black",
            borderRadius: "100%",
            width: "100px",
            height: "100px",
            marginLeft: "-50px",
            marginTop: "-50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        this.setState({
            circle: <div style={circleStyle}><div className="circle-arrangment">{slices}</div></div>
        })
    }

    error(message: string) {
        this.setState({
            error: message
        })
    }

    render() {
        if (this.state.error) {
            return <p>{this.state.error}</p>
        } else {
            return <React.Fragment>
                {this.state.circle}
            </React.Fragment>
        }
    }
}

/** cirlce
 * we will have props soon
 */

interface MenuItemProps {
    item: Item;
    index: number;
}

function MenuItem(props: MenuItemProps) {
    let width = new Dimension(20);
    let height = new Dimension(20);
    let sliceStyle = {
        position: "absolute",
        background: "",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: width.px(),
        height: height.px(),
        borderRadius: "100%"
    };

    let withPosition = { ...sliceStyle, ...genCoordinates(props.item.x, props.item.y)} as React.CSSProperties

    return <div key={props.index + Math.random()} style = {withPosition}>{props.item.name}</div>
}


// opts will have to move all the way up to the props
interface CoordOpts {
    clockwise?: boolean;
    unit?: string;
}

interface MathCoords {
    x: Dimension;
    y: Dimension;
    [k: string] : Dimension; // why does typescript always demand this?
}

interface StyleCoords {
    left: string;
    top: string;
}

// maybe we get another class to consume Dimension called Cörd?

function genCoordinates(x: number, y: number, opts?: CoordOpts) : StyleCoords {
    let base: MathCoords = {
        x: new Dimension(x),
        y: new Dimension(y)
    }

    if (opts && !opts.clockwise) {
        return {
            left: Dimension.px(base.x.neg()),
            top: Dimension.px(base.y.neg())
        }
    }

    return {
        left: Dimension.px(base.x.v()),
        top: Dimension.px(base.y.neg())
    }
}


// also not sure if this will be needed
class Dimension {
    length: number;

    constructor(length: number) {
        this.length = length;
    }

    static px(length: number) {
        return length.toString() + "px";
    }

    px(){
        return this.length.toString() + "px";
    }

    neg() {
        return this.length * -1;
    }

    v() {
        return this.length;
    }
}

// not sure if this will be needed

// function generateAbsoluteCenter(styles: React.CSSProperties, width: Dimension, height: Dimension) {
//     let horizontalAlign = {
//         left: "50%",
//         marginLeft: Dimension.px(width.neg()/2),
//     }

//     let verticalAlign = {
//         top: "50%",
//         marginTop: Dimension.px(height.neg()/2)
//     }

//     return Object.assign(styles, horizontalAlign, verticalAlign)
// }