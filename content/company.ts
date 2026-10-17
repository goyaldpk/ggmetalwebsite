/** Company copy shared by several pages (from the company profile deck, lightly edited for the web). */

export const MISSION =
  "To provide high-quality sheet metal components tailored to client needs, delivered on time and within budget.";

export const VALUES: [title: string, text: string][] = [
  ["Quality", "Precision in every component."],
  ["Reliability", "Consistent delivery and client trust."],
  ["Innovation", "Adapting to client requirements with modern techniques."],
  ["Customer-centric", "Building long-term partnerships."],
];

export const WHY_US: [title: string, text: string][] = [
  ["Experience", "In sheet metal manufacturing since 1995, with ceiling fan components as our speciality."],
  ["Quality assurance", "Strict quality control at every stage, so the components you receive are defect-free."],
  ["Cost-effective", "Competitive pricing for small and medium-sized orders."],
  ["Flexibility", "We take on custom parts and low-volume orders, not just long runs."],
  ["Timely delivery", "Streamlined processes to meet tight production deadlines."],
];

/** Shop-floor operations (deck: "Current capabilities"). */
export const OPERATIONS: [title: string, text: string][] = [
  ["Cutting", "Coil and strip cut to size, and tubes cut to length."],
  ["Punching", "Holes, slots and cross-holes pierced on power presses."],
  ["Stamping", "Blanks and ribs pressed with in-house maintained tooling."],
  ["Bending", "Plates and brackets formed to the angle on your drawing."],
];

/** From coil to crate: how a part moves through the shop. */
export const ROUTE: [title: string, text: string][] = [
  ["Uncoil", "MS / HR pickled coil is loaded on the uncoiler."],
  ["Feed", "Automatic feeders index the strip into the press."],
  ["Press", "Blanking, punching and stamping on 10 – 75 tonne power presses."],
  ["Form", "Parts are bent and formed to the drawing."],
  ["Assemble", "Hardware fitted where the part ships as a set."],
  ["Inspect & pack", "Checked against the drawing and packed in crates for dispatch."],
];

export const MACHINES: [name: string, detail: string][] = [
  ["Power presses", "10 – 75 tonnes"],
  ["Automatic press feeders", "Steady, repeatable strip feeding"],
  ["Uncoiler", "Direct feeding from coil"],
  ["Tool grinders", "In-house tool sharpening and maintenance"],
];

export const MATERIALS = ["MS steel", "HR pickled coils"];

export const FAQ: [question: string, answer: string][] = [
  ["Can you make a part to our drawing or sample?",
    "Yes. Send us a drawing or a sample with the material, finish and quantity you need, and we will tell you what it takes to make it."],
  ["Do you take small or trial orders?",
    "Yes. We are set up for small and medium-sized orders and can handle custom and low-volume runs, as well as regular monthly supply."],
  ["Which materials do you work with?",
    "Mainly MS steel and HR pickled coils. If your part needs something else, ask us."],
  ["Do you make anything other than fan components?",
    "Ceiling fan components are our speciality, but our presses (10 – 75 tonnes) cut, punch, stamp and bend all kinds of sheet metal parts. Tell us what you need."],
  ["How do I get a quotation?",
    "Use the quote form, call or WhatsApp us. A drawing or photo, the quantity and the finish are enough to start."],
];
