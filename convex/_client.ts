import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://doting-magpie-674.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export default convex;
