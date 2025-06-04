export default function VerificadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ¡Cuenta verificada!
        </h1>
        <p className="text-gray-700 mb-6">
          Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión y
          reservar tus citas sin límite.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Ir al login
        </a>
      </div>
    </div>
  );
}
