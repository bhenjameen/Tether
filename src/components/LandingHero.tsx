import Link from 'next/link';

export default function LandingHero() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden py-32">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150 -z-10" />
                <img
                    src="/logo.png"
                    alt="Tether Logo"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain animate-float drop-shadow-2xl"
                />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Perfect Match</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
                Experience a premium dating platform designed for real connections.
                Better features, better matches, better conversations.
            </p>

            <div className="flex flex-col md:flex-row gap-6">
                <Link href="/register" className="btn-primary text-lg px-8 py-3 shadow-lg shadow-rose-500/25">
                    Start Connecting Now
                </Link>
                <Link href="/discover" className="px-8 py-3 rounded-full border border-slate-700 hover:bg-white/5 transition-all text-lg font-medium">
                    Browse Singles
                </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <FeatureCard
                    title="Premium Profiles"
                    desc="Express yourself with video, audio, and rich media profiles."
                />
                <FeatureCard
                    title="Smart Matching"
                    desc="Our algorithm connects you with people who truly fit your vibe."
                />
                <FeatureCard
                    title="Real-time Chat"
                    desc="Instant messaging with read receipts and media sharing."
                />
            </div>
        </div>
    );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="glass-panel p-6 text-left hover:bg-white/5 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-rose-300">{title}</h3>
            <p className="text-slate-400">{desc}</p>
        </div>
    );
}
