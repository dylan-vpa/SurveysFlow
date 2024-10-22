import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Link Up - New Survey" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function NewSurvey() {
  return (
    <></>
  );
}