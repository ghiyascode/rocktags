import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faMap, faInfoCircle, faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar(): React.ReactElement {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<header className="w-full sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "var(--brand-brown)" }}>
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md transform hover:scale-105 transition-transform">
						<FontAwesomeIcon icon={faPaw} className="text-2xl text-[var(--brand-brown)]" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
							Meowvricks
						</h1>
						<p className="text-sm text-white/90" style={{ fontFamily: "var(--font-body)" }}>
							UTA Cat Tracker
						</p>
					</div>
				</div>

				{/* Mobile menu button */}
				<button 
					className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<FontAwesomeIcon icon={faBars} className="text-xl" />
				</button>

				{/* Desktop navigation */}
				<nav className="space-x-6 hidden md:flex items-center">
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faMap} /> Map
					</a>
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faInfoCircle} /> About
					</a>
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faEnvelope} /> Contact
					</a>
				</nav>
			</div>

			{/* Mobile menu */}
			<div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-[var(--brand-brown)] border-t border-white/10`}>
				<nav className="flex flex-col px-6 py-4 space-y-4">
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faMap} /> Map
					</a>
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faInfoCircle} /> About
					</a>
					<a className="text-white/90 hover:text-white flex items-center gap-2 transition-colors" href="#">
						<FontAwesomeIcon icon={faEnvelope} /> Contact
					</a>
				</nav>
			</div>
		</header>
	);
}
