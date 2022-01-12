import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main() {
  const [people, setPeople] = useState([]);

  // const URL = "http://localhost/3000/people/";

  const URL = "https://end-of-unit-built.herokuapp.com/people/";

  // index helper function
  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);
    setPeople(data);
  };

  // create helper function
  const createPeople = async (person) => {
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  // edit/update helper function
  const updatePeople = async (person, id) => {
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  // delete helper functioon
  const deletePeople = async (id) => {
    await fetch(URL + id, {
      method: "DELETE",
    });
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(props) => (
            <Show
              {...props}
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;
