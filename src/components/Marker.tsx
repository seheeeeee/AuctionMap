import React from "react";
interface MarkerProps {
    type: "top" | "mid" | "bot" | "item" | "low" | "multi" | "real" | "realDetail";
    displayName: string;
    count: number;
    item?: any;
    isSearch?: boolean;
    real: null | any;
    markerType: "product" | "real";
}
const matchBidType = (type: 1 | 2 | 3 | 4 | 5) => {
    let bidType;
    switch (type) {
        case 1:
            bidType = "경매";
            break;
        case 2:
            bidType = "공매";
            break;
        case 3:
            bidType = "공매임대";
            break;
        case 4:
            bidType = "지분경매";
            break;
        case 5:
            bidType = "지분공매";
            break;
    }
    return bidType;
};

const Marker = ({ type, displayName, count, item, isSearch = false, real, markerType }: MarkerProps) => {
    const bidType = matchBidType(item?.bid_type_detail);

    const squareText = `${item?.square}평`;
    if (type === "top") {
        return (
            <div className="top marker_clu">
                <p className="marker_clu_region">{displayName}</p>
                <p className="marker_clu_count">{count}건</p>
            </div>
        );
    }
    return <div></div>;
};

export default Marker;
