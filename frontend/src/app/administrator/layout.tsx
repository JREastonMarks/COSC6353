import "../globals.css";
import Header from "@/app/components/Header"

export default function AdministratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
          <section>
            <Header></Header>
            {children}
          </section>
    );
}
