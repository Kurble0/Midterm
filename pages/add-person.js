//import what we need for the home
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddPerson from "../components/AddPerson";


export default function addPerson() {
  return (
    <Container maxW="7x1">
      <Auth />
      <AddPerson />
    </Container>
  );
};
