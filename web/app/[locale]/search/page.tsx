import { Search } from "@/sections/Search/Search";

export const dynamic = 'force-dynamic';
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page() {
  return <Search />;

}