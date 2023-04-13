import Link from "next/link";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

export default function Footer() {
	const today = new Date();
	const year = today.getFullYear().toString();

	return (
		<div className="mt-10 flex justify-between items-center text-sm p-6 drop-shadow-xl z-10">
			<p className="" translate="no">
				Copyright &copy; <span>{year}</span>
			</p>
			<Link href="https://www.sgautier.dev/" target="_blank">
				<p translate="no">Designed by SG</p>
			</Link>

			<a href="#" aria-label="back to top">
				<ArrowUpCircleIcon
					className="h-8 w-8 text-gray-400 dark:text-gray-300"
					aria-hidden="true"
				/>
			</a>
		</div>
	);
}
