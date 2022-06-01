import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerUser } from "../api";
import { TStep } from "../pages";
import { generateVaultKey, hashPassword } from "../utils";
import FormLayout from "./FormLayout";

interface IRegisterFormProps {
  setStep: Dispatch<SetStateAction<TStep>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
}

type FormValues = {
  email: string;
  password: string;
  hashedPassword: string;
};

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = ({
  setStep,
  setVaultKey,
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const mutation = useMutation(registerUser, {
    onSuccess: ({ salt, vault }) => {
      const email = getValues("email");
      const hashedPassword = getValues("hashedPassword");
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });

      window.sessionStorage.setItem("vk", vaultKey);
      window.sessionStorage.setItem("vault", "");

      setStep("vault");
    },
  });

  return (
    <FormLayout
      onSubmit={handleSubmit(() => {
        const password = getValues("password");
        const email = getValues("email");
        const hashedPassword = hashPassword(password);
        setValue("hashedPassword", hashedPassword);

        mutation.mutate({
          email,
          hashedPassword,
        });
      })}
    >
      <Heading>Register</Heading>
      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 4,
              message: "Email must be at least 4 characters long.",
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters long.",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit">Register</Button>
    </FormLayout>
  );
};

export default RegisterForm;
