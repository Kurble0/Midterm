//import what we need for the home
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";


export default function Home() {
  return (
    <Container maxW="7x1">
      <Auth />
      <AddTodo />
      <TodoList />
    </Container>
  );
};
