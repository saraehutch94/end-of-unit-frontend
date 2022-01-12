import { useState } from "react";

function Show(props) {
  const id = props.match.params.id;

  const person = props.people.find((person) => person._id === id);

  const [editForm, setEditForm] = useState(person);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updatePeople(editForm, id);
    props.history.push("/");
  };

  const handleClick = () => {
    props.deletePeople(id);
    props.history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h1>{person.title}</h1>
      {person.image && <img src={person.image} alt={person.name} />}
      <button id="delete" onClick={handleClick}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="name"
            value={editForm.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            placeholder="image"
            value={editForm.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="title"
            value={editForm.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Upate Person" />
      </form>
    </div>
  );
}

export default Show;
