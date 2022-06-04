import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { saveVault } from "../api";
import { IVaultItem } from "../pages";
import { encryptVault } from "../utils";
import FormLayout from "./FormLayout";

interface IVaultProps {
  vault: IVaultItem[];
  vaultKey: string;
}

const Vault: React.FunctionComponent<IVaultProps> = ({
  vault = [],
  vaultKey = "",
}) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vault",
  });

  const mutation = useMutation(saveVault);

  return (
    <FormLayout
      onSubmit={handleSubmit(({ vault }) => {
        const encryptedVault = encryptVault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        window.sessionStorage.setItem("vault", JSON.stringify(vault));

        mutation.mutate({ encryptedVault });
      })}
    >
      {fields.map((field, index) => {
        return (
          <Box display="flex" key={field.id} alignItems="flex-end">
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`vault.${index}.website`, {
                  required: "Website is required!",
                })}
              />
            </FormControl>
            <FormControl ml={2}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                {...register(`vault.${index}.username`, {
                  required: "Username is required!",
                })}
              />
            </FormControl>
            <FormControl ml={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`vault.${index}.password`, {
                  required: "Password is required!",
                })}
              />
            </FormControl>
            <Button
              type="button"
              bg="red.500"
              color="white"
              fontSize="2xl"
              ml="2"
              onClick={() => remove(index)}
            >
              -
            </Button>
          </Box>
        );
      })}

      <Button
        type="button"
        mt={4}
        onClick={() => append({ website: "", username: "", password: "" })}
      >
        Add
      </Button>
      <Button type="submit" mt={4} ml={2}>
        Save Vault
      </Button>
    </FormLayout>
  );
};

export default Vault;
