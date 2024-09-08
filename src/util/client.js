import { createClient } from "@sanity/client";
import { uuidv7 } from "uuidv7";

// create connection to sanity
export const client = createClient({
  projectId: "h1lk1n15", // find this at manage.sanity.io or in your sanity.json
  dataset: "boulders", // this is from those question during 'sanity init'
  apiVersion: '2024-09-08',
  token: "skmX4sXpsZGvbflqacGeXBAPcd2rX6MRzGVLPNvLZaXnEkRWk4KNVdeREaCs3XHTZUr3jBuKwm1HbXSRt8k4lwfostaJ5azMKUiV20GgSRrwbp8MHwMt03leQHeWJRKmSDnty2PqkbMpg2PsjqdzwU8OY3ExWxsfhIiNGukqyp5aZOqs56p2",
  useCdn: true
});

// gets the location of all boulders
export async function getBoulderNames() {
    const boulders = await client.fetch('*[_type == "boulder"]{name}');
    return (boulders.map(item => item.name));
}

// gets the location of all boulders
export async function getBoulderLocations() {
    const boulders = await client.fetch('*[_type == "boulder"]{location}');
    // get values from dict
    const locations = boulders.map(item => item.location);
    // convert string "X,Y" to {lat:x , lng:y}
    const dictArray = locations.map(coord => {
        const [lat, lng] = coord.split(',').map(Number);
        return { lat, lng };
      });
    return (dictArray);
}

// uploads a boulder to sanity
export async function uploadBoulders(boulder_name, boulder_location) { 
    console.log("Adding a new boulder");
    const identifier = uuidv7();
    const test_boulder = {
        _id: String(identifier),
        _type: 'boulder',
        name: boulder_name,
        location: boulder_location,
      }

    await client.createOrReplace(test_boulder).then((res) => {
        console.log(`Boulder was created, document ID is ${res._id}`)
    })
}