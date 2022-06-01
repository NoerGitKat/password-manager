import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import styles from "../styles/Home.module.css";

type TStep = "login" | "register" | "vault";

const Home: NextPage = () => {
  const [step, setStep] = useState<TStep>("login");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {step === "login" && <LoginForm />}
        {step === "register" && <RegisterForm />}
        {step === "vault" && <Vault />}
      </main>
    </div>
  );
};

export default Home;
