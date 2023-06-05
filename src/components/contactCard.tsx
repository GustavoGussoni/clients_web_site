import { useAuth } from "@/contexts/appContext";
import { contactData } from "@/schemas/contact.schema";
import { useState } from "react";
import EditContactModal from "./editContactModal";

interface IContactCardProps {
  contact: contactData;
}

const ContactCard = ({ contact }: IContactCardProps) => {
  const { removeContact } = useAuth();

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <p className="font-bold">Nome: {contact.full_name}</p>
        <p>Email: {contact.email}</p>
        <p>Telefone: {contact.phone}</p>
        <p>Data de registro: {contact.register_date}</p>
        <p>Id do Cliente: {contact.clientId}</p>
      </div>
      <div className="flex justify-end p-4">
        <EditContactModal contactId={contact.id} />
        <button
          onClick={() => removeContact(contact.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
