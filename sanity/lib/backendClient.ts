import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from '../env'

export const backendClient = createClient({
projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_WRITE_TOKEN,
  // token: process.env.SANITY_API_TOKEN,
  stega:{
    studioUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/studio` : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/studio`,
  }
})
