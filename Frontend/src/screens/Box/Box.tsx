"use client";
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Search, Home, Library, Heart, Plus, Play, Pause } from "lucide-react";
import Image from "next/image";
import logo from "@/../public/DNA/Create/Logo.png";
import type { Artist } from "@/types/artist";
import { Howl } from 'howler';
import { Loader } from "../../components/ui/loader";

export const Box = (): JSX.Element => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/artists');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtists(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError('Failed to load artists. Please try again later.');
        setArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handlePlay = (artistId: number) => {
    // Stop currently playing sound
    if (soundRef.current) {
      soundRef.current.stop();
    }

    // If clicking the same artist that's playing, stop it
    if (playingId === artistId) {
      setPlayingId(null);
      return;
    }

    const sound = new Howl({
      src: [`http://localhost:8000/api/preview/${artistId}`], 
      format: ['mp3'],
      html5: true,
      onend: () => {
        setPlayingId(null);
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error);
      }
    });

    sound.play();
    soundRef.current = sound;
    setPlayingId(artistId);
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white space-y-4 text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      {/* Dark solid background instead of gradient */}
      <div 
        className="fixed inset-0 z-0 " 
        style={{
          backgroundColor: "#0a0814"  
        }}
      />
      
      
      <div className="relative flex w-full z-10">
        <nav className="fixed left-0 top-0 h-full w-[60px] bg-black/80 backdrop-blur-lg flex flex-col items-center py-8 z-50">
            <div className="w-full px-3 mb-12">
            <div className="w-full aspect-square flex items-center justify-center">
              <Image 
              src={logo} 
              alt="Logo"
              width={100}
              height={100}
              className="hover:scale-110 transition-transform"
              />
            </div>
            </div>

          {/* Navigation buttons */}
          <div className="flex flex-col -mt-6 items-center gap-5 w-full">
            {[
              { icon: Home, id: 'home' },
              { icon: Search, id: 'search' },
              { icon: Library, id: 'library' },
              { icon: Heart, id: 'favorites' },
              { icon: Plus, id: 'create' }
            ].map(({ icon: Icon, id }) => (
              <button
                key={id}
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200"
              >
                <Icon size={25} />
              </button>
            ))}
          </div>

          {/* Profile icon */}
          <div className="mt-auto mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <span className="text-white font-medium text-sm">A</span>
            </div>
          </div>
        </nav>

        <main className="flex-1 mt-7 ml-40  mr-10 px-[20px] pr-[40px] py-4 relative z-10">
          <header className="mb-4 relative">
            <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-transparent to-50% rounded-lg blur-xl"/>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-[32px] font-[400] leading-[61px] tracking-[0%] font-power-grotesk text-white">
                  EXPLORE
                </h1>
                <span 
                  className="text-[32px] font-bold leading-[61px] tracking-[0%] font-power-grotesk text-white"
                >
                  DNA
                </span>
              </div>
              <p className="text-[#9CA3AF] text-sm">
                One-of-a-kind AI music experience, powered by real artists and musicians.
              </p>
            </div>
          </header>

          {/* Artist Grid with reduced gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12">
            {artists.map((artist) => (
                <Card
                key={artist.id}
                className="group bg-[#1A1425]/10 border-8 border-[#222325]/10 overflow-hidden rounded-xl hover:scale-[1.02] hover:bg-[#222325] hover:border-[#222325]/40 hover:backdrop-blur-sm transition-all duration-300"
                >
                <div className="relative aspect-square group cursor-pointer rounded-xl overflow-hidden" onClick={() => handlePlay(artist.id)}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      {playingId === artist.id ? (
                        <Pause size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white ml-1" />
                      )}
                    </div>
                  </div>
                  {artist.genres && (
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {artist.genres.map((genre, index) => (
                        <Badge
                          key={index}
                          className="bg-black/50 backdrop-blur-sm text-white border-none text-xs px-2 py-1"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <CardContent className="p-2">
                  <h3 className="font-bold text-white text-sm">{artist.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 mb-0.5 line-clamp-1">{artist.description}</p>

                  {artist.tags && (
                    <p className="text-[10px] text-gray-500">{artist.tags}</p>
                  )}

                  <Button 
                    className="w-full mt-1.5 text-white border-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-full text-xs font-medium py-1"
                    style={{
                      background: "linear-gradient(to right, #9333EA, #3B82F6)"
                    }}
                  >
                    SUBSCRIBE TO GENERATE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};