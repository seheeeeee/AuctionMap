import { markerContents } from "@src/data/markerContents";

const matchZoomToType = (zoom: number): "top" | "mid" | "bot" | "item" => {
    const z = zoom;

    if (z >= 6 && z < 10) return "top";
    if (z >= 10 && z < 13) return "mid";
    if (z >= 13 && z <= 20) return "bot";

    return "item";
};

const fetchData = (zoom: number) => {
    // 기존 api 통신 메서드
    // const response = await axiosInstance.post(`${axiosPath.mapRealPriceAggr}`, params);
    // api 오류 핸들링
    // if (!response.status) {
    //     throw new Error("Problem fetching data");
    // }
    const TYPE = matchZoomToType(zoom);
    const res = markerContents.filter((c) => c.type === TYPE);
    return res;
};
const useGetMarkerContents = (zoom: number) => {
    return fetchData(zoom);
};
export default useGetMarkerContents;
