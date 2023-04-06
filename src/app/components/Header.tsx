import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className=" bg-blue p-6 drop-shadow-xl z-10">
			<div className="mx-auto flex items-center justify-between gap-1 flex-col sm:flex-row">
				<Link
					href="/"
					className="hover:opacity-80 focus-visible:outline-orange"
				>
					<Image
						src="/images/logo-dataChaman.png"
						width={100}
						height={100}
						alt="logo date chaman"
						priority={true}
					/>
				</Link>
			</div>
		</header>
  )
}