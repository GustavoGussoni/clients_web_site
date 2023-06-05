import ClientCard from "@/components/clientCard";
import LogoutButton from "@/components/logoutButton";
import { ClientData, ClientReturnData } from "@/schemas/client.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import nookies from "nookies";

interface HomeProps {
  clients: ClientReturnData[];
  client: ClientReturnData[];
}

const Home: NextPage<HomeProps> = ({ clients, client }) => {
  return (
    <main
      className={`body flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex flex-col gap-2">
        <LogoutButton />
        <h1 className="self-center font-bold">Olá, {client[0].full_name}.</h1>
        <h1 className="self-center">
          Seja bem-vindo ao app de gerenciamento de contatos.
        </h1>

        <Link
          href={"/contacts"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded text-center"
        >
          Listar todos os seus contatos
        </Link>

        <div className="flex flex-col">
          <h2 className="self-center">Clientes cadastrados no sistema:</h2>
          {clients.map((client) => {
            return <ClientCard key={client.id} client={client} />;
          })}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const cookies = nookies.get(cxt);

  if (!cookies.client_token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const listClients = await api.get<ClientData[]>("/clients", {
    headers: {
      Authorization: `Bearer ${cookies.client_token}`,
    },
  });

  const client = await listClients.data.filter((client) => {
    return client.email === cookies.clientEmail;
  });

  return {
    props: { clients: listClients.data, client: client },
  };
};

export default Home;
