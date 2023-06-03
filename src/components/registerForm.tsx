import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { full_name, email, phone, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    console.log(formData);
    // Limpar os campos do formulário
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500 shadow-lg rounded-lg overflow-hidden p-6"
      >
        <h1 className="font-bold text-2xl mb-4">Criar cadastro</h1>
        <div className="mb-4">
          <label htmlFor="full_name" className="font-bold">
            Nome:
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={full_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="font-bold">
            Telefone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="font-bold">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow w-full"
          >
            Registrar
          </button>
          <div className="mx-2"></div>
          <Link
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow w-full text-center"
            href="/login"
          >
            Ir para login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
