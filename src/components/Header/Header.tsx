
import { createClient } from "@/prismicio";
import Navbar from "../NavBar/NavBar";

export default async function Header() {
    // Fetch data from Prismic
    const client = createClient(); // Create a client from local file function to get our data
    const navbar = await client.getSingle("navbar") // Fetching our data (settings custom type)
  return (
    <header>
      <Navbar navbar={navbar}></Navbar> {/* Pass the settings data as props to the NavBar component */}
    </header>
  )
}
