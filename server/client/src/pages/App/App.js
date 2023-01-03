import "./app.css";
import Note from "../../components/Note/Note";
import CreateButton from "../../components/CreateButton/CreateButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {CgProfile} from "react-icons/cg"

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/notes").then((res) => {
      setNotes(res.data);
    });
  }, [notes]);

  const notesToShow =
    filterTitle.length === 0
      ? notes
      : notes.filter((note) => note.title.startsWith(filterTitle));

  return (
    <div className="notecenter">
      {location.state && 
      <div className="username">
        <div className="image"><CgProfile></CgProfile></div>
        <p className="name">{location.state.username}</p>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>}
      <h1 className="title">NoteCenter</h1>
      <input
        className="filtersearch"
        placeholder="Search for a note by title"
        type="text"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
      ></input>
      <CreateButton notes={notes} setNotes={setNotes} />
      {notes.length === 0 ? (
        <h2 className="empty">
          You currently have no notes to display. Create a note to get started!
        </h2>
      ) : (
        <div className="notesgrid">
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              title={note.title}
              content={note.content}
              date={note.date}
              id={note.id}
              notes={notes}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
