import Image from "next/image";
import styles from "./page.module.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
      <>
          <Header/>
          <Navbar/>
      </>
  );
}
