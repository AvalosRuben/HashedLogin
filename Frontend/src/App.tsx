import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [userInfo, setUserInfo] = useState(null);

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      alert("Usuario creado correctamente");

      setName("");
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      const formData = new FormData();

      formData.append("username", loginUsername);
      formData.append("password", loginPassword);

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",

        body: formData,

        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      alert(`Usuario autenticado\n\nToken:\n${data.access_token}`);

      setLoginUsername("");
      setLoginPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Obtener información usuario
  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:8000/me", {
        method: "GET",

        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      setUserInfo(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center font-['Poppins']">
      {/* Card */}
      <div className="w-3xl border border-gray-300 rounded-xl bg-white flex flex-col justify-center items-center py-10 gap-10 shadow-md">
        {/* Crear Usuario */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Crear Usuario
          </h2>

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-blue-400"
          />

          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-blue-400"
          />

          <button
            onClick={createUser}
            className="bg-blue-400 text-white p-2 rounded-2xl hover:bg-blue-500 transition font-medium"
          >
            Crear Usuario
          </button>
        </div>

        <div className="w-[90%] h-px bg-gray-200" />

        {/* Login */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Iniciar Sesión
          </h2>

          <input
            type="text"
            placeholder="Nombre de usuario"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 outline-none focus:border-blue-400"
          />

          <button
            onClick={login}
            className="bg-blue-400 text-white p-2 rounded-2xl hover:bg-blue-500 transition font-medium"
          >
            Entrar
          </button>
        </div>

        <div className="w-[90%] h-px bg-gray-200" />

        {/* Información de usuario */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Información del Usuario
          </h2>

          <button
            onClick={getUserInfo}
            className="bg-blue-400 text-white p-2 rounded-2xl hover:bg-blue-500 transition font-medium"
          >
            Mostrar Información
          </button>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col gap-2 text-gray-700">
            {userInfo ? (
              <>
                <p>
                  <span className="font-semibold">ID:</span> {userInfo.id}
                </p>

                <p>
                  <span className="font-semibold">Nombre:</span> {userInfo.name}
                </p>

                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {userInfo.username}
                </p>

                <p className="break-all">
                  <span className="font-semibold">Hash:</span>{" "}
                  {userInfo.hashed_password}
                </p>
              </>
            ) : (
              <p>No hay información del usuario</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="fixed bottom-5 right-5 text-gray-500 text-sm font-['Poppins']">
        Ruben & Chris
      </p>
    </div>
  );
}

export default App;
