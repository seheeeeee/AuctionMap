// 마커에 표시될 데이터
// type - top: 시/도, mid: 시/군/구, bot: 동/읍/면, item: 매물마커, low: 다중 매물마커, multi: 매물-실거래 둘다, real: 실거래마커, realDetail: 실거래 큰마커
interface MarkerContentsType {
    type: "top" | "mid" | "bot" | "item" | "low" | "multi" | "real" | "realDetail";
    displayName: string;
    count: number;
    item?: any;
    isSearch?: boolean;
    real: null | any;
    markerType: "product" | "real";
    lng: number;
    lat: number;
    zoom: number;
    moveType: "zoom" | "list";
}
export type { MarkerContentsType };
