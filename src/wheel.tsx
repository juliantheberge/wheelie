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
    maxItems: number;
    itemRadius: number;
    // circleRadius: number;
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
        if (this.props.organization === "stacking") {
            return this.stacking()
        } else {
            this.error("opposite organization not supported yet")
        }
    }

    // maybe this isn't where this should happen

    stacking() {
        let {maxItems, items, itemRadius} = this.props;
        let menuItems = M.getCoords(maxItems, items, itemRadius)
        let slices = menuItems.map((item: Item, index: number) => {
            return <MenuItem key={index*Math.random()} item = {item} index = {index}/>
        })
        return this.circle(slices)
    }

    circle(slices: React.ReactElement[]) {
        let d = 100;
        let width = new Dimension(d);
        let height = new Dimension(d);

        let circleStyle = {
            background: "tomato",
            borderRadius: "100%",
            width: width.px(),
            height: height.px(),
            marginLeft: Dimension.px(width.half().neg()),
            marginTop: Dimension.px(height.half().neg()),
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
    let d = 20;
    let width = new Dimension(d);
    let height = new Dimension(d);
    let sliceStyle = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "tomato",
        borderRadius: "100%",
        width: width.px(),
        height: height.px(),
    };

    let withPosition = { ...sliceStyle, ...genCoordinates(props.item.x, props.item.y)} as React.CSSProperties

    console.log({
        sliceStyle,
        withPosition
    })

    return <div key={props.index + Math.random()} style = {withPosition}>
        <div style = {{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
            {/* <p>{props.item.name}</p> */}
        </div>
    </div>
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

    half() {
        return new Dimension(this.length / 2)
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