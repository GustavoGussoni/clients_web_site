import { useAuth } from "@/contexts/appContext";
import {
  createContactData,
  createContactSchema,
} from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactData, setContactData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit } = useForm<createContactData>({
    resolver: zodResolver(createContactSchema),
  });

  const { registerContact } = useAuth();

  const onFormSubmit = (formData: createContactData) => {
    console.log(formData);
    registerContact(formData);
    handleCloseModal();
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow w-full"
        onClick={handleOpenModal}
      >
        Novo Contato
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-700 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-gray-500 rounded-lg p-6 z-20">
            <h1 className="font-bold mb-4">Cadastrar Contato</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4">
                <label htmlFor="full_name" className="font-bold">
                  Nome:
                </label>
                <input
                  type="text"
                  id="full_name"
                  {...register("full_name")}
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
                  {...register("email")}
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
                  {...register("phone")}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-black"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cadastrar
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={handleCloseModal}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactModal;
