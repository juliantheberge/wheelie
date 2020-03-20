import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import * as gen from './gen-data';
/** Organization */

import * as M from './math/index'
/** Item
 * wheel menu items, will have an extensible api
 */

export interface Item {
    content: string;
    x: number;
    y: number;
    arc: number;
}

/** Wheel
 * this will be the master entry point for the lib
 * if I can find a way to not re-render the spoke this library will be a lot easier to write because then the data wont all need to be recalculated / re sent
*/

export interface WheelProps {
    items: Item[];
    organization: string;
    maxItems: number;
    itemRadius: number;
    fill?: boolean;
    // circleRadius: number;
    // unit: string
    // clockwise: boolean;
}

interface WheelState {
    circle: React.ReactElement | null;
    rotate: number; // actual radians
    rotations: number; // counter
    prevRotation: number;
    error?: string;
}

export class Wheel extends React.Component<WheelProps, WheelState> {
    arc: number;
    maxItems: number;
    constructor(props: WheelProps) {
        super(props);
        this.state = {
            circle: null,
            rotate: 0,
            rotations: 0,
            prevRotation: 0
        };
        this.maxItems = this.props.fill ? this.props.items.length : this.props.maxItems;
        this.arc = M.TOTAL / this.maxItems;
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
            this.error("other organization not supported yet")
        }
    }

    // maybe this isn't where this should happen

    stacking() {
        console.log(this.state)
        let { items, itemRadius } = this.props;
        let { maxItems } = this
        let menuItems = M.getCoords(maxItems, items, itemRadius);
        let spokes = menuItems.map((item: Item, index: number) => {
            return <Spoke
                key={index * Math.random()}
                item = {item}
                index = {index}
                prevRotation = {this.state.prevRotation}
                arc = {this.arc}
                rotate = {this.state.rotate}
                rotations = {this.state.rotations}/>
        })
        return this.circle(spokes);
    }

    circle(spokes: React.ReactElement[]) {
        let { itemRadius } = this.props;
        let d = itemRadius * 2;
        let width = new Dimension(d);
        let height = new Dimension(d);
        let circleStyle = {
            width: width.px(),
            height: height.px(),
            marginLeft: width.half().neg().px(),
            marginTop: height.half().neg().px()
        }

        let rotate = {
            transform: `rotate(${this.state.rotate}rad)`
        }

        this.setState({
            circle: <div className="wheel" style={circleStyle}>
                <div style={rotate} className="wheel-arrangment">{spokes}</div>
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
            rotations: this.state.rotations + 1,
            prevRotation: this.state.rotations
        }, () => this.organize())
    }
    counterClockwise() {
        this.setState({
            rotate: this.state.rotate - this.arc,
            rotations: this.state.rotations - 1,
            prevRotation: this.state.rotations
        }, () => this.organize())
    }

    render() {
        if (this.state.error) {
            return <p>{this.state.error}</p>
        } else {
            return <React.Fragment>
                {this.state.circle}
                <div>
                    <button onClick={this.clockwise}>clockwise</button>
                    <button onClick={this.counterClockwise} >counter clockwise</button>
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
    prevRotation: number;
    arc: number;
}

function Spoke(props: MenuItemProps) {
    let d = 20;
    let width = new Dimension(d);
    let height = new Dimension(d);

    const rotate = (start: number, end: number) => keyframes`
        from {
            transform: rotate(${start.toString()}rad);
        }

        to {
            transform: rotate(${end.toString()}rad)
        }
    `;

    let counterRotation = -1*props.rotate; // this is the counter rotation from the center of the wheel
    let prev = props.rotations > props.prevRotation ? counterRotation+props.arc : counterRotation-props.arc;
    let next = counterRotation;
    let rotation = props.rotations == props.prevRotation ? 'nada' : rotate(prev, next);

    const TheSpoke = styled.div`
        position: absolute;
        display: flex;
        justify-contnt: center;
        align-items: center;
        animation: ${rotation} 600ms linear;
        animation-fill-mode: forwards;
        width: ${width.px()};
        height: ${height.px()};
    `;

    return <TheSpoke key={props.index + Math.random()} style = {genCoordinates(props.item.x, props.item.y)} className="spoke">
        <div className="spoke-content">
            <div>{props.item.content}</div>
        </div>
    </TheSpoke>
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