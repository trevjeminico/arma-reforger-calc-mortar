import { Flex, Theme } from "@chakra-ui/react";

export default function PageBody({ children }) {
  return (
    <>
      <Theme appearance="dark">
        <Flex background="gray.contrast" minH="100vh" direction="column">
          {children}
        </Flex>
      </Theme>
    </>
  );
}
