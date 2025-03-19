"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Search, Home, Library, Heart, Plus } from "lucide-react";
import Image from "next/image";
import logo from "@/../public/DNA/Create/Logo.png";
import type { Artist } from "@/types/artist";

export const Box = (): JSX.Element => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white space-y-4 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-purple-500 border-opacity-50 rounded-full mx-auto"></div>
          <p>Loading artists...</p>
        </div>
      </div>
    );
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
      {/* Dark gradient background */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: "linear-gradient(135deg, #1e1228 0%, #100c18 50%, #0a0814 100%)"
        }}
      />
      
      {/* Purple glow in top-left corner */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] opacity-40 z-0" 
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(91, 33, 182, 0.15) 50%, transparent 80%)",
          filter: "blur(80px)"
        }}
      />
      
      {/* Additional subtle glow for depth */}
      <div 
        className="fixed bottom-0 right-0 w-[500px] h-[500px] opacity-30 z-0" 
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(29, 78, 216, 0.1) 50%, transparent 80%)",
          filter: "blur(100px)"
        }}
      />
      
      <div className="relative flex w-full z-10">
        {/* Sidebar */}
        <nav className="fixed left-0 top-0 h-full w-[72px] bg-black flex flex-col items-center py-8 z-50">
          {/* Logo at top */}
          <div className="w-full px-[15px] mb-8">
            <div className="w-full aspect-square flex items-center justify-center">
              <Image 
                src={logo} 
                alt="Logo"
                width={42}
                height={42}
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col px-[15px] w-full">
            <button className="w-full h-[42px] rounded-lg bg-[#2A2334] flex items-center justify-center text-white hover:bg-[#342B3D] transition-colors mb-3">
              <Home size={18} />
            </button>
            <button className="w-full h-[42px] rounded-lg bg-[#2A2334] flex items-center justify-center text-white hover:bg-[#342B3D] transition-colors mb-3">
              <Search size={18} />
            </button>
            <button className="w-full h-[42px] rounded-lg bg-[#2A2334] flex items-center justify-center text-white hover:bg-[#342B3D] transition-colors mb-3">
              <Library size={18} />
            </button>
            <button className="w-full h-[42px] rounded-lg bg-[#2A2334] flex items-center justify-center text-white hover:bg-[#342B3D] transition-colors mb-3">
              <Heart size={18} />
            </button>
            <button className="w-full h-[42px] rounded-lg bg-[#2A2334] flex items-center justify-center text-white hover:bg-[#342B3D] transition-colors">
              <Plus size={18} />
            </button>
          </div>

          {/* Profile icon */}
          <div className="w-full px-[15px] mt-auto">
            <div className="w-full aspect-square rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 ml-[122px] px-[20px] py-8 relative z-10">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-[32px] font-[400] leading-[61px] tracking-[0%] font-power-grotesk text-white">
                EXPLORE
              </h1>
              <span 
                className="text-[32px] font-[400] leading-[61px] tracking-[0%] font-power-grotesk text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(to right, #A855F7, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text"
                }}
              >
                DNA
              </span>
            </div>
            <p className="text-[#9CA3AF] text-sm">
              One-of-a-kind AI music experience, powered by real artists and musicians.
            </p>
          </header>

          {/* Artist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <Card
                key={artist.id}
                className="group bg-[#1A1425]/10 backdrop-blur-[2px] border-none overflow-hidden rounded-xl hover:scale-[1.02] hover:bg-[#1A1425]/40 hover:backdrop-blur-sm transition-all duration-300"
              >
                <div className="relative aspect-square">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
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

                <CardContent className="p-4">
                  <h3 className="font-bold text-white mb-1">{artist.name}</h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{artist.description}</p>

                  {artist.tags && (
                    <p className="text-xs text-gray-500">{artist.tags}</p>
                  )}

                  <Button 
                    className="w-full mt-3 text-white border-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
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