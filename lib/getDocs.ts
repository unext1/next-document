import { connect } from "@planetscale/database";

import { config } from "../db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents } from "../db/schema";

export default async function GetAllDocs() {
  const con = connect(config);
  const db = drizzle(con);

  const docs = await db.select().from(documents);

  return docs;
}
