import { Article } from "../interfaces/Article";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { MongoClient, Db, Document, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/gestion-stock";
const client = new MongoClient(uri);
let database: Db;

const convert = (d: Document) => {
  const result = { ...d };
  result.id = result._id;
  delete result._id;
  return result;
};

async function run() {
  try {
    await client.connect();
    database = client.db();
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();
let articles: Article[] = [];
export class MongoArticleService {
  async retrieveAll() {
    const documents = await database.collection("article").find({}).toArray();
    const articles = documents.map((d) => convert(d));
    return articles;
  }

  async add(article: Article) {
    const result = await database.collection("article").insertOne(article);
    return article;
  }
  async delete(ids: string[]) {
    const obj = ids.map((id) => new ObjectId(id));
    await database.collection("article").deleteMany({ _id: { $in: obj } });
  }
}
