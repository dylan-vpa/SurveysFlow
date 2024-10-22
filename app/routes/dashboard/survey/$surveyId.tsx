import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Link Up - Edit Surveys" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function EditSurveys() {
  return (
    <></>
  );
}