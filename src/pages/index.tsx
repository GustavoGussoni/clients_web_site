import ContactCard from "@/components/contactCard";
import { contactData } from "@/schemas/contact.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";

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
  const response = await api.get<contactData[]>("/contacts", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsZWl0b24yQG1haWwuY29tIiwiaWF0IjoxNjg1ODE4NjQ3LCJleHAiOjE2ODU5MDUwNDcsInN1YiI6IjU2YjZmYjhlLTU5MWYtNGMyMS05MjA5LTRkY2RlY2E2YzA3ZiJ9.WRX0WBV-QBedzYR3eWqd0zEeyuad1zpO2hprhuyBslE`,
    },
  });

  return {
    props: { contacts: response.data },
  };
};

export default Home;
