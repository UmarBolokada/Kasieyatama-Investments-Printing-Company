import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY =defineQuery(
      `*[_type == "product"] | order(name asc)`
    )
    try {
        const products = await sanityFetch({query: ALL_PRODUCTS_QUERY})
        return products.data || []
        
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}

export const getFeaturedProducts = async () => {
    const FEATURED_PRODUCTS_QUERY =defineQuery(
      `*[_type == "product" && featured == true] | order(name asc)`
    )
    try {
        const products = await sanityFetch({query: FEATURED_PRODUCTS_QUERY})
        return products.data || []
        
    } catch (error) {
        console.error("Error fetching featured products:", error)
        return []
    }
}
