import { Park, Species, Achievement } from '../types';

export const PARKS: Park[] = [
  {
    id: 'algonquin',
    name: 'Algonquin Provincial Park',
    location: { lat: 45.5539, lng: -78.3590 },
    region: 'Central',
    lore: "Ontario's oldest provincial park. Local lore tells of the ghost of painter Tom Thomson, who mysteriously disappeared on Canoe Lake in 1917. Campers still report seeing a lone canoeist drifting in the morning mist.",
    features: ['Canoeing', 'Skating Trail', 'Wildlife Viewings'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/1767b701-9609-41fb-beb8-17b87a81fbd5.jpg'
  },
  {
    id: 'killarney',
    name: 'Killarney Provincial Park',
    location: { lat: 46.0125, lng: -81.4053 },
    region: 'Northern',
    lore: "Famous for its white quartzite mountains (the La Cloche range). It was preserved after members of the Group of Seven lobbied the government to protect its 'sapphire lakes' from industrial logging.",
    features: ['Hiking', 'Silver Peak', 'Stargazing'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/1441e8f1-8724-460f-b8f2-a281bcdf7d58.jpg'
  },
  {
    id: 'bon-echo',
    name: 'Bon Echo Provincial Park',
    location: { lat: 44.8966, lng: -77.2081 },
    region: 'Eastern',
    lore: "The massive Mazinaw Rock rises 100 meters above the water and features over 260 Indigenous pictographs, believed to hold ancestral echoes and spiritual power.",
    features: ['Pictographs', 'Camping', 'Mazinaw Rock'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/160d7380-091f-48d1-9311-6644f808e068.jpg'
  },
  {
    id: 'sandbanks',
    name: 'Sandbanks Provincial Park',
    location: { lat: 43.9267, lng: -77.2600 },
    region: 'Eastern',
    lore: "Home to the world's largest bar mouth barrier dune formation. Sailors once called this area the 'Graveyard of Lake Ontario' due to its treacherous shifting sands.",
    features: ['Giant Dunes', 'Swimming', 'Bird migration'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/1db4611a-9048-4e05-85d2-5b0f99a94392.jpg'
  },
  {
    id: 'sleeping-giant',
    name: 'Sleeping Giant Provincial Park',
    location: { lat: 48.3378, lng: -88.8953 },
    region: 'Northern',
    lore: "Ojibway legend says the Giant is Nanabijou, the Spirit of Deep Water, turned to stone when the secret location of a silver mine was betrayed to white traders.",
    features: ['Thunder Bay Lookout', 'Hiking', 'Canyons'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/670dc9b8-11ac-43d9-a57a-5d8a617b74f0.jpg'
  },
  {
    id: 'arrowhead',
    name: 'Arrowhead Provincial Park',
    location: { lat: 45.3900, lng: -79.2100 },
    region: 'Central',
    lore: "Known for its circular 'ice skating trail' through the forest. Glacial processes left behind the distinctive 'Big Bend' lookout over the meandering Big East River.",
    features: ['Ice Skating', 'Big Bend Lookout', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/7667aebd-604b-42c5-9232-f6b642d11cc9.jpg'
  },
  {
    id: 'pinery',
    name: 'Pinery Provincial Park',
    location: { lat: 43.2425, lng: -81.8492 },
    region: 'Southwestern',
    lore: "Protects extremely rare oak savanna habitat. Its sunsets over Lake Huron are ranked among the top ten in the world by National Geographic.",
    features: ['Sunsets', 'Oak Savanna', 'Trails'],
    image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/398787cb-a173-4e4d-b5df-e2778222ff8e.jpg'
  },
  {
    id: 'lake-superior',
    name: 'Lake Superior Provincial Park',
    location: { lat: 47.4589, lng: -84.6622 },
    region: 'Northern',
    lore: "Where the spirits of the Great Lake dwell. Agawa Rock features the famous Mishipeshu (The Great Lynx) pictograph.",
    features: ['Agawa Rock', 'Canoeing', 'Rugged Coast'],
    image: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/95446d58-297a-4c0f-80aa-37198d32a2ca.jpg'
  },
  {
    id: 'frontenac',
    name: 'Frontenac Provincial Park',
    location: { lat: 44.5322, lng: -76.5414 },
    region: 'Eastern',
    lore: "A wilderness oasis in Southern Ontario. Built on the rugged landscape of the Canadian Shield with ruins of old mines.",
    features: ['Backpacking', 'Canoeing', 'Fishing'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/5df10271-3f2b-4fdd-85b3-e563fd2b76cb.jpg'
  },
  {
    id: 'wasaga-beach',
    name: 'Wasaga Beach Provincial Park',
    location: { lat: 44.5267, lng: -80.0150 },
    region: 'Central',
    lore: "The longest freshwater beach in the world. Home to the Nancy Island Historic Site.",
    features: ['Beach', 'Swimming', 'History'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/384ec172-e6d9-40a0-8eca-ea0266b2e373.jpg'
  },
  {
    id: 'arrow-lake',
    name: 'Arrow Lake Provincial Park',
    location: { lat: 48.0500, lng: -90.3000 },
    region: 'Northern',
    lore: "Part of the Boundary Waters, known for its sheer cliffs and deep, clear waters that were used by indigenous groups for millennia.",
    features: ['Fishing', 'Boating', 'Cliffs'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/efb60bc0-85f8-48c1-83bb-753269192413.jpg'
  },
  {
    id: 'awenda',
    name: 'Awenda Provincial Park',
    location: { lat: 44.8300, lng: -79.9700 },
    region: 'Central',
    lore: "Located on the tip of the Penetanguishene Peninsula, Awenda offers incredible views of the Giant's Tomb Island.",
    features: ['Hiking', 'Beaches', 'Geology'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/d2c7e603-626c-4c6f-9e80-67c8c95531f4.jpg'
  },
  {
    id: 'balsam-lake',
    name: 'Balsam Lake Provincial Park',
    location: { lat: 44.6000, lng: -78.8500 },
    region: 'Central',
    lore: "A popular destination along the Trent-Severn Waterway. Famous for its large, clean lake and family-friendly campgrounds.",
    features: ['Boating', 'Swimming', 'Camping'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/55c0d5c1-e41f-421e-8027-4df4f6af767a.jpg'
  },
  {
    id: 'batchawana-bay',
    name: 'Batchawana Bay Provincial Park',
    location: { lat: 46.9000, lng: -84.6000 },
    region: 'Northern',
    lore: "Features the warmest water on Lake Superior. Its name comes from the Ojibwe word for 'bubbling water'.",
    features: ['Warm Water', 'Beach', 'Picnicking'],
    image: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/88a56e9a-18a9-4b59-8b72-50c284efac10.jpg'
  },
  {
    id: 'blue-lake',
    name: 'Blue Lake Provincial Park',
    location: { lat: 49.9200, lng: -93.3000 },
    region: 'Northern',
    lore: "Famous for its crystal clear waters where you can see deep into the lake floor.",
    features: ['Crystal Water', 'Swimming', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/2ee62628-492b-4ba4-939e-2097a1d1ef3a.jpg'
  },
  {
    id: 'bronte-creek',
    name: 'Bronte Creek Provincial Park',
    location: { lat: 43.4000, lng: -79.7700 },
    region: 'Southwestern',
    lore: "An urban oasis with a Victorian farmhouse and a working farm. Known for its massive outdoor pool.",
    features: ['Farm', 'Swimming', 'Nature Trails'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/5b56631a-ccc5-4bb6-843f-26f558ae8492.jpg'
  },
  {
    id: 'charleston-lake',
    name: 'Charleston Lake Provincial Park',
    location: { lat: 44.5000, lng: -75.9800 },
    region: 'Eastern',
    lore: "Home to a rugged landscape shaped by the Frontenac Arch. Incredible views of the 1000 Islands region.",
    features: ['Hiking', 'Vistas', 'Boating'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/70663332-dbea-46b6-a6a1-c24abc12adc0.jpg'
  },
  {
    id: 'darlington',
    name: 'Darlington Provincial Park',
    location: { lat: 43.8700, lng: -78.7800 },
    region: 'Central',
    lore: "A key migration stop for Monarch butterflies and various bird species on the shores of Lake Ontario.",
    features: ['Birding', 'Beach', 'Nature Study'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f01e9325-1538-4ee2-8efd-a210dab0452c.jpg'
  },
  {
    id: 'driftwood',
    name: 'Driftwood Provincial Park',
    location: { lat: 46.1800, lng: -77.8500 },
    region: 'Northern',
    lore: "Named for the wood that washes up from the Ottawa River, a historic highway for the fur trade.",
    features: ['River Views', 'Boating', 'Camping'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/3e968a9f-cfac-4488-8f81-955d882ac8c7.jpg'
  },
  {
    id: 'earl-rowe',
    name: 'Earl Rowe Provincial Park',
    location: { lat: 44.1500, lng: -79.9100 },
    region: 'Central',
    lore: "Features a large man-made lake and a fish ladder where salmon can be seen spawning in the fall.",
    features: ['Fish Ladder', 'Swimming', 'Trails'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/c1ff2035-f1aa-4d86-87f8-588bff8a147c.jpg'
  },
  {
    id: 'emily',
    name: 'Emily Provincial Park',
    location: { lat: 44.3300, lng: -78.4700 },
    region: 'Central',
    lore: "Located in the heart of the Kawarthas on the Pigeon River. A haven for anglers.",
    features: ['Fishing', 'Paddling', 'Family Fun'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/18696988-57fe-4d28-9a37-26c20deea5fa.jpg'
  },
  {
    id: 'ferris',
    name: 'Ferris Provincial Park',
    location: { lat: 44.3000, lng: -77.7800 },
    region: 'Eastern',
    lore: "Famous for the Ranney Gorge Suspension Bridge which hangs 30 feet above the Trent River.",
    features: ['Suspension Bridge', 'River Gorge', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/2ea6b779-9791-4667-b924-b023da0a3141.jpg'
  },
  {
    id: 'french-river',
    name: 'French River Provincial Park',
    location: { lat: 45.9600, lng: -80.6000 },
    region: 'Northern',
    lore: "Canada's first Heritage River, once used by Indigenous peoples and French explorers.",
    features: ['Paddling', 'History', 'Waterfalls'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/4b7d013c-b2cf-499d-a873-c1835ea69bd5.jpg'
  },
  {
    id: 'grundy-lake',
    name: 'Grundy Lake Provincial Park',
    location: { lat: 45.9300, lng: -80.5500 },
    region: 'Northern',
    lore: "Known for its beautiful beaches and smooth granite rocks, perfect for jumping into the water.",
    features: ['Swimming', 'Granite Rocks', 'Canoeing'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/deca86cb-9533-4119-89ba-ae2b94a7182a.jpg'
  },
  {
    id: 'inverhuron',
    name: 'Inverhuron Provincial Park',
    location: { lat: 44.3000, lng: -81.5800 },
    region: 'Southwestern',
    lore: "Protecting ancient sand dunes and early pioneer history. Famous for its spectacular sunsets.",
    features: ['Sunsets', 'Dunes', 'History'],
    image: 'https://images.unsplash.com/photo-1549471013-3364d7220b75?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/5da84b7d-7816-46d4-9d68-664784a83de2.jpg'
  },
  {
    id: 'ivanhoe-lake',
    name: 'Ivanhoe Lake Provincial Park',
    location: { lat: 48.1500, lng: -82.5200 },
    region: 'Northern',
    lore: "A glacial lake with long sandy beaches in the heart of the northern forest.",
    features: ['Sand Beaches', 'Fishing', 'Canoeing'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/1771e0cb-7732-4a8d-b784-639ada35abc4.jpg'
  },
  {
    id: 'kettle-lakes',
    name: 'Kettle Lakes Provincial Park',
    location: { lat: 48.5800, lng: -80.8800 },
    region: 'Northern',
    lore: "Contains 22 deep kettle lakes formed by melting glacial ice blocks thousands of years ago.",
    features: ['Glacial Lakes', 'Biking', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/dbeba223-1ac5-4346-9bd8-8fcd7df33059.jpg'
  },
  {
    id: 'lady-evelyn',
    name: 'Lady Evelyn-Smoothwater Provincial Park',
    location: { lat: 47.3800, lng: -80.5000 },
    region: 'Northern',
    lore: "The highest point in Ontario, Ishpatina Ridge, resides in this true wilderness park.",
    features: ['Wilderness', 'Canoeing', 'Highest Peak'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/0958a6f4-acd4-4ef6-a892-6a5542cb5701.jpg'
  },
  {
    id: 'long-point',
    name: 'Long Point Provincial Park',
    location: { lat: 42.5800, lng: -80.3800 },
    region: 'Southwestern',
    lore: "A UNESCO World Biosphere Reserve and a top destination for bird watchers globally.",
    features: ['Birding', 'UNESCO', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/b84dcb0c-2f3f-4221-af34-9ed065d2a05c.jpg'
  },
  {
    id: 'macgregor-point',
    name: 'MacGregor Point Provincial Park',
    location: { lat: 44.4200, lng: -81.3800 },
    region: 'Southwestern',
    lore: "A unique mix of ecosystems including silver maple swamps and rare fens.",
    features: ['Rare Fens', 'Winter Camping', 'Yurts'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/561f8161-5b83-40f4-b7fd-791eb5290338.jpg'
  },
  {
    id: 'mikisew',
    name: 'Mikisew Provincial Park',
    location: { lat: 45.7800, lng: -79.2800 },
    region: 'Central',
    lore: "Located on Eagle Lake, it offers a peaceful retreat for families and hikers.",
    features: ['Disc Golf', 'Paddling', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/17855186-73a6-4951-a25f-c077d6e9ad66.jpg'
  },
  {
    id: 'murphys-point',
    name: 'Murphys Point Provincial Park',
    location: { lat: 44.7800, lng: -76.2500 },
    region: 'Eastern',
    lore: "Includes the historic Silver Queen Mine and represents the unique Arch of the Canadian Shield.",
    features: ['Historic Mine', 'Shield Landscape', 'Canoeing'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/4fe943ed-7b53-4070-8d5e-af2c23fbd9f8.jpg'
  },
  {
    id: 'neys',
    name: 'Neys Provincial Park',
    location: { lat: 48.7800, lng: -86.5800 },
    region: 'Northern',
    lore: "Features a desolate beach that reminds many of a cold-water version of the tropics.",
    features: ['Dramatic Coast', 'Prisoner of War Camp', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/2de07e7f-9bf8-4702-9df0-526551c1ec68.jpg'
  },
  {
    id: 'ouimet-canyon',
    name: 'Ouimet Canyon Provincial Park',
    location: { lat: 48.7800, lng: -88.5200 },
    region: 'Northern',
    lore: "A massive gorge 100 meters deep and 150 meters wide with rare arctic plants at the bottom.",
    features: ['Deep Gorge', 'Rare Plants', 'Views'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/28b17eb8-94f7-447c-aeeb-264a2c2415d1.jpg'
  },
  {
    id: 'pancake-bay',
    name: 'Pancake Bay Provincial Park',
    location: { lat: 46.9600, lng: -84.7000 },
    region: 'Northern',
    lore: "Named by Voyageurs who stopped here to make pancakes before the long stretch across the lake.",
    features: ['Sand Beach', 'Voyageur History', 'Superior Views'],
    image: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/610131cf-1b90-4be5-b091-b7be3daa0bd6.jpg'
  },
  {
    id: 'point-farms',
    name: 'Point Farms Provincial Park',
    location: { lat: 43.8000, lng: -81.7100 },
    region: 'Southwestern',
    lore: "Occupies the site of a once-famous resort hotel from the late 1800s.",
    features: ['History', 'Beach', 'Camping'],
    image: 'https://images.unsplash.com/photo-1549471013-3364d7220b75?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/33d9698e-500b-4792-8d76-72b3b564b67e.jpg'
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear Provincial Park',
    location: { lat: 55.0000, lng: -84.0000 },
    region: 'Northern',
    lore: "Ontario's largest park, protecting the southern-most polar bear population in the world.",
    features: ['Polar Bears', 'Arctic Tundra', 'Remote'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/7179a611-6cad-47e2-89b4-36a83602f068.jpg'
  },
  {
    id: 'port-burwell',
    name: 'Port Burwell Provincial Park',
    location: { lat: 42.6500, lng: -80.8200 },
    region: 'Southwestern',
    lore: "Known as the 'Jewel of Erie's North Shore' for its long, clean beaches.",
    features: ['Beaches', 'Birding', 'Historical Lighthouse'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/ae3ca3df-481f-490d-a387-12054c2b6577.jpg'
  },
  {
    id: 'rainbow-falls',
    name: 'Rainbow Falls Provincial Park',
    location: { lat: 48.8300, lng: -87.2000 },
    region: 'Northern',
    lore: "Features a beautiful series of cascading falls on the Whitesand River.",
    features: ['Waterfalls', 'Hiking', 'Canoeing'],
    image: 'https://images.unsplash.com/photo-1433086566280-608af70d3c14?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/eae63265-84ff-4614-91c0-9a9f7b5f9347.jpg'
  },
  {
    id: 'rock-point',
    name: 'Rock Point Provincial Park',
    location: { lat: 42.8500, lng: -79.5200 },
    region: 'Southwestern',
    lore: "Famous for its 350-million-year-old limestone fossils embedded in the rock shelf.",
    features: ['Fossils', 'Beach', 'Birding'],
    image: 'https://images.unsplash.com/photo-1549471013-3364d7220b75?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/e3dff5e0-4ea0-4ced-850f-92a0041621e3.jpg'
  },
  {
    id: 'samuel-champlain',
    name: 'Samuel de Champlain Provincial Park',
    location: { lat: 46.3000, lng: -78.8800 },
    region: 'Northern',
    lore: "Relive history at the Mattawa River Visitor Centre with voyageur displays.",
    features: ['Mattawa River', 'History', 'Voyageur Canoes'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/c13ea3ea-493b-4791-b226-bd687271f2ec.jpg'
  },
  {
    id: 'sauble-falls',
    name: 'Sauble Falls Provincial Park',
    location: { lat: 44.7800, lng: -81.2700 },
    region: 'Southwestern',
    lore: "The falls are a historic staircase for spawning salmon and trout.",
    features: ['Waterfalls', 'Paddling', 'Spawning Runs'],
    image: 'https://images.unsplash.com/photo-1433086566280-608af70d3c14?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/35e5fbf3-accb-49c1-834f-07cad767eb72.jpg'
  },
  {
    id: 'selkirk',
    name: 'Selkirk Provincial Park',
    location: { lat: 42.8000, lng: -79.8800 },
    region: 'Southwestern',
    lore: "A quiet park with a marsh boardwalk and peaceful campgrounds.",
    features: ['Boardwalk', 'Birding', 'Relaxation'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/3184e927-9449-4a6a-9f39-23d9c55ae433.jpg'
  },
  {
    id: 'sharbot-lake',
    name: 'Sharbot Lake Provincial Park',
    location: { lat: 44.7700, lng: -76.6800 },
    region: 'Eastern',
    lore: "Features two beautiful lakes: Sharbot and Black Lake, known for great fishing.",
    features: ['Fishing', 'Swimming', 'Camping'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/c911ef58-3060-494b-ab98-0b29aeec2b3e.jpg'
  },
  {
    id: 'sibbald-point',
    name: 'Sibbald Point Provincial Park',
    location: { lat: 44.3300, lng: -79.3300 },
    region: 'Central',
    lore: "A massive, popular park with a rich history centered around the Sibbald family manor.",
    features: ['Large Beach', 'Historic Manor', 'Museum'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/cd4f92c9-8b7b-42ff-9d61-4d9921533992.jpg'
  },
  {
    id: 'silent-lake',
    name: 'Silent Lake Provincial Park',
    location: { lat: 44.9200, lng: -78.0500 },
    region: 'Eastern',
    lore: "True to its name, motorboats are prohibited to preserve the lake's quiet beauty.",
    features: ['Quietude', 'Hiking', 'Canoeing'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/a6459392-75d8-4f81-8748-07cad767eb72.jpg'
  },
  {
    id: 'silver-lake',
    name: 'Silver Lake Provincial Park',
    location: { lat: 44.8300, lng: -76.6000 },
    region: 'Eastern',
    lore: "A picturesque destination with clear waters and family-oriented programming.",
    features: ['Swimming', 'Picnicking', 'Family Travel'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/7092eb44-28c8-4739-ae92-649c8d05a52e.jpg'
  },
  {
    id: 'six-mile-lake',
    name: 'Six Mile Lake Provincial Park',
    location: { lat: 44.8800, lng: -79.7500 },
    region: 'Central',
    lore: "Inspired many Group of Seven painters with its iconic windswept pines.",
    features: ['Art History', 'Swimming', 'Fishing'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/0c5ab352-fc00-4241-b485-e0cd7f751c43.jpg'
  },
  {
    id: 'turkey-point',
    name: 'Turkey Point Provincial Park',
    location: { lat: 42.7000, lng: -80.3300 },
    region: 'Southwestern',
    lore: "The only provincial park with a golf course and a nearby village atmosphere.",
    features: ['Golfing', 'Beaches', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1549471013-3364d7220b75?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f1edb357-bc48-40db-9cdf-e2e5baa089f3.jpg'
  },
  {
    id: 'windy-lake',
    name: 'Windy Lake Provincial Park',
    location: { lat: 46.6000, lng: -81.4500 },
    region: 'Northern',
    lore: "A destination for all seasons, with exceptional cross-country skiing in winter.",
    features: ['Skiing', 'Beaches', 'Fishing'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/d6c2a9d2-2d71-434c-aade-1510da0f92ed.jpg'
  },
  {
    id: 'kakabeka-falls',
    name: 'Kakabeka Falls Provincial Park',
    location: { lat: 48.4015, lng: -89.4735 },
    region: 'Northern',
    lore: "Known as the 'Niagara of the North'. Local legend tells of Princess Green Mantle, who sacrificed herself to lead Sioux invaders over the falls to save her people.",
    features: ['Waterfall', 'Hiking', 'History'],
    image: 'https://images.unsplash.com/photo-1433086566280-608af70d3c14?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f19945c8-5060-4243-9c0d-6a18eb2904af.jpg'
  },
  {
    id: 'halfway-lake',
    name: 'Halfway Lake Provincial Park',
    location: { lat: 46.9000, lng: -81.6500 },
    region: 'Northern',
    lore: "Offers a spectacular view from the Antrim Mountain lookout, showing a landscape carved by ancient glaciers and more recent meteor impacts.",
    features: ['Lookouts', 'Canoeing', 'Glacial Lakes'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/e8a16902-d1ac-4454-bf78-22aaeacbd30b.jpg'
  },
  {
    id: 'restoule',
    name: 'Restoule Provincial Park',
    location: { lat: 46.0300, lng: -79.7800 },
    region: 'Central',
    lore: "Famous for the Fire Tower Trail which climbs to the top of the Stormy Lake Bluffs for a breathtaking 100-meter drop view.",
    features: ['Bluffs', 'Fire Tower', 'Mountain Biking'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/d99262be-5252-4305-b7f5-54fdca17b9c0.jpg'
  },
  {
    id: 'voyageur',
    name: 'Voyageur Provincial Park',
    location: { lat: 45.5500, lng: -74.3800 },
    region: 'Eastern',
    lore: "Located on the banks of the Ottawa River, this park sits on the historic water highway used by the fur-trading Voyageurs.",
    features: ['Beaches', 'Boating', 'River Trails'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f99e0dfe-ed8c-4060-a053-ba72267d5e15.jpg'
  },
  {
    id: 'massasauga',
    name: 'The Massasauga Provincial Park',
    location: { lat: 45.1800, lng: -79.9700 },
    region: 'Central',
    lore: "Protects a large area of 'lake and land' in Georgian Bay, named after the rare Massasauga rattlesnake that calls this rocky terrain home.",
    features: ['Boat-in Camping', 'Angling', 'Rattlesnakes'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/11da0b3d-5df1-4284-aeae-14a7ab9beb3e.jpg'
  },
  {
    id: 'kawartha-highlands',
    name: 'Kawartha Highlands Provincial Park',
    location: { lat: 44.6900, lng: -78.2200 },
    region: 'Central',
    lore: "The largest park in Southern Ontario after Algonquin. It offers a rugged, semi-wilderness experience just a few hours from the city.",
    features: ['Backcountry', 'Fishing', 'Dark Skies'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/cbbb4aed-65f4-479b-8d6d-a55114e9b0b8.jpg'
  },
  {
    id: 'white-lake',
    name: 'White Lake Provincial Park',
    location: { lat: 48.9800, lng: -85.6000 },
    region: 'Northern',
    lore: "Located in the Great Lakes-St. Lawrence Transition Forest, this park features a mix of southern and northern tree species.",
    features: ['Wildlife', 'Sandy Beaches', 'Nature Trails'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/598bf8e8-f960-449c-b20f-8696218b4f68.jpg'
  },
  {
    id: 'north-beach',
    name: 'North Beach Provincial Park',
    location: { lat: 43.9800, lng: -77.4500 },
    region: 'Eastern',
    lore: "A quiet alternative to Sandbanks, offering a narrow strip of sand between Lake Ontario and North Bay.",
    features: ['Swimming', 'Picnics', 'Sunset Views'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f08e9af1-b74c-4aaa-8aa2-5055805759b4.jpg'
  },
  {
    id: 'fitzroy',
    name: 'Fitzroy Provincial Park',
    location: { lat: 45.4800, lng: -76.2200 },
    region: 'Eastern',
    lore: "Situated at the junction of the Carp and Ottawa rivers, Fitzroy contains a century-old white pine forest.",
    features: ['Carp River', 'Beaches', 'Ancient Pines'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/8123b0e9-e5fa-462e-a570-ff3cf37fbc37.jpg'
  },
  {
    id: 'finlayson-point',
    name: 'Finlayson Point Provincial Park',
    location: { lat: 47.0500, lng: -79.8000 },
    region: 'Northern',
    lore: "The gateway to the Temagami wilderness, offering a base for canoeists and those seeking massive red and white pines.",
    features: ['Temagami Gate', 'Pines', 'Canoe Base'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/265ada83-c874-4d52-9d31-362269c5c264.jpg'
  },
  {
    id: 'marten-river',
    name: 'Marten River Provincial Park',
    location: { lat: 46.7500, lng: -79.8000 },
    region: 'Northern',
    lore: "Features a replica of a 19th-century logging camp, complete with a museum and blacksmith shop.",
    features: ['Logging History', 'Museum', 'Fishing'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/53613f28-8fab-434b-ae33-65730e582ce0.jpg'
  },
  {
    id: 'rene-brunelle',
    name: 'René Brunelle Provincial Park',
    location: { lat: 49.4500, lng: -82.1200 },
    region: 'Northern',
    lore: "Named after a former Ontario Cabinet Minister, this park honors the rich pioneer spirit of the Kapuskasing area.",
    features: ['Remich Lake', 'Biking', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/6e61a66e-931e-4ade-86e5-3363364f9b88.jpg'
  },
  {
    id: 'greenwater',
    name: 'Greenwater Provincial Park',
    location: { lat: 49.0000, lng: -81.2500 },
    region: 'Northern',
    lore: "Features a collection of clear, deep lakes situated on a massive glacial esker formed over 10,000 years ago.",
    features: ['Esker', 'Kettle Lakes', 'Clarity'],
    image: 'https://images.unsplash.com/photo-1543831615-5858079ed3a5?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/2e606a6c-936c-4ade-86e5-3363364f9b88.jpg'
  },
  {
    id: 'fushimi-lake',
    name: 'Fushimi Lake Provincial Park',
    location: { lat: 49.8800, lng: -83.9000 },
    region: 'Northern',
    lore: "A true northern escape with a deep, productive lake and dense forests of black spruce and jack pine.",
    features: ['Remote', 'Fishing', 'Spruce Forest'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/f3661a6d-931e-4ade-86e5-3363364f9b88.jpg'
  },
  {
    id: 'nagagamisis',
    name: 'Nagagamisis Provincial Park',
    location: { lat: 49.4800, lng: -84.6500 },
    region: 'Northern',
    lore: "Its name means 'lake with fine sandy shores' in Cree, referring to the beautiful beaches that wrap around the lake.",
    features: ['Cree History', 'Sand Beaches', 'Boating'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    sticker: 'https://reservations.ontarioparks.ca/images/8a61a66e-931e-4ade-86e5-3363364f9b88.jpg'
  }
];



export const SPECIES: Species[] = [
  {
    id: 'moose',
    name: 'North American Moose',
    scientificName: 'Alces alces',
    type: 'Animal',
    description: "The largest member of the deer family. Found throughout Ontario's boreal forest.",
    habitat: ['Wetlands', 'Boreal Forest', 'Lakeshores'],
    funFact: "Moose are surprisingly good swimmers and can dive up to 5 meters deep for aquatic plants."
  },
  {
    id: 'loon',
    name: 'Common Loon',
    scientificName: 'Gavia immer',
    type: 'Bird',
    description: "Ontario's provincial bird. Known for its haunting, melodic calls echoing across north woods lakes.",
    habitat: ['Lakes', 'Rivers'],
    funFact: "Loons are clumsy on land because their legs are placed far back on their bodies, making them exceptional divers but poor walkers."
  },
  {
    id: 'trillium',
    name: 'White Trillium',
    scientificName: 'Trillium grandiflorum',
    type: 'Plant',
    description: "The official flower of Ontario. Blooms in early spring in deciduous forests.",
    habitat: ['Deciduous Forest', 'Woodlands'],
    funFact: "It is widely believed to be illegal to pick trilliums in Ontario; while it's generally discouraged, the 'illegal' part is mostly an urban legend (though it is illegal in provincial parks!)."
  },
  {
    id: 'black-bear',
    name: 'American Black Bear',
    scientificName: 'Ursus americanus',
    type: 'Animal',
    description: "Found in forest habitats across much of Ontario.",
    habitat: ['Dense Forest', 'Lowlands'],
    funFact: "Black bears are not always black; they can also be brown, cinnamon, or even blonde."
  },
  {
    id: 'sandhill-crane',
    name: 'Sandhill Crane',
    scientificName: 'Antigone canadensis',
    type: 'Bird',
    description: "Large, tall birds with long necks and legs. Known for their bugling calls and elaborate dances.",
    habitat: ['Wetlands', 'Fields', 'Marshes'],
    funFact: "Sandhill Cranes are among the oldest living bird species, with fossils dating back over 2.5 million years."
  },
  {
    id: 'pitcher-plant',
    name: 'Purple Pitcher Plant',
    scientificName: 'Sarracenia purpurea',
    type: 'Plant',
    description: "Ontario's official provincial floral emblem is the Trillium, but the Pitcher Plant is a unique carnivorous plant found in bogs.",
    habitat: ['Bogs', 'Fens', 'Peatlands'],
    funFact: "The pitcher plant 'eats' insects by trapping them in its reservoir of digestive enzymes and water."
  },
  {
    id: 'snapping-turtle',
    name: 'Common Snapping Turtle',
    scientificName: 'Chelydra serpentina',
    type: 'Animal',
    description: "Ontario's largest freshwater turtle, recognized by its large size and prehistoric appearance.",
    habitat: ['Lakes', 'Ponds', 'Slow Streams'],
    funFact: "Snapping turtles rarely snap while in the water; they are much more defensive when they are on land to lay eggs."
  }
];


export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pioneer',
    title: 'Park Pioneer',
    description: 'Visit your first provincial park.',
    icon: 'MapPin',
    requirementType: 'visit_count',
    requirementValue: 1
  },
  {
    id: 'explorer',
    title: 'Ontario Explorer',
    description: 'Visit 5 different provincial parks.',
    icon: 'Compass',
    requirementType: 'visit_count',
    requirementValue: 5
  },
  {
    id: 'naturalist',
    title: 'Budding Naturalist',
    description: 'Log 3 different species sightings.',
    icon: 'Flower2',
    requirementType: 'species_log',
    requirementValue: 3
  },
  {
    id: 'athlete',
    title: 'Park Athlete',
    description: 'Connect your Strava account.',
    icon: 'Activity',
    requirementType: 'strava_connected',
    requirementValue: 1
  }
];
