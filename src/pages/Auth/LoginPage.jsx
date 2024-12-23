import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import { loginFields } from "../../utils/constants";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    // <div className={styles.authForm}>
    //   <Form
    //     fields={loginFields}
    //     onSubmit={(data) => console.log("Login Data:", data)}
    //   />
    // </div>
    <Modal isOpen>
      <Form
        fields={loginFields}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
