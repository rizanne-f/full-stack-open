export default function Notification ({ notif }) {
    if (notif.message === null) {
        return null
    }
    
    return (
        <div className={notif.isError ? "error" : "success"}>
            {notif.message}
        </div>
    )
}