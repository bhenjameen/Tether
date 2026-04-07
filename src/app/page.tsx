"use client";
import FeaturedProfiles from '@/components/FeaturedProfiles'
import LandingHero from '@/components/LandingHero'
import Navbar from '@/components/Navbar'
import Stories from '@/components/Stories'
import ProfileCard from '@/components/ProfileCard'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import StatusCreator from '@/components/StatusCreator'
import ProfileModal from '@/components/ProfileModal'

export default function Home() {
  const { data: session, status: authStatus } = useSession();
  const isLoggedIn = authStatus === 'authenticated';
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profiles');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProfiles(data);
        }
      } catch (error) {
        console.error('Failed to fetch profiles for home page');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Split profiles into matches and new users for display logic
  const matches = profiles.slice(0, 8);
  const newUsers = profiles.slice(8);
  const displayedUsers = showMoreUsers ? newUsers : newUsers.slice(0, 12);

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Show hero only for logged-out users */}
      {!isLoggedIn && authStatus !== 'loading' && <LandingHero />}

      {/* Status Creator - only for logged-in users */}
      {isLoggedIn && (
        <div className="max-w-7xl mx-auto w-full px-6 xl:px-20 mb-8 pt-32">
          <StatusCreator />
        </div>
      )}

      {/* Stories/Moments section - shown for all users */}
      <div className={`max-w-7xl mx-auto w-full px-6 mb-8 ${isLoggedIn ? '' : 'pt-0'}`}>
        <h2 className="text-xl font-semibold mb-4 text-center text-slate-200">Featured Moments</h2>
        <Stories center={true} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      ) : isLoggedIn ? (
        <>
          {/* Your Matches Section */}
          {matches.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <div className="mb-8 px-6 xl:px-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                    Your Matches
                  </span>
                </h2>
                <p className="text-slate-400 text-base">
                  People who share your interests and are looking to connect. Start a conversation today!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 xl:px-20 place-items-center">
                {matches.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={{
                      ...profile,
                      onClick: () => setSelectedProfile(profile)
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* New Users Section */}
          {newUsers.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-20">
              <div className="mb-8 px-6 xl:px-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
                    New Users
                  </span>
                </h2>
                <p className="text-slate-400 text-base">
                  Fresh faces just joined the community. Be the first to say hello and make a connection!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 xl:px-20 place-items-center">
                {displayedUsers.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={{
                      ...profile,
                      onClick: () => setSelectedProfile(profile)
                    }}
                  />
                ))}
              </div>

              {/* See More Button */}
              {!showMoreUsers && newUsers.length > 12 && (
                <div className="mt-12 flex justify-center px-6 xl:px-20">
                  <button
                    onClick={() => setShowMoreUsers(true)}
                    className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/30 hover:border-rose-500/50 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative flex items-center gap-2 font-semibold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
                        See More Users
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-rose-400 group-hover:translate-y-0.5 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </section>
          )}
        </>
      ) : (
        <FeaturedProfiles />
      )}

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          isOpen={!!selectedProfile}
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  )
}

