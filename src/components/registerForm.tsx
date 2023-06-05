import { useAuth } from "@/contexts/appContext";
import {
  ClientData,
  ClientRegisterData,
  clientSchema,
  registerSchema,
} from "@/schemas/client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<ClientRegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerUser } = useAuth();

  const onFormSubmit = (formData: ClientRegisterData) => {
    console.log(formData);
    registerUser(formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
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
            // value={full_name}
            // onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
            {...register("full_name")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            // value={email}
            // onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="font-bold">
            Telefone:
          </label>
          <input
            type="tel"
            id="phone"
            // value={phone}
            // onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
            {...register("phone")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="font-bold">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            // value={password}
            // onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
            {...register("password")}
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
