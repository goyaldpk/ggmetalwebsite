/**
 * The ceiling fan components G.G Metal Works makes. Each gets a page at /products/<slug>.
 * Facts come from the company profile deck; descriptions are a first draft for the owner to review
 * (no fixed sizes, prices or certifications are claimed).
 */

export type Product = {
  slug: string;
  name: string;
  /** Callout number on drawings and cards ("01"). */
  item: string;
  /** One line for cards and menus. */
  short: string;
  image: string;
  /** What the part does in a ceiling fan. */
  role: string;
  intro: string;
  features: string[];
  /** Shop-floor operations used to make it. */
  process: string[];
  specs: [label: string, value: string][];
  /** Shown first: our speciality. */
  flagship?: boolean;
};

const CUSTOM = "Made to your drawing or sample";
const QUANTITY = "Small, medium and custom low-volume orders";

export const PRODUCTS: Product[] = [
  {
    slug: "shackle-assembly",
    name: "Shackle (Fan Hanger) Assembly",
    item: "01",
    short: "The hanger that carries the fan from the ceiling hook. Our speciality.",
    image: "/images/shackle-assembly.jpg",
    flagship: true,
    role: "Hangs the fan from the ceiling hook and takes its full weight and vibration.",
    intro:
      "The shackle assembly is the hanger that connects a ceiling fan's down rod to the ceiling hook. Two pressed MS plates hold a rubber bush that cushions vibration, and are joined with bolts, nuts, washers and split pins. It is the part we are best known for: we press the plates, assemble the hardware and pack complete sets ready for your fan assembly line.",
    features: [
      "Pressed MS shackle plates, punched and formed in-house",
      "Rubber bush to damp vibration and noise",
      "Supplied as a complete set with bolts, nuts, washers and split pins",
      "Plate shape, hole sizes and finish to your fan model",
    ],
    process: ["Blanking", "Punching", "Bending", "Assembly"],
    specs: [
      ["Material", "MS steel / HR pickled coil"],
      ["Design", CUSTOM],
      ["Finish", "As per your specification"],
      ["Supplied as", "Complete assembled set"],
      ["Order size", QUANTITY],
    ],
  },
  {
    slug: "safety-wire",
    name: "Safety Wire",
    item: "02",
    short: "A secondary support that keeps the fan up if the main mounting is disturbed.",
    image: "/images/safety-wire.jpg",
    role: "Ties the fan body to the ceiling hook as a second, independent support.",
    intro:
      "The safety wire is a steel wire-rope loop with a pressed clamp that ties the fan to the ceiling hook, independent of the main hanger. If the primary mounting is ever disturbed, the wire holds the fan. We make the clamp on our presses and assemble the wire loop to the length your fan needs.",
    features: [
      "Steel wire-rope loop with a pressed sheet-metal clamp",
      "Clamp, nut and bolt supplied assembled",
      "Loop length to suit your fan and packing",
      "Consistent clamp quality from press tooling",
    ],
    process: ["Blanking", "Punching", "Bending", "Assembly"],
    specs: [
      ["Material", "Steel wire rope, MS clamp"],
      ["Design", CUSTOM],
      ["Length", "As per your fan model"],
      ["Supplied as", "Assembled loop with clamp"],
      ["Order size", QUANTITY],
    ],
  },
  {
    slug: "down-rod",
    name: "Down Rod",
    item: "03",
    short: "The tube that joins the motor to the hanger and sets the fan's drop.",
    image: "/images/down-rods.jpg",
    role: "Connects the motor to the hanger and sets how far the fan hangs below the ceiling.",
    intro:
      "The down rod is the steel tube between the fan motor and the shackle assembly. It sets how far the fan hangs below the ceiling and carries the wiring inside. We cut rods to length and pierce the cross-holes for the hanger and motor pins, in the lengths and finishes your range needs.",
    features: [
      "Cut to the lengths your fan models use",
      "Cross-holes pierced for hanger and motor pins",
      "Clean, deburred ends to protect the wiring",
      "Finish to match your fan range",
    ],
    process: ["Cutting", "Punching"],
    specs: [
      ["Material", "MS steel tube"],
      ["Design", CUSTOM],
      ["Length", "As per your fan model"],
      ["Finish", "As per your specification"],
      ["Order size", QUANTITY],
    ],
  },
  {
    slug: "blade-shanks",
    name: "Blade Shanks",
    item: "04",
    short: "Pressed brackets that hold each blade to the motor.",
    image: "/images/blade-shanks.jpg",
    role: "Holds each blade to the motor at the right angle.",
    intro:
      "Blade shanks (blade brackets) are the pressed arms that fix each blade to the fan motor. They are punched with the slots and hole pattern of your blade, ribbed for stiffness and formed to the blade angle, so every blade sits the same and the fan runs balanced.",
    features: [
      "Hole pattern and slots matched to your blade",
      "Ribs pressed in for stiffness",
      "Formed to your blade angle, part after part",
      "High-volume runs on automatic press feeders",
    ],
    process: ["Blanking", "Punching", "Stamping", "Bending"],
    specs: [
      ["Material", "MS steel / HR pickled coil"],
      ["Design", CUSTOM],
      ["Finish", "As per your specification"],
      ["Order size", QUANTITY],
    ],
  },
];

export const product = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
