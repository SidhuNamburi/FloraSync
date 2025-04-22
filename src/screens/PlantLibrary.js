import React from 'react';
import ContainerPlants from '../Mycomponents/ContainerPlants';
import './PlantLibrary.css';
import Loginnav from '../Mycomponents/Loginnav';
import Footer from '../Mycomponents/Footer';

const plantData = [{
    "name": "Aloe Vera",
    "species": "Aloe barbadensis miller",
    "description": "Succulent plant valued for its medicinal gel; thrives in well-drained soil and minimal watering.",
    "light": "Bright indirect",
    "water": "When dry",
    "temp": "10-30°C",
    "humidity": "Low",
    "image": "https://media.istockphoto.com/id/1032762284/photo/close-up-of-potted-plant-against-white-background.jpg?s=1024x1024&w=is&k=20&c=v2-r-BBvlHKR4H298kVqSsuGRAipDpPlTnY741DCPVw="
  },
  {
    "name": "Boston Fern",
    "species": "Nephrolepis exaltata",
    "description": "Lush green plant known for its air-purifying qualities; thrives in humidity and indirect light.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "16-24°C",
    "humidity": "High",
    "image": "https://cdn-bpngn.nitrocdn.com/NPPRYobpxQtZYTbcOMeEnnbvtFJRzsGC/assets/images/optimized/rev-c5051cc/hicksnurseries.com/wp-content/uploads/2023/07/boston-fern-hanging-basket-124959-1.jpg"
  },
  {
    "name": "Calathea",
    "species": "Calathea spp.",
    "description": "Decorative plant with striking patterned foliage; thrives in moist soil and high humidity.",
    "light": "Medium",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "High",
    "image": "https://wildroots.in/wp-content/uploads/2022/09/makoyana.jpg"
  },
  {
    "_id": {
      "$oid": "6804c4a0b62503740818bab3"
    },
    "name": "Chinese Evergreen",
    "species": "Aglaonema",
    "description": "Low-maintenance indoor plant admired for its tolerance to low light and air-purifying abilities.",
    "light": "Low",
    "water": "When dry",
    "temp": "16-28°C",
    "humidity": "Medium",
    "image": "https://www.gardendesign.com/pictures/images/900x705Max/site_3/igneous-timeless-tides-chinese-evergreen-aglaonema-commutatum-proven-winners_19182.jpg"
  },
  {
    "name": "Dumb Cane",
    "species": "Dieffenbachia",
    "description": "Tropical plant with large, variegated leaves; easy to grow and ideal for low to medium light spaces.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-27°C",
    "humidity": "Medium",
    "image": "https://abeautifulmess.com/wp-content/uploads/2024/08/Dieffenbachia-Dumb-Cane-Plant-grow-care-1-4.jpg"
  },
  {
    "name": "Dragon Tree",
    "species": "Dracaena marginata",
    "description": "A striking architectural plant with long, narrow leaves that adds visual interest to indoor spaces. Known for its air-purifying properties.",
    "light": "Bright indirect",
    "water": "When dry",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://wildroots.in/wp-content/uploads/2021/02/Untitled-design.png"
  },
  {
    "name": "Fiddle Leaf Fig",
    "species": "Ficus lyrata",
    "description": "A large indoor plant known for its bold, glossy leaves, making it a striking addition to interior décor. It can live for 10-15 years indoors with proper care.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://www.thespruce.com/thmb/lqtFsKArHjDEugR06R3k1EZHs58=/6590x0/filters:no_upscale():max_bytes(150000):strip_icc()/grow-fiddle-leaf-fig-indoors-1902756-hero-feca31e64e91430794e2bdcc9fa1e901.jpg"
  },
  {
    "name": "Jade Plant",
    "species": "Crassula ovata",
    "description": "A hardy succulent known for its longevity (20-70 years with good care). It thrives with minimal attention, making it perfect for beginners. It's also considered a symbol of good luck in Feng Shui.",
    "light": "Bright indirect",
    "water": "When dry",
    "temp": "18-24°C",
    "humidity": "Low",
    "image": "https://www.thespruce.com/thmb/izqNHmuleSqh4UnpcU31SaTpJCs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1159195421-ce4cac54f9324302880894a9b0f0bf2b.jpg"
  },
  {
    "name": "Monstera",
    "species": "Monstera deliciosa",
    "description": "Monstera deliciosa is a tropical plant known for its large, split leaves. It thrives in bright, indirect light and can live for many years with proper care. It is a popular choice for adding a tropical aesthetic to indoor spaces.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://plantura.garden/uk/wp-content/uploads/sites/2/2021/07/monstera-species.jpg"
  },
  {
    "name": "Parlor Palm",
    "species": "Chamaedorea elegans",
    "description": "The Parlor Palm is a popular indoor plant known for its graceful, feathery leaves. It thrives in low to bright indirect light, making it an excellent choice for indoor spaces. It is also known for its air-purifying qualities.",
    "light": "Bright indirect",
    "water": "Bi-weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://i0.wp.com/nycplantdoctor.com/wp-content/uploads/2021/05/chamaedorea_elegans_02_pluume321_wikimedia.jpg?resize=640%2C960&ssl=1"
  },
  {
    "name": "Peace Lily",
    "species": "Spathiphyllum",
    "description": "The Peace Lily is an attractive, air-purifying plant known for its white blooms. It thrives in low to medium indirect light and requires consistent moisture. With proper care, it can improve indoor air quality and add beauty to your space.",
    "light": "Low",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "High",
    "image": "https://www.poison.org/-/media/images/shared/articles/peace-lily-223.jpg"
  },
  {
    "name": "Peperomia",
    "species": "Peperomia spp.",
    "description": "Peperomia is a compact plant with a wide variety of foliage types. Known for being low maintenance, it's a great choice for small spaces and can thrive with minimal care. It is non-toxic and pet-safe, making it ideal for households with animals.",
    "light": "Medium",
    "water": "Bi-weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://gardenerspath.com/wp-content/uploads/2021/11/Peperomia-Plant-Growing-in-a-Small-Pot.jpg"
  },
  {
    "name": "Philodendron",
    "species": "Philodendron spp",
    "description": "Philodendrons are popular houseplants known for their attractive, glossy foliage and air-purifying qualities. With proper care, they can live for 5-10 years or longer.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ0aWUqf3yUN6JOowsuQqvb2y400Mco8o1A&s"
  },
  {
    "name": "Polka Dot Plant",
    "species": "Hypoestes phyllostachya",
    "description": "The Polka Dot Plant is known for its vibrant, speckled leaves that come in pink, white, or red patterns. It typically has a lifespan of 2–5 years, often grown as an annual or replaced yearly.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Polka-Dot-Plant-1200x1200.jpg"
  },
  {
    "name": "Ponytail Palm",
    "species": "Beaucarnea recurvata",
    "description": "The Ponytail Palm is a long-living, low-maintenance houseplant with a distinctive swollen trunk that stores water and thin, arching leaves. It can live 50–100 years with proper care and is ideal for sunny indoor spots.",
    "light": "Bright indirect",
    "water": "Bi-weekly",
    "temp": "18-26°C",
    "humidity": "Low",
    "image": "https://m.media-amazon.com/images/I/816+kJGpuJL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "name": "Pothos",
    "species": "Epipremnum aureum",
    "description": "Pothos is a popular and resilient houseplant known for its trailing vines and heart-shaped leaves. It is easy to care for, purifies indoor air, and adapts well to a variety of indoor environments. With regular pruning and proper care, it can live well beyond 10 years.",
    "light": "Low",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://cdn.britannica.com/70/176570-050-4D6D0936/Pothos-houseplant.jpg"
  },
  {
    "name": "Prayer Plant",
    "species": "Maranta leuconeura",
    "description": "The Prayer Plant is known for its stunning, patterned leaves that fold up at night like praying hands. It thrives in high humidity and indirect light, making it an excellent choice for indoor plant lovers. With proper care, it can live well over 5 years and brings vibrant color and movement to any space.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "High",
    "image": "https://img.freepik.com/free-photo/african-mask-plant-white-pot_53876-133130.jpg?semt=ais_hybrid&w=740"
  },
  {
    "name": "Rubber Plant",
    "species": "Ficus elastica",
    "description": "The Rubber Plant is a popular indoor tree with thick, glossy leaves that add a bold, modern touch to interiors. It's known for its air-purifying qualities and low-maintenance nature. With consistent care and the right environment, it can thrive indoors for many years.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "Medium",
    "image": "https://m.media-amazon.com/images/I/719Y8AtenqL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "name": "Snake Plant",
    "species": "Sansevieria trifasciata",
    "description": "The Snake Plant is a hardy, low-maintenance houseplant known for its tall, upright leaves with green banding. It is extremely drought-tolerant and acts as a natural air purifier, removing toxins such as formaldehyde and benzene from the air. Ideal for beginners and busy plant owners.",
    "light": "Bright indirect",
    "water": "When dry",
    "temp": "15-29°C",
    "humidity": "Low",
    "image": "https://lucknownursery.com/wp-content/uploads/2021/08/Lucknow-Nursery-Sansevieria-Trifasciata-Snake-Plant.jpg"
  },
  {
    "name": "Spider Plant",
    "species": "Chlorophytum comosum",
    "description": "The Spider Plant is a resilient and adaptable houseplant known for its arching green-and-white striped leaves and baby plant offshoots ('spiderettes'). It’s easy to grow, air-purifying, and safe for pets, making it a popular choice for both beginner and experienced plant owners.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "16-27°C",
    "humidity": "Medium",
    "image": "https://plantshub.in/wp-content/uploads/2023/06/5b59a7f8-e644-477e-99b4-8fd8f0e24ebb-jpg.webp"
  },
  {
    "name": "Zebra Plant",
    "species": "Aphelandra squarrosa",
    "description": "The Zebra Plant is admired for its striking dark green leaves with bold white veins and the occasional bright yellow flower. It requires high humidity and consistently moist soil to thrive indoors. Sensitive to temperature fluctuations, it benefits from regular misting and protection from cold drafts.",
    "light": "Bright indirect",
    "water": "Weekly",
    "temp": "18-24°C",
    "humidity": "High",
    "image": "https://www.picturethisai.com/image-handle/website_cmsname/image/1080/154131966680104993.jpeg?x-oss-process=image/format,webp/resize,s_300&v=1.0"
  },
  {
    "name": "Croton",
    "species": "Codiaeum variegatum",
    "description": "Vibrant, tropical plant with colorful foliage; known for its striking patterns and bold colors.",
    "light": "Bright indirect",
    "water": "When dry",
    "temp": "18-26°C",
    "humidity": "High",
    "image": "https://www.shutterstock.com/shutterstock/photos/1831979071/display_1500/stock-photo-croton-ornamental-plant-in-the-pot-on-white-background-botanical-name-is-codiaeum-variegatum-1831979071.jpg"
  }];

const PlantLibrary = () => {
  return (
    <div className="library-container">
      <Loginnav />
      <div className="plant-library">
        <h1 className="library-title">Plant Library</h1>
        <p className="library-subtitle">Discover our collection of beautiful plants</p>
        
        <div className="plants-grid">
          {plantData.map((plant, index) => (
            <ContainerPlants key={index} {...plant} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlantLibrary;