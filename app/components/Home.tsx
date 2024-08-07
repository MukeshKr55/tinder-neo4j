"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Neo4JUser } from "@/types";
import React from "react";
import TinderCard from "react-tinder-card";
import { neo4jSwipe } from "../neo4j.action";

interface HomepageClientComponentProps {
  currentUser: Neo4JUser;
  users: Neo4JUser[];
}

const HomepageClientComponent: React.FC<HomepageClientComponentProps> = ({
  currentUser,
  users,
}) => {
  const handleSwipe = async (direction: string, user: Neo4JUser) => {
    const userId = user.applicationId;
    const isMatch = await neo4jSwipe(
      currentUser.applicationId,
      direction,
      userId
    );
    if (isMatch) alert(`Congrats, it's a match with ${user.firstname}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h1 className="text-4xl font-bold text-center mb-5">
          Hello {currentUser.firstname}
        </h1>
        <div className="relative w-full min-w-80 h-96">
          {users.map((user) => (
            <TinderCard
              onSwipe={(direction) => {
                handleSwipe(direction, user);
              }}
              className="absolute w-full h-full"
              key={user.applicationId}
            >
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/wallpaperflare.com_wallpaper (10).jpg"
                  alt={user.firstname}
                  className="w-full h-96 object-cover"
                />
                <CardHeader className="p-4 bg-gradient-to-t from-black to-transparent">
                  <CardTitle className="text-2xl font-bold text-white">
                    {user.firstname}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-300">
                    {user.email}
                  </CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageClientComponent;
