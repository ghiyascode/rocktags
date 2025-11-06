import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faPaw, 
	faHeart,
	faMapMarkerAlt,
	faClock,
	faCamera
} from "@fortawesome/free-solid-svg-icons";
import { 
	faGithub,
	faInstagram 
} from "@fortawesome/free-brands-svg-icons";

export default function Footer(): React.ReactElement {
	const year = new Date().getFullYear();
	
	return (
		<footer className="w-full mt-8" style={{ backgroundColor: "var(--brand-brown)", color: "white", fontFamily: "var(--font-body)" }}>
			<div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{/* Brand Section */}
					<div className="flex flex-col items-center md:items-start text-center md:text-left">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
								<FontAwesomeIcon icon={faPaw} className="text-2xl text-[var(--brand-brown)]" />
							</div>
							<div>
								<div className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Meowvricks</div>
								<div className="text-sm text-white/80">UTA Cat Tracker</div>
							</div>
						</div>
						<p className="text-sm text-white/70 max-w-xs">
							Helping the UTA community connect with and care for our beloved campus cats.
						</p>
					</div>

					{/* Quick Stats */}
					<div className="text-center md:text-left">
						<h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Quick Stats</h3>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-center md:justify-start gap-2">
								<FontAwesomeIcon icon={faPaw} className="text-white/60" />
								<span>12 Active Cat Profiles</span>
							</div>
							<div className="flex items-center justify-center md:justify-start gap-2">
								<FontAwesomeIcon icon={faMapMarkerAlt} className="text-white/60" />
								<span>25 Popular Spots</span>
							</div>
							<div className="flex items-center justify-center md:justify-start gap-2">
								<FontAwesomeIcon icon={faClock} className="text-white/60" />
								<span>150+ Daily Sightings</span>
							</div>
							<div className="flex items-center justify-center md:justify-start gap-2">
								<FontAwesomeIcon icon={faCamera} className="text-white/60" />
								<span>300+ Photos Shared</span>
							</div>
						</div>
					</div>

					{/* Social Links */}
					<div className="text-center md:text-left">
						<h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Connect With Us</h3>
						<div className="flex justify-center md:justify-start gap-4 mb-4">
							<a href="https://github.com/Iam-samyog" target="_blank" rel="noopener noreferrer" 
								className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
								<FontAwesomeIcon icon={faGithub} className="text-xl" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer"
								className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
								<FontAwesomeIcon icon={faInstagram} className="text-xl" />
							</a>
						</div>
						<p className="text-sm text-white/70">
							Share your cat photos with #UTACats
						</p>
					</div>
				</div>

				{/* Copyright */}
				<div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
					<div>© {year} Meowvricks • Made with <FontAwesomeIcon icon={faHeart} className="text-red-400" /> by ACM</div>
					<div className="flex gap-6">
						<a href="#" className="hover:text-white transition-colors">Privacy</a>
						<a href="#" className="hover:text-white transition-colors">Terms</a>
						<a href="#" className="hover:text-white transition-colors">Contact</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
