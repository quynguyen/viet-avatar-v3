import { createFileRoute } from "@tanstack/react-router";
import { Storybook } from "@/components/storybook";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Storybook />;
}
