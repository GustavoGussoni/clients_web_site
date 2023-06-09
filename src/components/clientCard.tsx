import { useAuth } from "@/contexts/appContext";
import { ClientReturnData } from "@/schemas/client.schema";
import EditClientModal from "./editClientModal";

interface IClientCardProps {
  client: ClientReturnData;
}

const ClientCard = ({ client }: IClientCardProps) => {
  const { removeClient } = useAuth();

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <p className="font-bold">Nome: {client.full_name}</p>
        <p>Email: {client.email}</p>
        <p>Telefone: {client.phone}</p>
        <p>Data de registro: {client.register_date}</p>
      </div>
      <div className="flex justify-end p-4">
        <EditClientModal clientId={client.id} />
        <button
          onClick={() => removeClient(client.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
