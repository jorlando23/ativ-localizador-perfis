import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";


type GITHUBResponse = {
  html_url: string;
  name: string;
  avatar_url: string;
  bio: string;
};


function App() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("...");
  const [bio, setBio] = useState("...");
  const [avatarURL, setAvatarURL] = useState("./src/assets/avatar.png");

  useEffect(() => {
    setUserName("")
    setName("")
    setBio("")
  }, [])


  const handleSearch = () => {
    axios
      .get<GITHUBResponse>(`https://api.github.com/users/${userName}`)
      .then((res) => {
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-app">
      <div className="container">
        <header className="header-top">
        </header>
        <main>
          <div className="form">
            <h1>Buscador de Perfis do GITHUB</h1>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}/>
            <button onClick={handleSearch}>Buscar Perfil</button>
          </div>
          <div className="content">
            <div>
              <img src={avatarURL} alt="avatar" />
              <h1>{name}</h1>
              <p>{bio}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
