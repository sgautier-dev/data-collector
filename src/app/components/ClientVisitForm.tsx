"use client";
import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ClientVisitForm() {
	const [errorDuration, setErrorDuration] = useState<string>("");
	const [errorPostal, setErrorPostal] = useState<string>("");

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

	const [postalCode, setPostalCode] = useState<string>('');
	const isValidPostalCode = (code: string) => {
		return /^((974\d{2})|Autre)$/i.test(code);
	};

	const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPostalCode(value);

		if (!isValidPostalCode(value)) {
			setErrorPostal(
				"Code postal Réunion valide ou 'Autre'."
			);
		} else {
			setErrorPostal("");
		}
	};

	return (
		<form>
			<div className="space-y-12 border px-10">
				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className=" mt-10 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
						Informations initiales
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						Auto remplissage des champs si le client est déjà existant en base
						de données.
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
									className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:py-1.5 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<fieldset>
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
											defaultChecked
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
										/>
										<label
											htmlFor="no"
											className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
										>
											Non
										</label>
									</div>
								</div>
							</fieldset>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Username
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
										workcation.com/
									</span>
									<input
										type="text"
										name="username"
										id="username"
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="janesmith"
										required
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
						Informations Client
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						Attention de vérifier la saisie des données.
					</p>

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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
									required
								/>
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
									autoComplete="client-type-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6"
									required
								>
									<option>Pro</option>
									<option>Perso</option>
								</select>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Code Postal
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									pattern="((974\d{2})|Autre)"
									value={postalCode}
									onChange={handlePostalChange}
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
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
				>
					Annuler
				</button>
				<button
					type="submit"
					className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
				>
					Enregistrer
				</button>
			</div>
		</form>
	);
}
