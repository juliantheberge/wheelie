import * as React from 'react';


/** Organization */

/** Item
 * wheel menu items, will have an extensible api
 */

/** Wheel
 * this will be the master entry point for the lib
*/

export class Wheel extends React.Component {
    constructor(props) {
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
        }
        let slices = (this.props.items || []).map((item, index) => {
            return <Circle item = {item} index = {index}/>
        })

        return this.circle(slices)
    }

    circle(slices) {
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

        let oneCircleStyle = Object.assign(
            circleStyle, {
                top: "-50px"
            }
        )

        this.setState({
            circle: <div style={oneCircleStyle}><div className="circle-arrangment">{slices}</div></div>
        })
    }

    error(message) {
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

function Circle(props) {
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

    let withCentering = generateAbsoluteCenter(sliceStyle, width, height)


    return <div key={props.index + Math.random()} style = {sliceStyle}>{props.item.name}</div>
}



function generateAbsoluteCenter(styles, width, height) {
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

    constructor(length) {
        this.length = length;
    }

    static px(length) {
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