"use client";
import FeaturedProfiles from '@/components/FeaturedProfiles'
import LandingHero from '@/components/LandingHero'
import Navbar from '@/components/Navbar'
import Stories from '@/components/Stories'
import ProfileCard from '@/components/ProfileCard'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import StatusCreator from '@/components/StatusCreator'
import ProfileModal from '@/components/ProfileModal'

// Mock data for matches
const MATCHES = [
  { id: 'm1', name: 'Jessica', age: 24, location: 'Lagos', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', bio: 'Love traveling and trying new food.', isVerified: true },
  { id: 'm2', name: 'Amina', age: 25, location: 'Kano', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80', bio: 'Fashion designer looking for inspiration.', isVerified: true },
  { id: 'm3', name: 'Sarah', age: 26, location: 'Lagos', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80', bio: 'Photographer seeing the world.', isVerified: true },
  { id: 'm4', name: 'Ngozi', age: 27, location: 'Owerri', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80', bio: 'Model and entrepreneur.' },
  { id: 'm5', name: 'Fatima', age: 24, location: 'Sokoto', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80', bio: 'Artist painting my own path.' },
  { id: 'm6', name: 'Grace', age: 23, location: 'Benin City', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&q=80', bio: 'Nurse with a caring heart.' },
  { id: 'm7', name: 'Chioma', age: 25, location: 'Asaba', image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&q=80', bio: 'Dancer expressing life through movement.' },
  { id: 'm8', name: 'Zainab', age: 22, location: 'Kaduna', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80', bio: 'Student and bookworm.' },
];

// Mock data for new users
const NEW_USERS = [
  { id: 'n1', name: 'David', age: 29, location: 'Abuja', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'Tech enthusiast and gym rat.' },
  { id: 'n2', name: 'James', age: 31, location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Music producer and DJ.' },
  { id: 'n3', name: 'Emeka', age: 28, location: 'Enugu', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', bio: 'Architect building dreams.' },
  { id: 'n4', name: 'Daniel', age: 30, location: 'Abuja', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80', bio: 'Chef who loves to cook for two.' },
  { id: 'n5', name: 'Tunde', age: 29, location: 'Ibadan', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', bio: 'Software engineer. Code and coffee.' },
  { id: 'n6', name: 'Samuel', age: 32, location: 'Lagos', image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&q=80', bio: 'Businessman. Ambition is key.' },
  { id: 'n7', name: 'Alex', age: 28, location: 'Jos', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80', bio: 'Adventure seeker. Hike with me.' },
  { id: 'n8', name: 'Michael', age: 27, location: 'Calabar', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80', bio: 'Writer telling stories.' },
  { id: 'n9', name: 'Chidi', age: 26, location: 'Lagos', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', bio: 'Fitness coach and motivator.' },
  { id: 'n10', name: 'Ibrahim', age: 30, location: 'Kano', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Entrepreneur building the future.' },
  { id: 'n11', name: 'Victor', age: 25, location: 'Port Harcourt', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'Photographer capturing moments.' },
  { id: 'n12', name: 'Kunle', age: 28, location: 'Ibadan', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', bio: 'Musician and producer.' },
  { id: 'n13', name: 'Blessing', age: 24, location: 'Lagos', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&q=80', bio: 'Content creator and influencer.' },
  { id: 'n14', name: 'Femi', age: 27, location: 'Abuja', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80', bio: 'Lawyer and advocate.' },
  { id: 'n15', name: 'Adaeze', age: 23, location: 'Enugu', image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&q=80', bio: 'Makeup artist and stylist.' },
  { id: 'n16', name: 'Yusuf', age: 29, location: 'Kaduna', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80', bio: 'Civil engineer.' },
  { id: 'n17', name: 'Chiamaka', age: 26, location: 'Owerri', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80', bio: 'Fashion blogger.' },
  { id: 'n18', name: 'Tobi', age: 31, location: 'Lagos', image: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&q=80', bio: 'Real estate developer.' },
  { id: 'n19', name: 'Amaka', age: 25, location: 'Asaba', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80', bio: 'Graphic designer.' },
  { id: 'n20', name: 'Segun', age: 28, location: 'Ibadan', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80', bio: 'Digital marketer.' },
];

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showMoreUsers, setShowMoreUsers] = useState(false);

  // Show first 12 users initially, or all 20 when "See More" is clicked
  const displayedUsers = showMoreUsers ? NEW_USERS : NEW_USERS.slice(0, 12);

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Show hero only for logged-out users */}
      {!isLoggedIn && <LandingHero />}

      {/* Status Creator - only for logged-in users */}
      {isLoggedIn && (
        <div className="max-w-7xl mx-auto w-full px-4 xl:px-20 mb-8 pt-32">
          <StatusCreator />
        </div>
      )}

      {/* Stories/Moments section - shown for all users */}
      <div className={`max-w-7xl mx-auto w-full px-4 mb-8 ${isLoggedIn ? '' : 'pt-0'}`}>
        <h2 className="text-xl font-semibold mb-4 text-center text-slate-200">Featured Moments</h2>
        <Stories center={true} />
      </div>

      {/* Logged-in user sections */}
      {isLoggedIn ? (
        <>
          {/* Your Matches Section */}
          <section className="w-full max-w-[1800px] mx-auto px-8 mb-16">
            <div className="mb-8 px-4 xl:px-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                  Your Matches
                </span>
              </h2>
              <p className="text-slate-400 text-base">
                People who share your interests and are looking to connect. Start a conversation today!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 xl:px-20 place-items-center">
              {MATCHES.map((profile) => (
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

          {/* New Users Section */}
          <section className="w-full max-w-[1800px] mx-auto px-8 mb-20">
            <div className="mb-8 px-4 xl:px-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
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
            {!showMoreUsers && NEW_USERS.length > 12 && (
              <div className="mt-12 flex justify-center px-4 xl:px-20">
                <button
                  onClick={() => setShowMoreUsers(true)}
                  className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/30 hover:border-violet-500/50 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center gap-2 font-semibold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                      See More Users
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-violet-400 group-hover:translate-y-0.5 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </section>
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
    </main>
  )
}
