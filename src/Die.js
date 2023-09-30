import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white",
        transition : ".5s"
    }
    return (
        <div className="die-face" style={styles} onClick={props.hold}>
             <h2 className="die-num">{props.value}</h2>
        </div>
    )
}