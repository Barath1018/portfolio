"use client";
import GitHubCalendar from "react-github-calendar";

export const GithubCalendarCard = ({ username = "Barath1018" }: { username?: string }) => {
	return (
		<div className="h-full flex flex-col">
			<div className="px-6 pt-6">
				<div className="text-3xl font-serif">
					<span className="text-white/80">GitHub</span>
					<span className="text-purple-400 font-bold"> Calendar</span>
				</div>
				<p className="text-sm text-white/60 mt-1">Recent contributions</p>
			</div>
			<div className="flex-1 px-3 pb-4 mt-2 overflow-auto">
				<div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
					<GitHubCalendar
						username={username}
						colorScheme="dark"
						blockSize={11}
						blockRadius={4}
						weekStart={1}
						theme={{
							light: ["#111827", "#c084f5"],
							dark: ["#1f2937", "#7e22ce"],
						}}
					/>
				</div>
			</div>
		</div>
	);
};

// NOTE: This component is intentionally persistent. Do not remove without replacing functionality.
