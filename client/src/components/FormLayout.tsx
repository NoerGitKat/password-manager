import { Box } from "@chakra-ui/react";
import * as React from "react";

interface IFormLayoutProps {
  children: React.ReactNode;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
}

const FormLayout: React.FunctionComponent<IFormLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Box w="100%" maxW="container.sm" boxShadow="xl" p="8" as="form" {...props}>
      {children}
    </Box>
  );
};

export default FormLayout;
