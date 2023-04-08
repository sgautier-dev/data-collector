import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";

export default function Header() {
	return (
		<header className=" bg-blue p-6 drop-shadow-xl z-10">
			<div className="mx-auto flex items-center justify-between gap-1 flex-col sm:flex-row">
				<ResponsiveImage
					src="/images/logo-dataChaman.png"
					originalWidth={277}
					originalHeight={138}
					width={100}
					alt="logo data chaman"
					priority={true}
				/>
			</div>
		</header>
	);
}
