import { createContactData } from "@/schemas/contact.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface contactProviderData {
  register: (contactData: createContactData) => void;
}

const ContactContext = createContext<contactProviderData>(
  {} as contactProviderData
);

export const ContactProvider = ({ children }: Props) => {
  const router = useRouter();

  const register = (contactData: createContactData) => {
    api
      .post("/contacts", contactData)
      .then(() => {
        toast.success("Contato cadastrado! Redirecionando...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/contacts");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro! Email já utilizado...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    return (
      <ContactContext.Provider value={{ register }}>
        {children}
      </ContactContext.Provider>
    );
  };
};

export const useAuthContact = () => useContext(ContactContext);
