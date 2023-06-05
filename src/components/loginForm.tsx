import { LoginData, loginSchema } from "@/schemas/client.schema";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/appContext";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onFormSubmit = (formData: LoginData) => {
    login(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-gray-500 shadow-lg rounded-lg overflow-hidden p-6"
    >
      <h1 className="font-bold text-2xl mb-4">Login</h1>
      <div className="mb-4">
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          {...register("email")}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="font-bold">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
          {...register("password")}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow w-full"
        >
          Entrar
        </button>
        <div className="mx-2"></div>
        <Link
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow w-full text-center"
          href="/register"
        >
          Cadastro
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
