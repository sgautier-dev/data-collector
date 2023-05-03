"use client";
import React, { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import ClientSelect from "./ClientSelect";
import { Client } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { parseISO } from "date-fns";
import { useRouter } from "next/navigation";

export default function ClientVisitForm() {
	const [errorDuration, setErrorDuration] = useState<string>("");
	const [errorPostal, setErrorPostal] = useState<string>("");
	const [errorName, setErrorName] = useState("");
	const [errorClients, setErrorClients] = useState<string>("");

	const [clients, setClients] = useState<Client[]>([]);
	const [isNewClient, setIsNewClient] = useState(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitMessage, setSubmitMessage] = useState<string>("");
	const [submitError, setSubmitError] = useState<string>("");

	const param = useSearchParams().toString();
	const router = useRouter();

	useEffect(() => {
		const fetchClients = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/clients");
				const data = await response.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setClients(data.clients);
			} catch (error: any) {
				setErrorClients(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		if (!isNewClient) {
			fetchClients();
		}
	}, [isNewClient]);

	const currentDate = new Date().toISOString();
	const [selectedDate, setSelectedDate] = useState(
		currentDate.substring(0, 10)
	);

	const [visitDuration, setVisitDuration] = useState<number | "">("");
	const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = parseFloat(event.target.value);

		if (inputValue > 0 && inputValue <= 24 && !isNaN(Number(inputValue))) {
			setVisitDuration(inputValue);
			setErrorDuration("");
		} else {
			setErrorDuration("Veuillez entrer une valeur comprise entre 1 et 24.");
			setVisitDuration("");
		}
	};

	const [postalCode, setPostalCode] = useState<string>("");
	const isValidPostalCode = (code: string) => {
		//accepts 974xx reunion codes or autre
		return /^(974\d{2}|Autre)$/i.test(code);
	};
	const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPostalCode(value);

		if (!isValidPostalCode(value)) {
			setErrorPostal("Code postal Réunion valide ou 'Autre'.");
		} else {
			setErrorPostal("");
		}
	};

	const [name, setName] = useState("");
	const isValidName = (name: string) => {
		// accepts letters, spaces, apostrophes and dashes
		return /^[a-zA-ZÀ-ÿ0-9' -]+$/.test(name);
	};
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setName(value);

		if (!isValidName(value)) {
			setErrorName(
				"Veuillez entrer un nom valide (lettres, chiffres, espaces, apostrophes et tirets uniquement)."
			);
		} else {
			setErrorName("");
		}
	};

	const DEFAULT_TYPE = "Pro";
	const [type, setType] = useState(DEFAULT_TYPE);
	const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setType(value);
	};

	const [id, setId] = useState("");
	const handleClientSelect = (client: Client) => {
		setIsNewClient(false);
		setId(client.id);
		setName(client.name);
		setType(client.type);
		setPostalCode(client.postal);
		setErrorName("");
		setErrorPostal("");
		setSubmitError("");
	};

	const handleNewClient = () => {
		setIsNewClient(true);
		setName("");
		setType(DEFAULT_TYPE);
		setPostalCode("");
		setSubmitError("");
	};

	const handleReset = () => {
		setSelectedDate(currentDate.substring(0, 10));
		setIsNewClient(true);
		setVisitDuration("");
		setErrorName("");
		setErrorDuration("");
		setErrorPostal("");
		setName("");
		setType(DEFAULT_TYPE);
		setPostalCode("");
		setSubmitError("");
	};

	interface VisitData {
		clientId: string;
		date: Date;
		duration: number | "";
		isNewClient: boolean;
		name?: string;
		type?: string;
		postal?: string;
		param?: string;
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSubmitError("");
		setIsSubmitting(true);
		setSubmitMessage("Enregistrement en cours...");

		const visitData: VisitData = {
			clientId: id,
			date: parseISO(selectedDate),
			duration: visitDuration,
			isNewClient,
		};

		if (isNewClient) {
			visitData.name = name;
			visitData.type = type;
			visitData.postal = postalCode;
			visitData.param = param;
		}

		try {
			const response = await fetch("/api/visits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(visitData),
			});

			if (response.ok) {
				setSubmitMessage("La visite a été enregistrée avec succès !");
				handleReset();
				router.push("/");
			} else {
				const dataError = await response.json();
				const error = { status: response.status, message: dataError.error };
				throw error;
			}
		} catch (error: any) {
			setSubmitMessage("");
			console.log("error.status", error.status)
			console.log("error.message", error.message)

			if (error.status === 400) {
				console.log('error.message', error.message)
				setSubmitError(error.message);
			} else {
				setSubmitError(
					"Une erreur est survenue lors de l'enregistrement de la visite."
				);
			}
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setSubmitMessage("");
			}, 3000); // delay before resetting the submission message
		}
	};

	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<div className="space-y-12 border px-10">
				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className=" mt-10 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
						Informations initiales
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						Auto remplissage des champs si le client est déjà existant.
					</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="visit-date"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Date de la visite
							</label>
							<div className="mt-2">
								<input
									type="date"
									name="visit-date"
									id="visit-date"
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									disabled={isSubmitting}
									className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:py-1.5 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<fieldset disabled={isSubmitting}>
								<legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
									Nouveau client ?
								</legend>

								<div className="mt-6 space-y-6">
									<div className="flex items-center gap-x-3">
										<input
											id="yes"
											name="isNewClient"
											type="radio"
											className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
											checked={isNewClient}
											onChange={() => handleNewClient()}
										/>
										<label
											htmlFor="yes"
											className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
										>
											Oui
										</label>
									</div>

									<div className="flex items-center gap-x-3">
										<input
											id="no"
											name="isNewClient"
											type="radio"
											className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
											checked={!isNewClient}
											onChange={() => setIsNewClient(false)}
										/>
										<label
											htmlFor="no"
											className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
										>
											Non
										</label>
									</div>
									{!isNewClient && (
										<div>
											{isLoading ? (
												<p>En cours de chargement...</p>
											) : (
												<ClientSelect
													clients={clients}
													onClientSelect={handleClientSelect}
												/>
											)}
											{errorClients && (
												<div className="flex items-center text-amber-500 dark:text-amber-400 mt-2">
													<ExclamationTriangleIcon
														className="h-5 w-5"
														aria-hidden="true"
													/>
													<p className="ml-2">{errorClients}</p>
												</div>
											)}
										</div>
									)}
								</div>
							</fieldset>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
						Informations Client
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						Merci de vérifier la saisie des données.
					</p>
					<fieldset disabled={isSubmitting}>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
								>
									Nom
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="name"
										id="name"
										autoComplete="name"
										value={name}
										onChange={handleNameChange}
										disabled={!isNewClient}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
										required
									/>
									{errorName && (
										<div className="text-xs flex items-center text-amber-500 dark:text-amber-400 mt-2">
											<ExclamationTriangleIcon
												className="h-5 w-5"
												aria-hidden="true"
											/>
											<p className="ml-2">{errorName}</p>
										</div>
									)}
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="client-type"
									className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
								>
									Type de Client
								</label>
								<div className="mt-2">
									<select
										id="client-type"
										name="client-type"
										value={type}
										onChange={handleTypeChange}
										disabled={!isNewClient}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6"
										required
									>
										<option value="">Sélectionnez un type</option>
										<option>{DEFAULT_TYPE}</option>
										<option>Perso</option>
									</select>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
								>
									Code Postal (974** ou Autre)
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										autoComplete="postal-code"
										value={postalCode}
										onChange={handlePostalChange}
										disabled={!isNewClient}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
										required
									/>
									{errorPostal && (
										<div className="text-xs flex items-center text-amber-500 dark:text-amber-400 mt-2">
											<ExclamationTriangleIcon
												className="h-5 w-5"
												aria-hidden="true"
											/>
											<p className="ml-2">{errorPostal}</p>
										</div>
									)}
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="visit-duration"
									className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
								>
									Durée de la visite (heures)
								</label>
								<div className="mt-2">
									<input
										type="number"
										name="visit-duration"
										id="visit-duration"
										min="1"
										max="24"
										step="0.5"
										value={visitDuration}
										onChange={handleDurationChange}
										onKeyDown={(e) =>
											["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
										}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
										required
									/>
									{errorDuration && (
										<div className="text-xs flex items-center text-amber-500 dark:text-amber-400 mt-2">
											<ExclamationTriangleIcon
												className="h-5 w-5"
												aria-hidden="true"
											/>
											<p className="ml-2">{errorDuration}</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="reset"
					disabled={isSubmitting}
					className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
				>
					Réinitialiser
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
				>
					Enregistrer
				</button>
				{submitError && (
					<div className="text-sm sm:text-base flex items-center text-amber-500 dark:text-amber-400">
						<ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
						<p className="ml-2">{submitError}</p>
					</div>
				)}
				{submitMessage && (
					<p className="text-sm sm:text-base text-teal-500 dark:text-teal-400">
						{submitMessage}
					</p>
				)}
			</div>
		</form>
	);
}
