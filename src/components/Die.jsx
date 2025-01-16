

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld? "#59E391" : "#FFFFFF"
    }

    return (
        <button className="die"
                onClick={() => props.hold(props.id)}
                style={styles}
                aria-pressed={props.isHeld}
                aria-live={`Die with the value of ${props.value},
                            ${props.isHeld? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}