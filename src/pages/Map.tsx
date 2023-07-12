import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Common } from "@src/styles/Common";
import { mapOptions, panoramaOptions } from "@src/constants/MapOptions";
import { renderToStaticMarkup } from "react-dom/server";
import Marker from "@src/components/Marker";
import zIndexOfMarker from "@src/constants/zIndexOfMarker";
import useGetMarkerContents from "@src/hooks/map/useGetMarkerContents";

function Map() {
    const mapRef = useRef<null | HTMLDivElement>(null);

    const [mapState, setMapState] = useState<naver.maps.Map>();
    const [markerContents, setMarkerContents] = useState<any[]>([]);
    const [markerType, setMarkerType] = useState<"product" | "real">("product");
    const [renderMarkerList, setRenderMarkerList] = useState<any[]>([]);

    const renderMarker = (
        markerElem: string | HTMLElement,
        position: { lat: number; lng: number },
        zIndex: number,
        visible: boolean,
    ) => {
        return new naver.maps.Marker({
            position: new naver.maps.LatLng(position.lat, position.lng),
            map: mapState,
            clickable: true,
            zIndex,
            icon: {
                content: markerElem,
                anchor: new naver.maps.Point(50, 70),
                origin: new naver.maps.Point(50, 50),
            },
            visible,
        });
    };
    useEffect(() => {
        if (!mapRef.current || !naver) return;
        const map = new naver.maps.Map(mapRef.current, mapOptions);
        const initLatLng = new naver.maps.LatLng(37.49094871675334, 127.05557683885974); //최초 좌표(도곡역)
        map.setCenter(initLatLng);
        setMapState(map);

        //마커 데이터 세팅
        const fetchMarkerContents = useGetMarkerContents();
        setMarkerContents(fetchMarkerContents);
    }, []);

    //지도에서 마커 지우기
    const hideMarkers = () => {
        const resetMarkers = renderMarkerList.map((marker) => marker.setMap(null));
        setRenderMarkerList(resetMarkers);
    };

    //지도에 마커 생성
    useEffect(() => {
        if (!mapRef.current || !naver) return;

        const newMarkerList: any[] = [];

        hideMarkers();

        markerContents.map((content) => {
            let { type, count, lat, lng, item, displayName, clickType, real } = content;
            const markerElement = renderToStaticMarkup(
                Marker({
                    type,
                    displayName,
                    count,
                    item,
                    real,
                    markerType,
                }),
            );
            const position = {
                lat,
                lng,
            };
            const zIndex = zIndexOfMarker[type];
            renderMarker(markerElement, position, zIndex, true);
        });
        setRenderMarkerList(newMarkerList);
    }, [markerContents, markerType]);

    return (
        <div
            className="map"
            ref={mapRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "none",
                position: "relative",
            }}
            css={mapWrap}
        />
    );
}

const mapWrap = css`
    .marker_clu {
        min-width: 54px;
        padding: 10px;
        border-radius: 24px;
        background-color: ${Common.colors.aucMarkerColor};
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.18);
        text-align: center;
        p {
            color: ${Common.colors.white};
            text-align: center;
            white-space: nowrap;
        }
        .marker_clu_region {
            ${Common.textStyle.mapMarker_13_medium}
            margin-bottom: 4px;
        }
        .marker_clu_count {
            ${Common.textStyle.mapMarker_14_medium}
        }
    }
`;
export default Map;
