import { matchPath, useLocation } from "react-router-dom"


export const useRouteMatch = (route) => {
    const location = useLocation();
return matchPath(location.pathname,route)
}

