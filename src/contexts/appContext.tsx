import {
  ClientData,
  ClientRegisterData,
  EditClientData,
  LoginData,
} from "@/schemas/client.schema";
import { createContactData, editContactData } from "@/schemas/contact.schema";
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
  removeClient: (clientId: string) => void;
  editContact: (contactId: string, contactData: editContactData) => void;
  editClient: (clientId: string, clientData: EditClientData) => void;
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

  const removeClient = (clientId: string) => {
    api
      .delete(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Conta deletada com sucesso!", {
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
        toast.error(
          "Erro! Você não tem autorização para deletar outros clientes",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        router.push("/");
      });
  };

  const editClient = (clientId: string, clientData: EditClientData) => {
    api
      .patch(`/clients/${clientId}`, clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (clientData?.email) {
          setCookie(null, "clientEmail", clientData.email, {
            maxAge: 60 * 30,
            path: "/",
          });
        }
        toast.success("Contato editado!", {
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
        console.log(err.response.data.message);
        if (err.response.data.message === "You can't edit other client") {
          toast.error(
            "Erro! Você não tem permissão para editar outro cliente...",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return router.push("/");
        }
        toast.error("Erro! Email já cadastrado...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return router.push("/");
      });
  };

  const editContact = (contactId: string, contactData: editContactData) => {
    api
      .patch(`/contacts/${contactId}`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Contato editado!", {
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
        toast.error("Erro! Email já cadastrado...", {
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
      value={{
        register,
        login,
        registerContact,
        removeContact,
        removeClient,
        editContact,
        editClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
