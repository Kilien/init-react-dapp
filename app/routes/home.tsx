import Home from "../pages/Home";
import { Providers } from "~/providers";
import "@rainbow-me/rainbowkit/styles.css";

export function meta() {
  return [
    { title: "New React Dapp" },
    { name: "description", content: "Welcome to React Dapp!" },
  ];
}

export default function HomePage() {
  return (
    <Providers>
      <Home />
    </Providers>
  );
}
