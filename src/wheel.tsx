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
            return this.opposite()
        } else {
            this.error("stacking organization not supported yet")
        }
    }

    opposite() {
        let sliceStyle = {
            border: "1px solid pink"
        };

        console.log(M.getCoords(5, this.props.items, 50));

        let items = M.getCoords(5, this.props.items, 50)
        let slices = (items || []).map((item: Item, index: number) => {
            return <MenuItem item = {item} index = {index}/>
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
    let height = new Dimension(20)
    let sliceStyle = {
        position: "absolute",
        background: "green",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: width.px(),
        height: height.px(),
        borderRadius: "100%"
    }

    // what does this do again?
    // let withCentering = generateAbsoluteCenter(sliceStyle, width, height)

    let withPosition = Object.assign(
        sliceStyle, {
            top: `${-1 * props.item.y}px`,
            left: `${props.item.x}px`
        }
    )
    // let withPosition = Object.assign(
    //     sliceStyle, rotePosition(props.index)
    // )

    return <div key={props.index + Math.random()} style = {withPosition}>{props.item.name}</div>
}



function generateAbsoluteCenter(styles: React.CSSProperties, width: Dimension, height: Dimension) {
    let horizontalAlign = {
        left: "50%",
        marginLeft: Dimension.px(width.neg()/2),
    }

    let verticalAlign = {
        top: "50%",
        marginTop: Dimension.px(height.neg()/2)
    }

    return Object.assign(styles, horizontalAlign, verticalAlign)
}

// this should be phased out asap, was just to understand what the math needed

function rotePosition(index: number) {
    console.log('rote position', index)
    switch(index) {
        case 0:
            return { top: "-50px" }
        case 1:
            return { top: "50px" }
        case 2:
            return { top: "50px" }
        default:
            return { top: 'hopefully this throws' }
    }
}


class Dimension {
    length: number;

    constructor(length: number) {
        this.length = length;
    }

    static px(length: number) {
        return length.toString() + "px";
    }

    px() {
        return this.length.toString() + "px";
    }

    neg() {
        return this.length * -1;
    }

    v() {
        return this.length;
    }
}