import DeleteButton from "../DeleteButton/DeleteButton"
import EditButton from "../EditButton/EditButton"
import './note.css'

const Note = ({title, content, date, id, notes, setNotes}) => {

    const dateOBJ = new Date(date)

    const getTime = () => {
        let hours = dateOBJ.getHours()
        let timeofday = ""
        if (hours >= 12) {
            timeofday = "PM"
            hours -= 12
        }
        else {
            timeofday = "AM"
        }
        return `${hours.toString()}:${dateOBJ.getMinutes().toString()}:${dateOBJ.getSeconds().toString()} ${timeofday}`
    }

    const getDate = () => {
        return `${(dateOBJ.getMonth() + 1).toString()}/${dateOBJ.getDate().toString()}/${dateOBJ.getFullYear().toString()}`
    }

    return (
        <div className="note">
            <div className="header">
                <h2 className="notetitle">{title}</h2>
                <div className="buttons">
                    <DeleteButton notes = {notes} setNotes = {setNotes} id = {id}/>
                    <EditButton notes = {notes} setNotes = {setNotes} oldTitle = {title} oldContent = {content} id = {id}/>
                </div>
            </div>
            <p className="content">{content}</p>
            <div className="dateinfo">
                <p className="time">{getTime()}</p>
                <p className="date">{getDate()}</p>
            </div>
        </div>
    )
}

export default Note