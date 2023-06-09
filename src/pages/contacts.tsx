import ContactCard from "@/components/contactCard";
import ContactModal from "@/components/contactModal";
import RegisterForm from "@/components/registerForm";
import { ClientData, ClientReturnData } from "@/schemas/client.schema";
import { contactData } from "@/schemas/contact.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import nookies from "nookies";

interface ContactsProps {
  contacts: contactData[];
  client: ClientReturnData[];
}

const Contacts: NextPage<ContactsProps> = ({ contacts }) => {
  return (
    <main
      className={`body flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex flex-col gap-2">
        <Link
          href={"/"}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow w-full text-center"
        >
          Voltar para home
        </Link>
        <ContactModal />

        {contacts ? (
          contacts.map((contact) => {
            return <ContactCard key={contact.id} contact={contact} />;
          })
        ) : (
          <h1>Ainda não existem contatos cadastrados</h1>
        )}
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
  try {
    const response = await api.get<contactData[]>("/contacts", {
      headers: {
        Authorization: `Bearer ${cookies.client_token}`,
      },
    });

    return {
      props: { contacts: response.data },
    };
  } catch (error) {
    return {
      props: { contacts: null },
    };
  }
};

export default Contacts;
