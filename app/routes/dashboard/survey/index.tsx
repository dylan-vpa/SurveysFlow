import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Link Up - Survey" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Survey() {
  return (
    <></>
  );
}