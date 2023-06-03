import { contactData } from "@/schemas/contact.schema";

interface IContactCardProps {
  contact: contactData;
}

const ContactCard = ({ contact }: IContactCardProps) => {
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
          Editar
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

// <div>
//       <div>
//         <p>{contact.id}</p>
//         <p>{contact.full_name}</p>
//         <p>{contact.email}</p>
//         <p>{contact.phone}</p>
//         <p>{contact.register_date}</p>
//         <p>{contact.clientId}</p>
//       </div>
//       <div>
//         <button>editar</button>
//         <button>excluir</button>
//       </div>
//     </div>
