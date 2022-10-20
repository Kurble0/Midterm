//import what we need for the home
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddTodo from "../components/AddTodo";


export default function AddToDo() {
  return (
    <Container maxW="7x1">
      <Auth />
      <AddTodo />
    </Container>
  );
};
