import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "client_token");
    toast.success("Volte sempre!", {
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
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-0 right-0 m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sair
    </button>
  );
};

export default LogoutButton;
