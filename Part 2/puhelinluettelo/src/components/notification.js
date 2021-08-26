const Notification = (props) => {
    const {message} = props;
    return (
        <div className={props.status}>
            {message}
        </div>
    );
}

export default Notification;