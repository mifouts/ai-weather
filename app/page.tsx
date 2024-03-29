"use client";

import { Card, Divider, Subtitle, Text } from "@tremor/react";
import CityPicker from "@/components/CityPicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B589D6] to-[#552586] p-10 flex flex-col justify-center items-center">
      <Card className="max-w-4xl mx-auto bg-white rounded-lg">
        <Text className="text-6xl font-bold text-center mb-10">Sports AI</Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAI, Next.js 13.3, Tailwind CSS, Tremor 2.0 + More!
        </Subtitle>

        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#B589D6] to-[#552586] rounded-lg">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
