import Test from "../pages/test/index";
import { Providers } from "~/providers";
import "@rainbow-me/rainbowkit/styles.css";

export default function TestPage() {
  return (
    <Providers>
      <Test />
    </Providers>
  );
}
