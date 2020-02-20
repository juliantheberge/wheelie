import * as React from 'react';

/** Organization */

import * as M from './math/index'
/** Item
 * wheel menu items, will have an extensible api
 */

export interface Item {
    name: string;
    x: number;
    y: number;
    arc: number;
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
    rotate: number; // actual radians
    rotations: number; // counter
    error?: string ;
}

export class Wheel extends React.Component<WheelProps, WheelState> {
    arc: number;
    constructor(props: WheelProps) {
        super(props);
        this.state = {
            circle: null,
            rotate: 0,
            rotations: 0
        };
        this.arc = M.TOTAL / props.maxItems;
        this.clockwise = this.clockwise.bind(this);
        this.counterClockwise = this.counterClockwise.bind(this);
    }


    componentDidMount() {
        this.organize();
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
        console.log(this.state)
        let {maxItems, items, itemRadius} = this.props;
        let menuItems = M.getCoords(maxItems, items, 50)
        let slices = menuItems.map((item: Item, index: number) => {
            return <Spoke 
                key={index*Math.random()} 
                item = {item} 
                index = {index} 
                rotate = {this.state.rotate}
                rotations = {this.state.rotations}/>
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
            marginLeft: width.half().neg().px(),
            marginTop: height.half().neg().px(),
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        let rotate = {
            transform: `rotate(${this.state.rotate}rad)`
        }

        this.setState({
            circle: <div style={circleStyle}>
                <div style={rotate} className="wheel-arrangment">{slices}</div>
            </div>
        })
    }

    error(message: string) {
        this.setState({
            error: message
        })
    }

    clockwise() {
        this.setState({
            rotate: this.state.rotate + this.arc,
            rotations: this.state.rotations+1
        }, () => this.organize())
    }
    counterClockwise() {
        this.setState({
            rotate: this.state.rotate - this.arc,
            rotations: this.state.rotations-1
        }, () => this.organize())
    }

    render() {
        if (this.state.error) {
            return <p>{this.state.error}</p>
        } else {
            return <React.Fragment>
                {this.state.circle}
                <div>
                    <button onClick = {this.clockwise} >clockwise</button>
                    <button onClick = {this.counterClockwise} >counter clockwise</button>
                </div>
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
    rotations: number;
    rotate: number;
}

function Spoke(props: MenuItemProps) {
    let d = 20;
    let width = new Dimension(d);
    let height = new Dimension(d);
    let sliceStyle = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "tomato",
        color: "wheat",
        // borderRadius: "100%",
        width: width.px(),
        height: height.px()
    };

    let withPosition = { ...sliceStyle, ...genCoordinates(props.item.x, props.item.y)} as React.CSSProperties

    let withCounterRotation = {...withPosition, ...{
        transform: `rotate(${-1*props.rotate}rad)`
    }}

    return <div key={props.index + Math.random()} style = {withCounterRotation}>
        <div style = {{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
            <p>{props.index}</p>
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
            left: base.x.neg().px(),
            top: base.y.neg().px()
        }
    }

    return {
        left: base.x.px(),
        top: base.y.neg().px()
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

    neg() {
        return new Dimension(this.length * -1);
    }

    half() {
        return new Dimension(this.length / 2)
    }

    v() {
        return this.length;
    }

    px(){
        return this.length.toString() + "px";
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