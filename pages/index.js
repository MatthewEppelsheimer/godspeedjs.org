import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Godspeed from "../components/Godspeed/components/GodSpeed";
import DATA from "../data-mock";
import utilStyles from "../styles/utils.module.css";

// Mock interactions w/ external data store
const createCallback = (document) => {
	// console.log('dataStore told to create record:',document);
	// @TODO return a promise to update optimistic UI after completion
};

const deleteCallback = (document) => {
	// console.log('dataStore told to delete record:', document);
	// @TODO return a promise to update optimistic UI after completion
};
const dataStoreCrudCallbacks = {
	create: createCallback,
	read: null,
	update: null,
	delete: deleteCallback,
};

// Mock creating a slotfill
// Essentially React's Portals pattern but without reliance on ReactDOM
// Steals terminology from WordPress
// const resultListItemSlot = (result, ops) => {
//   return (
//     <button className="delete_button" onClick={() => ops.delete(result)}>delete</button>
//   )
// };

const slotfills = {
	// resultListItemSlot,
};

export default function Home() {
	const smallFont = { fontSize: "small" };
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div>
				<h1>What's this?</h1>
				<p>
					👉🏻{" "}
					<a
						href="https://github.com/MatthewEppelsheimer/godspeedjs.org#user-content-godspeed"
						target="_blank"
					>
						github.com/MatthewEppelsheimer/godspeedjs.org
					</a>{" "}
					👈🏻 should answer some questions.
				</p>
				<p>
					<strong>
						Be sure and see the "Development Notes as of 2020-05-13"
						section of that README.
					</strong>{" "}
					😄
				</p>
			</div>
			<h1>👇🏻Godspeed pre-v0.1 Demo 👇🏻</h1>
			<p>
				Take the{" "}
				<a
					href="https://github.com/MatthewEppelsheimer/godspeedjs.org#user-content-self-guided-tour-of-the-working-demo"
					target="_blank"
				>
					Self-guided Demo
				</a>
			</p>
			<p style={smallFont}>
				Navigation between elements is still a Work in Progress, but you
				can:
			</p>
			<ul style={smallFont}>
				<li>Type to search.</li>
				<li>'Escape' to clear selection, then clear search.</li>
				<li>Arrow up/down to select.</li>
				<li>'Enter' to open document selected document.</li>
				<li>
					Or, 'Enter' to create a new document from your search
					phrase.
				</li>
			</ul>
			<Godspeed
				records={DATA}
				dataStore={dataStoreCrudCallbacks}
				slotFills={slotfills}
			/>
		</Layout>
	);
}
