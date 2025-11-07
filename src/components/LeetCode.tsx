"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CountUp from "react-countup";

const LeetCode = ({ username = "barath-codex4" }) => {
	const [stats, setStats] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>(null);
	const [isVisible, setIsVisible] = useState(false);
	const componentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.4 }
		);
		const current = componentRef.current;
		if (current) observer.observe(current);
		return () => {
			if (current) observer.unobserve(current);
		};
	}, []);

	useEffect(() => {
		const fetchStats = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`https://leetcode-stats-api.vercel.app/${username}`);
				if (!res.ok) throw new Error("User not found or API issue.");
				const data = await res.json();
				if (data.status === "error") throw new Error(data.message);
				setStats(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setTimeout(() => setLoading(false), 2000);
			}
		};
		fetchStats();
	}, [username]);

	
	const renderLiquid = () => {
		const { mediumSolved, hardSolved, totalSolved } = stats;
		const total = totalSolved || 1;
		const h = (hardSolved / total) * 100;
		const m = ((mediumSolved + hardSolved) / total) * 100;
		const e = 100;

		return (
			<>
				<div className="liquid-fill" style={{ background: "var(--easy-color)", height: `${e - m}%`, animationDelay: "0s" }} />
				<div className="liquid-fill" style={{ background: "var(--medium-color)", height: `${m - h}%`, animationDelay: "0.5s" }} />
				<div className="liquid-fill" style={{ background: "var(--hard-color)", height: `${h}%`, animationDelay: "1s" }} />
			</>
		);
	};

	const renderContent = () => {
		if (loading) {
			return (
				<div style={styles.centered as React.CSSProperties}>
					<div className="loader-name"> My <span style={{ color: '#7e22ce' }}>LeetCode</span> Profile</div>
					<div className="loader-typing">Fetching LeetCode Data...</div>
				</div>
			);
		}

		if (error) {
			return (
				<div style={styles.centered as React.CSSProperties}>
					<p style={styles.errorText as React.CSSProperties}>⚠️ Connection Error</p>
					<p style={styles.errorSubText as React.CSSProperties}>{error}</p>
				</div>
			);
		}

		if (stats) {
			const { easySolved, mediumSolved, hardSolved, totalSolved, ranking } = stats;

			return (
				<div style={{ ...(styles.tiltContainer as React.CSSProperties), ...(isVisible ? (styles.visible as React.CSSProperties) : (styles.hidden as React.CSSProperties)) }}>
					<div style={styles.header as React.CSSProperties}>
						<Image src="https://assets.leetcode.com/static_assets/public/images/LeetCode_logo_rvs.png" alt="LeetCode" width={24} height={24} style={styles.logo as React.CSSProperties} />
							<span style={styles.largeTitle as React.CSSProperties}> My <span style={{ color: '#7e22ce' }}>LeetCode</span> Profile</span>
					</div>

					<div style={styles.orbContainer as React.CSSProperties}>
						<div style={{ ...(styles.orb as React.CSSProperties), ...(isVisible ? (styles.orbVisible as React.CSSProperties) : {}) }}>
							<div className="leet-liquid-stack">{isVisible && renderLiquid()}</div>
							<div style={styles.orbContent as React.CSSProperties}>
								<span style={styles.totalValue as React.CSSProperties}><CountUp end={totalSolved} duration={2.5} separator="," /></span>
								<span style={{ ...(styles.totalLabel as React.CSSProperties), color: "#9C27B0" }}>Problems Solved</span>
							</div>
						</div>
					</div>

					<div style={styles.statsGrid as React.CSSProperties}>
						<div style={styles.statItem as React.CSSProperties}><span style={{ ...(styles.dot as React.CSSProperties), background: 'var(--easy-color)' }}></span>Easy<span style={styles.statValue as React.CSSProperties}><CountUp end={easySolved} duration={2} /></span></div>
						<div style={styles.statItem as React.CSSProperties}><span style={{ ...(styles.dot as React.CSSProperties), background: 'var(--medium-color)' }}></span>Medium<span style={styles.statValue as React.CSSProperties}><CountUp end={mediumSolved} duration={2} /></span></div>
						<div style={styles.statItem as React.CSSProperties}><span style={{ ...(styles.dot as React.CSSProperties), background: 'var(--hard-color)' }}></span>Hard<span style={styles.statValue as React.CSSProperties}><CountUp end={hardSolved} duration={2} /></span></div>
					</div>

					<div style={styles.rankContainer as React.CSSProperties}>
						🏆 Global Rank: <strong style={styles.rankValue as React.CSSProperties}><CountUp end={ranking} duration={2} separator="," prefix="#" /></strong>
					</div>
				</div>
			);
		}

		return null;
	};

	return (
		<div
			ref={componentRef}
			style={styles.card as React.CSSProperties}
			onClick={() => window.open(`https://leetcode.com/${username}`, "_blank")}
		>
			{renderContent()}
			<style>{`
				:root {
					--easy-color: #00C853;
					--medium-color: #FFAB00;
					--hard-color: #F44336;
					--glow-color: rgba(0, 255, 213, 0.7);
				}

				.leet-liquid-stack {
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column-reverse;
					overflow: hidden;
					border-radius: 50%;
					clip-path: ellipse(50% 50% at 50% 50%);
				}

				.liquid-fill {
					width: 100%;
					transform: translateY(100%);
					animation: pour 1.4s ease-out forwards;
				}

				@keyframes pour {
					to { transform: translateY(0); }
				}

				.loader-name {
					font-size: 20px;
					font-weight: 700;
					color: #fff;
					animation: pulse 1.5s infinite;
					font-family: var(--font-serif);
					letter-spacing: 0.5px;
					word-spacing: 2px;
				}

				.loader-typing {
					color: #ccc;
					margin-top: 12px;
					font-family: Courier New, monospace;
					animation: typing 3s steps(30, end) infinite;
					white-space: nowrap;
					overflow: hidden;
					border-right: 2px solid #fff;
					width: 25ch;
				}

				@keyframes typing {
					0% { width: 0ch }
					50% { width: 25ch }
					100% { width: 0ch }
				}

				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.7; transform: scale(1.05); }
				}
			`}</style>
		</div>
	);
};

const styles: Record<string, unknown> = {
	card: {
		fontFamily: "'Inter', sans-serif",
		position: 'relative',
		width: '100%',
		margin: "0",
		padding: "16px 20px",
		background: 'transparent',
		minHeight: '100%',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
	},
	tiltContainer: {
		width: '100%',
		transition: 'transform 0.1s ease-out',
	},
	hidden: {
		opacity: 0,
		transform: 'scale(0.95) translateY(20px)',
	},
	visible: {
		opacity: 1,
		transform: 'scale(1) translateY(0px)',
		transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
	},
	header: {
		textAlign: 'center',
		marginBottom: '20px',
	},
	logo: {
		height: '22px',
		opacity: 0.7,
		marginBottom: '6px',
	},
	largeTitle: {
		display: 'inline-block',
		whiteSpace: 'nowrap',
		fontSize: '24px',
		fontWeight: 700,
		color: '#eee',
		fontFamily: 'var(--font-serif)', // match GitHub calendar font (Calistoga)
		letterSpacing: '0.5px',
		wordSpacing: '2px',
		padding: '0 2px',
	},
	orbContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: '12px 0 8px',
	},
	orb: {
		position: 'relative',
		width: '150px',
		height: '150px',
		borderRadius: '50%',
		border: '2px solid rgba(255, 255, 255, 0.12)',
		background: 'rgba(13, 17, 23, 0.35)',
		backdropFilter: 'blur(4px)',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	orbVisible: {
		boxShadow: 'inset 0 0 25px rgba(0, 255, 213, 0.2), 0 0 40px -10px var(--glow-color)',
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},
	orbContent: {
		position: 'relative',
		zIndex: 2,
		textAlign: 'center',
		color: '#fff',
		mixBlendMode: 'difference',
	},
	totalValue: { fontSize: '40px', fontWeight: '700' },
	totalLabel: { fontSize: '14px', letterSpacing: '1px', marginTop: '2px' },

	statsGrid: {
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
		marginTop: '6px',
	},
	statItem: {
		display: 'flex',
		alignItems: 'center',
		gap: '6px',
		fontSize: '14px',
		fontWeight: 500,
		color: '#bbb',
	},
	dot: { width: '8px', height: '8px', borderRadius: '50%' },
	statValue: {
		marginLeft: 'auto',
		fontSize: '16px',
		fontWeight: '600',
		color: '#fff',
	},
	rankContainer: {
		textAlign: 'center',
		marginTop: '8px',
		paddingTop: '8px',
		borderTop: '1px solid rgba(255, 255, 255, 0.08)',
		fontSize: '14px',
		fontWeight: 600,
		color: '#ccc',
	},
	rankValue: { color: '#FFD700', fontWeight: '600', marginLeft: '4px', fontSize: '15px' },
	centered: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	errorText: { color: '#ff8a80', fontWeight: 'bold', fontSize: '18px' },
	errorSubText: { color: '#aaa', marginTop: '5px' },
};

export default LeetCode;
export { LeetCode };
