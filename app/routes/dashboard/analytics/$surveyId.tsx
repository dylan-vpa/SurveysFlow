import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Link Up - Survey Analytics" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function SurveyAnalytics() {
  return (
    <></>
  );
}