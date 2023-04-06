"use client";
import { useState } from "react";

export default function ClientVisitForm() {
	const currentDate = new Date().toISOString();
	const [selectedDate, setSelectedDate] = useState(
		currentDate.substring(0, 10)
	);

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
									className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
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
											className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            checked
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
											className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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

						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								About
							</label>
							<div className="mt-2">
								<textarea
									id="about"
									name="about"
									rows={3}
									className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-500">
								Write a few sentences about yourself.
							</p>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
						Personal Information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						Use a permanent address where you can receive mail.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="first-name"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								First name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="last-name"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Last name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Country
							</label>
							<div className="mt-2">
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								Street address
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2 sm:col-start-1">
							<label
								htmlFor="city"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								City
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="region"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								State / Province
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
							>
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 dark:border-gray-50/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Notifications
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500">
						We'll always let you know about important changes, but you pick what
						else you want to hear about.
					</p>

					<div className="mt-10 space-y-10">
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
								By Email
							</legend>
							<div className="mt-6 space-y-6">
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="comments"
											name="comments"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="comments"
											className="font-medium text-gray-900 dark:text-gray-50"
										>
											Comments
										</label>
										<p className="text-gray-500">
											Get notified when someones posts a comment on a posting.
										</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="candidates"
											name="candidates"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="candidates"
											className="font-medium text-gray-900 dark:text-gray-50"
										>
											Candidates
										</label>
										<p className="text-gray-500">
											Get notified when a candidate applies for a job.
										</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="offers"
											name="offers"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="offers"
											className="font-medium text-gray-900 dark:text-gray-50"
										>
											Offers
										</label>
										<p className="text-gray-500">
											Get notified when a candidate accepts or rejects an offer.
										</p>
									</div>
								</div>
							</div>
						</fieldset>
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
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Enregistrer
				</button>
			</div>
		</form>
	);
}
