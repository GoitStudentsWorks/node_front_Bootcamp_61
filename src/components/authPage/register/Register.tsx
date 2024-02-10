import { RegisterButton } from "../../../shared/buttons/RegisterButton";
import { registerThunk } from "../../../redux/auth/operations";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../helpers/schemas";
import { useAppDispatch } from "../../../redux/hooks";
// import { useModal } from "../../../hooks/useModal";
import {
  AuthLink,
  StyledAuthForm,
  StyledAuthInput,
  StyledRegisterWrapp,
  StyledTitle,
} from "../AuthPages.styled";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  // const { isOpen, openModal, closeModal } = useModal();

  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schemaRegister),
  });

  const submit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(registerThunk(data));
    reset();
    // closeModal();
  };

  return (
    <StyledRegisterWrapp>
      <StyledTitle>Sign Up</StyledTitle>

      <StyledAuthForm onSubmit={handleSubmit(submit)}>
        <StyledAuthInput type="text" placeholder="Name" {...register("name")} />
        {errors?.name && <div>{errors.name.message}</div>}

        <StyledAuthInput
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors?.email && <div>{errors.email.message}</div>}

        <StyledAuthInput
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password && <div>{errors.password.message}</div>}

        <RegisterButton onClick={handleSubmit(submit)}>Enter</RegisterButton>
      </StyledAuthForm>

      <AuthLink to="/login">Login</AuthLink>
    </StyledRegisterWrapp>
  );
};

export default Register;

// const { isOpen, openModal, closeModal } = useModal();
// const [modal, setModal] = useState(null);
// {
//   isOpen && modal && <Modal children={modal} closeModal={closeModal} />;
// }
// підключення модалки до необхідних частин, при необхідності треба додаткова перевірка.

// export const StyledCloseButton = styled.button`
//   border-radius: 30px;
//   padding: 5px;
//   width: 40px;
//   height: 40px;
//   background-color: transparent;

//   position: absolute;

//   top: 24px;
//   right: 24px;
// `;
