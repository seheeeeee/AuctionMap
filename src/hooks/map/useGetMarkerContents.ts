import { markerContents } from "@src/data/markerContents";

const fetchData = () => {
    // 기존 api 통신 메서드
    // const response = await axiosInstance.post(`${axiosPath.mapRealPriceAggr}`, params);
    // api 오류 핸들링
    // if (!response.status) {
    //     throw new Error("Problem fetching data");
    // }

    const response = markerContents;

    return response;
};
const useGetMarkerContents = () => {
    return fetchData();
};
export default useGetMarkerContents;
