import Image from "next/image";
import { Inter } from "next/font/google";
import ClientVisitForm from "./components/ClientVisitForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={`px-6 mx-auto ${inter.className}`}>
			<h1 className="text-center text-lg leading-8 font-bold">
				Formulaire visite client
			</h1>
			<ClientVisitForm />
		</main>
	);
}
