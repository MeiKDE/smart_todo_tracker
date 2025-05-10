import { TodoProvider } from "./context/TodoContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
