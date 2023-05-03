import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
	title: "Data Collector, Data Chaman",
	description: "Appli web de saisie de données pour analyse BI, Data Chaman",
	authors: [{ name: "Sébastien Gautier", url: "https://www.sgautier.dev/" }],
	robots: {
		index: false,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" className="sm:scroll-smooth">
			<body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-gray-50">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
