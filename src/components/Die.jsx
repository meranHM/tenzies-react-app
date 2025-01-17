

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <button className="die"
                onClick={() => props.hold(props.id)}
                style={styles}
        >
            {props.value}
        </button>
    )
}