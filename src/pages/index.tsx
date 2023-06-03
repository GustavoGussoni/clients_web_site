import ContactCard from "@/components/contactCard";
import RegisterForm from "@/components/registerForm";
import { contactData } from "@/schemas/contact.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { toast } from "react-toastify";

interface HomeProps {
  contacts: contactData[];
}

const Home: NextPage<HomeProps> = ({ contacts }) => {
  return (
    <main
      className={`body flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {contacts.map((contact) => {
        return <ContactCard key={contact.id} contact={contact} />;
      })}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const cookies = nookies.get(cxt);
  // console.log(cookies.client_token);

  const response = await api.get<contactData[]>("/contacts", {
    headers: {
      Authorization: `Bearer ${cookies.client_token}`,
    },
  });

  return {
    props: { contacts: response.data },
  };
};

export default Home;
