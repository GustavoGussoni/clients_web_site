import {
  ClientData,
  ClientRegisterData,
  LoginData,
} from "@/schemas/client.schema";
import { createContactData } from "@/schemas/contact.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  //   setToken: (value: string) => void;
  register: (clientData: ClientRegisterData) => void;
  login: (loginData: LoginData) => void;
  registerContact: (contactData: createContactData) => void;
  removeContact: (contactId: string) => void;
  //   token: string | undefined;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const cookies = parseCookies();
  const token = cookies.client_token;
  const router = useRouter();
  const register = (clientData: ClientRegisterData) => {
    api
      .post("/clients", clientData)
      .then(() => {
        toast.success("Cadastro realizado!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro!", {
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
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "client_token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
      })
      .then((response) => {
        setCookie(null, "clientEmail", loginData.email, {
          maxAge: 60 * 30,
          path: "/",
        });
      })
      .then(() => {
        toast.success("Sucesso! Redirecionando...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro! Email ou senha inválidos...", {
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
  };

  const registerContact = (contactData: createContactData) => {
    api
      .post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        router.push("/contacts");
      });
  };

  const removeContact = (contactId: string) => {
    api
      .delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Contato deletado!", {
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
        toast.error("Erro!", {
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
      });
  };

  return (
    <AuthContext.Provider
      value={{ register, login, registerContact, removeContact }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
