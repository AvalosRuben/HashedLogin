function App() {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      {/* Card */}
      <div className="w-3xl border border-gray-300 rounded-xl bg-white flex flex-col justify-center items-center py-10 gap-10">
        {/* Crear Usuario */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-xl">Crear Usuario</h2>

          <input
            type="text"
            placeholder="Nombre"
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3"
          />

          <input
            type="text"
            placeholder="Nombre de usuario"
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3"
          />

          <button className="bg-blue-400 p-2 rounded-2xl hover:bg-blue-500 transition">
            Crear Usuario
          </button>
        </div>

        <div className="w-[90%] h-px bg-gray-200" />

        {/* Login */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-xl">Iniciar Sesión</h2>

          <input
            type="text"
            placeholder="Nombre de usuario"
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3"
          />

          <button className="bg-blue-400 p-2 rounded-2xl hover:bg-blue-500 transition">
            Entrar
          </button>
        </div>

        <div className="w-[90%] h-px bg-gray-200" />

        {/* Información de usuario */}
        <div className="w-full px-10 flex flex-col gap-6">
          <h2 className="text-xl">Información del Usuario</h2>

          <button className="bg-blue-400 p-2 rounded-2xl hover:bg-blue-500 transition">
            Mostrar Información
          </button>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
            INFORMACIÓN DEL USUARIO
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
