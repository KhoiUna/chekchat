import MainLayout from "../containers/main_layout";

const origin =
  process.env.NEXT_PUBLIC_ORIGIN || "https://chekapp.herokuapp.com";

export default function Todo() {
  return (
    <MainLayout componentName="Todo">
      <div>Todo</div>
    </MainLayout>
  );
}
