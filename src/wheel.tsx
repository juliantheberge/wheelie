import * as React from 'react';


/** Organization */

type Organization = "stacking" | "opposite";

/** Item
 * wheel menu items, will have an extensible api
 */

interface Item {
    name: string; 
}

interface WheelProps {
    organization: Organization;
    items: Item[];
    // clockwise: boolean;
}

/** Wheel
 * this will be the master entry point for the lib
*/

export class Wheel extends React.Component<WheelProps> {
    constructor(props: WheelProps) {
        super(props)

    }

    public state : {
        circle: React.ReactElement | null;
        error?: string;
    }= {
        circle: null
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
        let sliceStyle: React.CSSProperties = {
            border: "1px solid pink"
        }
        let slices = (this.props.items || []).map((item, index) => {
            return <Circle item = {item} index = {index}/>
        })

        return this.circle(slices)
    }

    circle(slices: JSX.Element[]) {
        let circleStyle: React.CSSProperties = {
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

        let oneCircleStyle: React.CSSProperties = Object.assign(
            circleStyle, {
                top: "-50px"
            }
        )

        this.setState({
            circle: <div style={oneCircleStyle}><div className="circle-arrangment">{slices}</div></div>
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

interface CircleProps  {
    item: Item;
    index: number;
}

function Circle(props: CircleProps) {
    let width = new Dimension(20);
    let height = new Dimension(20)
    let sliceStyle: React.CSSProperties = {
        position: "absolute",
        background: "green",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: width.px(),
        height: height.px(),
        borderRadius: "100%"
    }

    let withCentering = generateAbsoluteCenter(sliceStyle, width, height)


    return <div key={props.index + Math.random()} style = {sliceStyle}>{props.item.name}</div>
}



function generateAbsoluteCenter(styles: React.CSSProperties, width: Dimension, height: Dimension) : React.CSSProperties{
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



class Dimension {
    length : number;

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