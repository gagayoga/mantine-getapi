import { useQuery } from "@tanstack/react-query";

import { getProduct } from "../query";

const useQueryProdutcts = (skip, options) => {

return useQuery(
    [`get-produccts`, { skip }],
    () => getProduct(skip),{
        ...options
    }
);
}

export {
useQueryProdutcts
}